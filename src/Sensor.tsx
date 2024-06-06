import React, { useState } from 'react';
import { clone, merge } from 'lodash';
import { css, cx, keyframes } from '@emotion/css';
import Draggable, { DraggableEvent, DraggableData, ControlPosition } from 'react-draggable';
import SensorType from './types/SensorType';
import MappingOperators from 'MappingOperators';
import { MappingType } from 'types/MappingType';
import { GrafanaTheme2, formattedValueToString, getValueFormat } from '@grafana/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { useStyles2 } from '@grafana/ui';

// Визначення типу властивостей компонента Sensor
type Props = {
  sensor: SensorType; // Об'єкт сенсора
  mappings: MappingType[]; // Мапінги
  draggable: boolean; // Можливість перетягування сенсора
  iconName: IconName; // Назва іконки
  index: number; // Індекс сенсора в масиві
  link: string; // Посилання
  name: string; // Ім'я сенсора
  imageDimensions: {
    width: number;
    height: number;
  }; // Розміри зображення
  onPositionChange: Function; // Функція для зміни позиції сенсора
  value: any | undefined; // Значення сенсора
};

// Функція для переведення пікселів в відсотки
const pxToPerc = (px: number, size: number): number => {
  return (px * 100) / size;
};

// Функція для переведення відсотків в пікселі
const percToPx = (perc: number, size: number): number => {
  return (perc * size) / 100;
};

// Компонент Sensor
export const Sensor: React.FC<Props> = (props: Props) => {
  // Деструктуризація пропсів
  const { draggable, imageDimensions, onPositionChange, index, iconName, link, name, mappings } = props;
  let sensor = clone(props.sensor) as SensorType & MappingType['values'];
  let value = clone(props.value);

  const styles = useStyles2(getStyles); // Використовуємо кастомні стилі

  const [isMouseOver, setIsMouseOver] = useState(false);

  // Обробник завершення перетягування сенсора
  const onDragStop = (_event: DraggableEvent, data: DraggableData) => {
    const newPosition: SensorType['position'] = {
      x: pxToPerc(data.x, imageDimensions.width), // Перетворення пікселів в відсотки
      y: pxToPerc(data.y, imageDimensions.height), // Перетворення пікселів в відсотки
    };

    onPositionChange(newPosition, index); // Виклик функції для зміни позиції сенсора
  };

  // Позиція сенсора
  const sensorPosition: ControlPosition = {
    x: percToPx(sensor.position.x, imageDimensions.width), // Перетворення відсотків в пікселі
    y: percToPx(sensor.position.y, imageDimensions.height), // Перетворення відсотків в пікселі
  };

  // Цикл по мапінгам
  for (let mapping of mappings) {
    const mappingOperator = MappingOperators.find((mappingOperator) => mapping.operator === mappingOperator.id);

    // Застосування функції мапінгу, якщо вона виконує вимоги
    const isOverrode = mappingOperator?.function(value, mapping.compareTo);

    if (isOverrode) {
      sensor = merge(sensor, mapping.values);
      value = mapping.values.overrideValue ? mapping.values.overrideValue : value;

      delete sensor.overrideValue;
      // Зупинка при першому дійсному мапінгу
      break;
    }
  }

  // Отримання і застосування форматувальника одиниць виміру
  const { unit } = sensor;

  const valueFormatter = getValueFormat(unit);

  const formattedValue = valueFormatter(value, sensor.decimals);

  const formattedValueString = value !== undefined ? formattedValueToString(formattedValue) : 'No data';

  return (
    <>
      {sensor.visible && (
        <Draggable
          disabled={draggable}
          bounds="#imageItBgImage"
          handle=".handle"
          onStop={onDragStop}
          position={sensorPosition}
        >
          <div
            className={cx(
              styles.container,
              css`
                color: ${sensor.fontColor};
                background-color: ${sensor.backgroundColor};
              `, // Колір тексту та фону
              sensor.backgroundBlink && styles.blink // Блимання фону
            )}
            onMouseEnter={() => setIsMouseOver(true)} // Обробник входу миші
            onMouseLeave={() => setIsMouseOver(false)} // Обробник виходу миші
          >
            <div className={cx(styles.content)}>
              <a
                className={css`
                  color: ${sensor.fontColor};
                `}
                href={link || '#'}
              >
                {iconName && <FontAwesomeIcon icon={iconName} />}
                <div className={cx(styles.name)}>{name}</div>
                <div className={cx(styles.value, sensor.valueBlink && styles.blink, sensor.bold && styles.bold)}>
                  {/* Значення сенсора, з блиманням та жирним шрифтом, якщо встановлено */}
                  {formattedValueString}
                </div>
              </a>
            </div>

            {/* Відображення ручки для перетягування, якщо це дозволено та мишка над сенсором */}
            {!draggable && isMouseOver && (
              <div className={cx(styles.handle, 'handle')}>
                <div className="fa fa-bars" />
              </div>
            )}
          </div>
        </Draggable>
      )}
    </>
  );
};

// Анімація блимання
const blink = keyframes`
  50% {
    opacity: 0;
  }
`;

// Функція для отримання стилів на основі теми Grafana
const getStyles = (theme: GrafanaTheme2) => {
  return {
    container: css`
      position: absolute;
      padding: 0.5em;
    `,
    handle: css`
      float: right;
      margin-left: 0.5em;
    `,
    content: css`
      float: left;
    `,
    name: css`
      font-size: 0.5em;
    `,
    value: css``,
    blink: css`
      animation: ${blink} 1s linear infinite;
    `,
    bold: css`
      font-weight: bold;
    `,
  };
};
