import React from 'react';
import { Input, Field, HorizontalGroup, IconButton, Select, TextArea, ColorPicker, Button, Switch } from '@grafana/ui';
import { MappingType } from '../types/MappingType';
import { SelectableValue } from '@grafana/data';

import { produce } from 'immer';
import { ColorDot } from 'components/ColorDot';

// Інтерфейс Props для компоненту EditorMappingItem
interface Props {
  mapping: MappingType; // Маппінг, який ми редагуємо
  operatorsOptions: SelectableValue[]; // Опції для вибору оператора
  onChange: (mapping: MappingType, index: number) => void; // Функція для обробки змін маппінгу
  onDelete: (index: number) => void; // Функція для видалення маппінгу
  index: number; // Індекс маппінгу в масиві маппінгів
}

// Компонент EditorMappingItem для редагування одного маппінгу
export const EditorMappingItem: React.FC<Props> = (props: Props) => {
  const { mapping, index, operatorsOptions, onChange, onDelete } = props; // Деструктуризація пропсів

  // Функція для оновлення маппінгу
  function updateMapping(draftState: (draftMapping: MappingType) => void) {
    const updatedMapping = produce(mapping, draftState); // Використовуємо produce для оновлення маппінгу

    onChange(updatedMapping, index); // Викликаємо onChange з оновленим маппінгом і його індексом
  }

  return (
    <>
      {/* Відображення номера маппінгу з кнопкою для видалення */}
      <HorizontalGroup>
        Mapping {index + 1}
        <IconButton aria-label="map" name="trash-alt" size="sm" onClick={() => onDelete(index)} />
      </HorizontalGroup>

      {/* Поле для введення ID маппінгу */}
      <Field label="ID">
        <Input
          value={mapping.id}
          onChange={(event) => {
            updateMapping((mapping) => {
              mapping.id = event.currentTarget.value; // Оновлюємо ID маппінгу
            });
          }}
        />
      </Field>

      {/* Поле для введення опису маппінгу */}
      <Field label="Description">
        <TextArea
          value={mapping.description}
          onChange={(event) => {
            updateMapping((mapping) => {
              mapping.description = event.currentTarget.value; // Оновлюємо опис маппінгу
            });
          }}
        />
      </Field>

      {/* Поле для вибору оператора */}
      <Field label="Operator">
        <Select
          value={mapping.operator}
          options={operatorsOptions}
          onChange={(selectableValue) => {
            updateMapping((mapping) => {
              mapping.operator = selectableValue.value; // Оновлюємо оператор маппінгу
            });
          }}
        />
      </Field>

      {/* Поле для введення значення порівняння */}
      <Field label="Compare to">
        <Input
          value={mapping.compareTo}
          onChange={(event) => {
            updateMapping((mapping) => {
              mapping.compareTo = event.currentTarget.value; // Оновлюємо значення порівняння
            });
          }}
        />
      </Field>

      {/* Поле для вибору кольору шрифту */}
      <Field label="Font Color">
        <ColorPicker
          color={mapping.values?.fontColor}
          onChange={(color) => {
            updateMapping((mapping) => {
              mapping.values.fontColor = color; // Оновлюємо колір шрифту
            });
          }}
        >
          {({ ref, showColorPicker, hideColorPicker }) => (
            <Button ref={ref} onMouseLeave={hideColorPicker} onClick={showColorPicker} variant="secondary">
              Open color picker <ColorDot color={mapping.values.fontColor} />
            </Button>
          )}
        </ColorPicker>
      </Field>

      {/* Поле для вибору кольору фону */}
      <Field label="Background Color">
        <ColorPicker
          color={mapping.values.backgroundColor}
          onChange={(color) => {
            updateMapping((mapping) => {
              mapping.values.backgroundColor = color; // Оновлюємо колір фону
            });
          }}
        >
          {({ ref, showColorPicker, hideColorPicker }) => (
            <Button ref={ref} onMouseLeave={hideColorPicker} onClick={showColorPicker} variant="secondary">
              Open color picker <ColorDot color={mapping.values.backgroundColor} />
            </Button>
          )}
        </ColorPicker>
      </Field>

      {/* Перемикач для відображення маппінгу */}
      <Field label="Show">
        <Switch
          value={mapping.values.visible}
          onChange={(event) => {
            updateMapping((mapping) => {
              mapping.values.visible = event.currentTarget.checked; // Оновлюємо видимість маппінгу
            });
          }}
        />
      </Field>

      {/* Перемикач для встановлення жирного шрифту */}
      <Field label="Bold">
        <Switch
          value={mapping.values.bold}
          onChange={(event) => {
            updateMapping((mapping) => {
              mapping.values.bold = event.currentTarget.checked; // Оновлюємо жирність шрифту
            });
          }}
        />
      </Field>

      {/* Перемикач блимання фону */}
      <Field label="Background Blink">
        <Switch
          value={mapping.values.backgroundBlink}
          onChange={(event) => {
            updateMapping((mapping) => {
              mapping.values.backgroundBlink = event.currentTarget.checked; // Оновлюємо блимання фону
            });
          }}
        />
      </Field>

      {/* Перемикач блимання значення */}
      <Field label="Value Blink">
        <Switch
          value={mapping.values.valueBlink}
          onChange={(event) => {
            updateMapping((mapping) => {
              mapping.values.valueBlink = event.currentTarget.checked; // Оновлюємо блимання значення
            });
          }}
        />
      </Field>

      {/* Поле для перевизначення значення */}
      <Field label="Override value">
        <Input
          value={mapping.values.overrideValue}
          onChange={(event) => {
            updateMapping((mapping) => {
              mapping.values.overrideValue = event.currentTarget.value; // Оновлюємо перевизначене значення
            });
          }}
        />
      </Field>
    </>
  );
};
