import React from 'react';
import { Input, ColorPicker, Switch, Field, HorizontalGroup, IconButton, UnitPicker, Button } from '@grafana/ui';
import Sensor from '../types/Sensor';

import { produce } from 'immer';
import { ColorDot } from 'components/ColorDot';
import { MappingsInput } from 'components/MappingsInput';

// Оголошуємо інтерфейс Props для компоненту EditorSensorItem
interface Props {
  sensor: Sensor; // Сенсор, який ми редагуємо
  onChange: (sensor: Sensor, index: number) => void; // Функція для обробки змін сенсора
  onDelete: (index: number) => void; // Функція для видалення сенсора
  index: number; // Індекс сенсора в масиві сенсорів
}

// Компонент EditorSensorItem для редагування одного сенсора
export const EditorSensorItem: React.FC<Props> = (props: Props) => {
  const { sensor, index, onChange, onDelete } = props; // Деструктуризація пропсів

  // Функція для оновлення сенсора
  function updateSensor(draftState: (draftMapping: Sensor) => void) {
    const updatedMapping = produce(sensor, draftState); // Використовуємо produce для оновлення сенсора

    onChange(updatedMapping, index); // Викликаємо onChange з оновленим сенсором і його індексом
  }

  return (
    <>
      {/* Відображення номера сенсора з кнопкою для видалення */}
      <HorizontalGroup>
        Sensor {props.index + 1}
        <IconButton aria-label="qwe2" name="trash-alt" size="sm" onClick={() => onDelete(index)} />
      </HorizontalGroup>

      {/* <HorizontalGroup> */}
      {/* Поле для введення ID запиту сенсора */}
      <Field label="Query ID" description="Set this as query ID OR the query alias below">
        <Input
          value={sensor.query.id}
          onChange={(event) => {
            updateSensor((sensor) => {
              sensor.query.id = event.currentTarget.value; // Оновлюємо ID запиту сенсора
            });
          }}
        />
      </Field>

      {/* Поле для введення псевдоніму запиту сенсора */}
      <Field label="Query Alias" description="If both alias and ID are set, ID has precedence">
        <Input
          value={sensor.query.alias}
          onChange={(event) => {
            updateSensor((sensor) => {
              sensor.query.alias = event.currentTarget.value; // Оновлюємо псевдонім запиту сенсора
            });
          }}
        />
      </Field>
      {/* </HorizontalGroup> */}

      {/* Поле для вибору мапінгів сенсора */}
      <Field
        label="Mapping IDs"
        description="Select IDs of mappings you want to use for this sensor. First valid mapping will be applied. List can be reordered by dragging."
      >
        <MappingsInput
          mappings={sensor.mappingIds}
          onChange={(mappings) => {
            updateSensor((sensor) => {
              sensor.mappingIds = mappings; // Оновлюємо ідентифікатори мапінгів сенсора
            });
          }}
        />
      </Field>

      {/* Поле для введення назви сенсора */}
      <Field label="Name">
        <Input
          value={sensor.name}
          onChange={(event) => {
            updateSensor((sensor) => {
              sensor.name = event.currentTarget.value; // Оновлюємо назву сенсора
            });
          }}
        />
      </Field>

      {/* Поле для введення іконки сенсора */}
      <Field label="Icon" description="Write a valid FontAwesome icon">
        <Input
          value={sensor.iconName}
          onChange={(event) => {
            updateSensor((sensor) => {
              sensor.iconName = event.currentTarget.value; // Оновлюємо іконку сенсора
            });
          }}
        />
      </Field>

      {/* Поле для введення посилання сенсора */}
      <Field label="Link">
        <Input
          value={sensor.link}
          onChange={(event) => {
            updateSensor((sensor) => {
              sensor.link = event.currentTarget.value; // Оновлюємо посилання сенсора
            });
          }}
        />
      </Field>

      {/* Перемикач видимості сенсора */}
      <Field label="Show">
        <Switch
          value={sensor.visible}
          onChange={(event) => {
            updateSensor((sensor) => {
              sensor.visible = event.currentTarget.checked; // Оновлюємо видимість сенсора
            });
          }}
        />
      </Field>

      {/* Поле для вибору одиниць вимірювання сенсора */}
      <Field label="Unit Type">
        <UnitPicker
          value={sensor.unit}
          onChange={(unit) => {
            updateSensor((sensor) => {
              sensor.unit = unit; // Оновлюємо одиниці вимірювання сенсора
            });
          }}
        />
      </Field>

      {/* <HorizontalGroup> */}
      {/* Поле для вибору кольору шрифту сенсора */}
      <Field label="Font Color">
        <ColorPicker
          color={sensor.fontColor}
          onChange={(color) => {
            updateSensor((sensor) => {
              sensor.fontColor = color; // Оновлюємо колір шрифту сенсора
            });
          }}
        >
          {({ ref, showColorPicker, hideColorPicker }) => (
            <Button ref={ref} onMouseLeave={hideColorPicker} onClick={showColorPicker} variant="secondary">
              Open color picker <ColorDot color={sensor.fontColor} />
            </Button>
          )}
        </ColorPicker>
      </Field>

      {/* Поле для вибору кольору фону сенсора */}
      <Field label="Background Color">
        <ColorPicker
          color={sensor.backgroundColor}
          onChange={(color) => {
            updateSensor((sensor) => {
              sensor.backgroundColor = color; // Оновлюємо колір фону сенсора
            });
          }}
        >
          {({ ref, showColorPicker, hideColorPicker }) => (
            <Button ref={ref} onMouseLeave={hideColorPicker} onClick={showColorPicker} variant="secondary">
              Open color picker <ColorDot color={sensor.backgroundColor} />
            </Button>
          )}
        </ColorPicker>
      </Field>
      {/* </HorizontalGroup> */}

      {/* Поле для введення кількості знаків після коми */}
      <Field label="Decimals">
        <Input
          value={sensor.decimals}
          type="number"
          onChange={(event) => {
            updateSensor((sensor) => {
              sensor.decimals = Number.parseInt(event.currentTarget.value, 10); // Оновлюємо кількість знаків після коми
            });
          }}
        />
      </Field>
    </>
  );
};
