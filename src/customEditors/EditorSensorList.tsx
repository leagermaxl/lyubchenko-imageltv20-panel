import React from 'react';
import { css } from '@emotion/css';
import { useStyles2, Button } from '@grafana/ui';
import { EditorSensorItem } from './EditorSensorItem';
import Sensor from '../types/Sensor';
import { GrafanaTheme2, StandardEditorProps } from '@grafana/data';

// Оголошуємо інтерфейс Props, який розширює StandardEditorProps з типом даних Sensor[]
interface Props extends StandardEditorProps<Sensor[]> {}

// Встановлюємо значення за замовчуванням для нового сенсора
const defaultNewSensor: Sensor = {
  name: 'Name', // Назва сенсора
  query: {
    id: 'A', // Ідентифікатор запиту
    alias: '', // Псевдонім запиту
  },
  visible: true, // Видимість сенсора
  backgroundColor: '#000', // Колір фону сенсора
  fontColor: '#FFF', // Колір шрифту сенсора
  bold: false, // Чи буде текст жирним
  link: '', // Посилання, яке асоціюється з сенсором
  position: {
    x: 50, // Позиція по осі X
    y: 50, // Позиція по осі Y
  },
  mappingIds: [], // Ідентифікатори мапінгів
  unit: undefined, // Одиниці вимірювання
  decimals: 2, // Кількість знаків після коми
  valueBlink: false, // Чи буде значення блимати
  iconName: '', // Іконка сенсора
  backgroundBlink: false, // Чи буде фон блимати
};

// Компонент EditorSensorList, який приймає пропси з типом Props
export const EditorSensorList: React.FC<Props> = (props: Props) => {
  const { onChange } = props; // Деструктуризація, витягуємо onChange з props
  const sensors = props.value; // Отримуємо масив сенсорів з props.value

  const styles = useStyles2(getStyles); // Використовуємо кастомні стилі

  // Функція для обробки змін сенсора
  const onSensorChange = (sensor: Sensor, index: number) => {
    sensors[index] = sensor; // Оновлюємо сенсор у масиві за індексом

    onChange(sensors); // Викликаємо onChange з оновленим масивом сенсорів
  };

  // Функція для видалення сенсора
  const onSensorDelete = (index: number) => {
    sensors.splice(index, 1); // Видаляємо сенсор з масиву за індексом

    onChange(sensors); // Викликаємо onChange з оновленим масивом сенсорів
  };

  // Функція для додавання нового сенсора
  const addNewSensor = () => {
    sensors.push(defaultNewSensor); // Додаємо новий сенсор за замовчуванням до масиву

    onChange(sensors); // Викликаємо onChange з оновленим масивом сенсорів
  };

  return (
    <>
      {/* Відображення списку існуючих sensors */}
      {sensors &&
        sensors.map((sensor: Sensor, index: number) => {
          return (
            <div className={styles.sensorItemWrapperStyle} key={index}>
              <EditorSensorItem sensor={sensor} onChange={onSensorChange} onDelete={onSensorDelete} index={index} />
            </div>
          );
        })}

      {/* Кнопка для додавання нового сенсора */}
      <Button className={styles.addButtonStyle} onClick={addNewSensor} variant="secondary" size="md">
        Add New
      </Button>
    </>
  );
};

// Функція для отримання стилів на основі теми Grafana
const getStyles = (theme: GrafanaTheme2) => ({
  sensorItemWrapperStyle: css`
    margin-bottom: 16px;
    padding: 8px;
    background-color: ${theme.colors.background.secondary};
  `,

  addButtonStyle: css`
    /* margin-left: 8px; */
  `,
});
