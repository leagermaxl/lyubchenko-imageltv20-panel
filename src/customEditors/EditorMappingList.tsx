import React from 'react';
import { css } from '@emotion/css';
import { Button, useStyles2 } from '@grafana/ui';
import { GrafanaTheme2, SelectableValue, StandardEditorProps } from '@grafana/data';
import { EditorMappingItem } from './EditorMappingItem';
import { Mapping } from 'types/Mapping';
import MappingOperators from 'MappingOperators';

// Інтерфейс Props для компоненту EditorMappingList
interface Props extends StandardEditorProps<Mapping[]> {}

// Функція для генерації випадкового ID
const getRandomID = function () {
  const randomString = Math.random().toString(36).substr(2, 5);

  return 'mapping-' + randomString;
};

// Опції для вибору оператора з MappingOperators
const operatorsOptions: SelectableValue[] = MappingOperators.map((mappingOperator) => ({
  label: mappingOperator.operator, // Назва оператора
  value: mappingOperator.id, // Ідентифікатор оператора
  description: mappingOperator.description, // Опис оператора
}));

// Компонент EditorMappingList для редагування списку маппінгів
export const EditorMappingList: React.FC<Props> = (props: Props) => {
  const onChange = props.onChange; // Функція для обробки змін маппінгів
  const mappings = props.value; // Список маппінгів

  const styles = useStyles2(getStyles); // Використання стилів

  // Значення за замовчуванням для нового маппінгу
  const defaultNewMapping: Mapping = {
    id: getRandomID(), // Випадковий ID
    description: '', // Опис за замовчуванням
    compareTo: 0, // Число для порівняння за замовчуванням
    operator: MappingOperators[0].id, // Оператор за замовчуванням

    values: {
      fontColor: '#fff', // Колір шрифту за замовчуванням
      backgroundColor: '#000', // Колір фону за замовчуванням
      valueBlink: false, // Блимання значення за замовчуванням
      backgroundBlink: false, // Блимання фону за замовчуванням
      bold: false, // Жирний шрифт за замовчуванням
      visible: true, // Видимість за замовчуванням
      overrideValue: undefined, // Перевизначене значення за замовчуванням
    },
  };

  // Функція для обробки змін маппінгу
  const onMappingChange = (mapping: Mapping, index: number) => {
    mappings[index] = mapping; // Оновлюємо маппінг

    onChange(mappings); // Викликаємо onChange з оновленими маппінгами
  };

  // Функція для видалення маппінгу
  const onMappingDelete = (index: number) => {
    mappings.splice(index, 1); // Видаляємо маппінг

    onChange(mappings); // Викликаємо onChange з оновленими маппінгами
  };

  // Функція для додавання нового маппінгу
  const addNewMapping = () => {
    mappings.push(defaultNewMapping); // Додаємо новий маппінг

    onChange(mappings); // Викликаємо onChange з оновленими маппінгами
  };

  return (
    <>
      {/* список існуючих маппінгів */}
      {mappings &&
        mappings.map((mapping: Mapping, index: number) => {
          return (
            <div className={styles.mappingItemWrapper} key={index}>
              <EditorMappingItem
                mapping={mapping} // Передаємо маппінг
                operatorsOptions={operatorsOptions} // Передаємо опції операторів
                onChange={onMappingChange} // Функція для обробки змін маппінгу
                onDelete={onMappingDelete} // Функція для видалення маппінгу
                index={index} // Індекс маппінгу
              />
            </div>
          );
        })}

      {/* Кнопка для додавання нового маппінгу */}
      <Button className={styles.addButtonStyle} onClick={addNewMapping} variant="secondary" size="md">
        Add New
      </Button>
    </>
  );
};

// Функція для отримання стилів на основі теми Grafana
const getStyles = (theme: GrafanaTheme2) => ({
  mappingItemWrapper: css`
    margin-bottom: 16px;
    padding: 8px;
    background-color: ${theme.colors.background.secondary};
  `,

  addButtonStyle: css`
    /* margin-left: 8px; */
  `,
});
