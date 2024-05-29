import React, { useEffect, useRef, useState } from 'react';
import { GrafanaTheme2, PanelProps, getFieldDisplayValues, ReducerID } from '@grafana/data';
import { SimpleOptions } from './types/SimpleOptions';
import { css, cx } from '@emotion/css';
import { uniqueId, cloneDeep } from 'lodash';
// import { stylesFactory, useTheme } from '@grafana/ui';
import { useTheme2, useStyles2 } from '@grafana/ui';
import { Sensor } from './Sensor';
import { Mapping } from './types/Mapping';
import SensorType from './types/Sensor';
import { IconName, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Визначення інтерфейсу для властивостей компонента
interface Props extends PanelProps<SimpleOptions> {}

// Основний компонент панелі ImageltPanel
export const ImageltPanel: React.FC<Props> = ({
  options, // Опції панелі
  data, // Дані, отримані з Grafana
  width, // Ширина панелі
  height, // Висота панелі
  onOptionsChange, // Функція для зміни опцій панелі
  fieldConfig, // Конфігурація поля
  replaceVariables, // Функція для заміни змінних у рядках
}) => {
  // Витягуємо необхідні опції з об'єкта options
  const { forceImageRefresh, lockSensors, mappings, sensors, sensorsTextSize } = options;
  const theme = useTheme2(); // Отримуємо тему Grafana
  const styles = useStyles2(getStyles); // Створюємо стилі для компонента
  library.add(fas); // Додаємо бібліотеку іконок

  const imageRef = useRef<HTMLImageElement>(null); // Створюємо референс для зображення
  const [imageDimensions, setImageDimensions] = useState({ height: 0, width: 0 }); // Стан для розмірів зображення

  const [imageUrl, setImageUrl] = useState(options.imageUrl); // Стан для URL зображення

  // Використовуємо ефект для оновлення URL зображення при змінах даних або URL
  useEffect(() => {
    if (forceImageRefresh) {
      setImageUrl(`${options.imageUrl}?${uniqueId()}`); // Додаємо унікальний ID для примусового оновлення
    } else {
      setImageUrl(options.imageUrl);
    }
  }, [data, options.imageUrl, forceImageRefresh]);

  // Використовуємо ефект для оновлення розмірів зображення при зміні розмірів панелі
  useEffect(() => {
    setImageDimensions({
      height: imageRef.current!.offsetHeight,
      width: imageRef.current!.offsetWidth,
    });
  }, [width, height]);

  // Функція, яка викликається при завантаженні зображення
  const onImageLoad = ({ target: image }: any) => {
    setImageDimensions({
      height: image.offsetHeight,
      width: image.offsetWidth,
    });
  };

  // Функція для зміни позиції сенсора
  const onSensorPositionChange = (position: SensorType['position'], index: number) => {
    const newOptions = cloneDeep(options); // Клонування об'єкта опцій
    newOptions.sensors[index].position = position; // Зміна позиції сенсора

    onOptionsChange(newOptions); // Виклик функції для зміни опцій панелі
  };

  return (
    <div className={styles.wrapper}>
      <div
        id="imageItBgImage"
        className={cx(
          styles.imageWrapper,
          css`
            max-height: ${height}px;
            font-size: ${(sensorsTextSize * imageDimensions.width) / 50 / 10}px;
          ` // Динамічне встановлення розміру тексту сенсорів
        )}
      >
        {sensors &&
          sensors.map((sensor: SensorType, index: number) => {
            // Отримання серії даних для сенсора на основі refId або alias полів
            const serie = data.series.find((serie) =>
              sensor.query.id ? sensor.query.id === serie.refId : sensor.query.alias === serie.name
            );

            let value = undefined;

            if (serie !== undefined) {
              const fieldDisplay = getFieldDisplayValues({
                data: [serie],
                reduceOptions: {
                  calcs: [ReducerID.last],
                },
                fieldConfig,
                replaceVariables,
                theme,
              })[0];

              value = fieldDisplay.display.numeric; // Отримання останнього значення серії
            }

            // Отримання мапінгів по ідентифікаторам
            const sensorMappings: Mapping[] = sensor.mappingIds
              .map((mappingId) => mappings.find((mapping: Mapping) => mappingId === mapping.id))
              .filter((mapping) => typeof mapping !== 'undefined') as Mapping[];

            return (
              <Sensor
                draggable={lockSensors} // Встановлення можливості перетягування сенсора
                sensor={sensor} // Передача об'єкта сенсора
                iconName={sensor.iconName as IconName} // Назва іконки для сенсора
                mappings={sensorMappings} // Мапінги для сенсора
                index={index} // Індекс сенсора в масиві сенсорів
                link={replaceVariables(sensor.link)} // Заміна змінних в посиланні
                name={replaceVariables(sensor.name)} // Заміна змінних в імені
                imageDimensions={imageDimensions} // Передача розмірів зображення
                onPositionChange={onSensorPositionChange} // Виклик функції зміни позиції сенсора
                value={value} // Передача значення сенсора
                key={index} // Унікальний ключ для кожного сенсора
              />
            );
          })}

        <img
          className={cx(
            styles.bgImage,
            css`
              max-height: ${height}px;
            `
          )}
          src={imageUrl} // URL зображення
          ref={imageRef} // Референс для зображення
          onLoad={onImageLoad} // Виклик функції при завантаженні зображення
          draggable="false" // Заборона перетягування зображення
        />
      </div>
    </div>
  );
};

// Функція для отримання стилів на основі теми Grafana
const getStyles = (theme: GrafanaTheme2) => {
  return {
    wrapper: css`
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    imageWrapper: css`
      position: relative;
      display: inline-block;
      max-width: 100%;
    `,
    bgImage: css`
      max-width: 100%;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};
