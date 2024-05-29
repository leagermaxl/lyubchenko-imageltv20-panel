import { Button, Input, ButtonGroup, Field } from '@grafana/ui';
import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { uniqueId } from 'lodash';

// Властивості для компоненту MappingsInput
interface MappingsInputProps {
  mappings: string[]; // Масив рядків з маппінгами
  onChange: (mappings: string[]) => void; // Функція для оновлення маппінгів
}

// Властивості для компоненту Mapping
interface MappingProps {
  mapping: string; // Рядок з маппінгом
  onDelete: () => void; // Функція для видалення маппінга
}

// Компонент для відображення одного маппінга з кнопкою видалення
const Mapping: React.FC<MappingProps> = ({ mapping, onDelete }: MappingProps) => {
  return (
    <ButtonGroup>
      {/* Кнопка видалення маппінга */}
      <Button icon="times" variant="primary" size="sm" onClick={onDelete} />
      {/* Відображення маппінга */}
      <Button variant="primary" size="sm">
        {mapping}
      </Button>
    </ButtonGroup>
  );
};

// Компонент для введення та редагування списку маппінгів
export const MappingsInput: React.FC<MappingsInputProps> = ({ mappings, onChange }: MappingsInputProps) => {
  const [newMapping, setNewMapping] = useState(''); // Стан для нового маппінга

  // Додає новий маппінг до списку
  const addMapping = () => {
    const mapping = newMapping.trim();
    if (mapping.length === 0) {
      return;
    }
    onChange(mappings.concat(mapping));
    setNewMapping('');
  };

  // Видаляє маппінг з списку за індексом
  const deleteMapping = (index: number) => {
    const newMappings = mappings.filter((mapping, i) => i !== index);
    onChange(newMappings);
  };

  // Кнопка для додавання маппінга
  const addonAfter = (
    <Button variant="secondary" onClick={addMapping}>
      Add
    </Button>
  );

  // Формує список маппінгів з унікальними ідентифікаторами
  const sortableMappings = mappings.map((mapping) => ({
    id: uniqueId('mapping'),
    value: mapping,
  }));

  // Додає маппінг при натисканні Enter
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addMapping();
    }
  };

  // Перевіряє чи є маппінг недійсним
  const invalidMapping = () => {
    return mappings.includes(newMapping) || newMapping.length === 0;
  };

  // Генерує повідомлення про помилку для недійсного маппінга
  const generateErrorMessage = () => {
    if (mappings.includes(newMapping)) {
      return `${newMapping} is already in the list`;
    }

    return '';
  };

  // Стан для збереження списку маппінгів
  const [state, setState] = useState(sortableMappings);
  return (
    <>
      {/* Використання ReactSortable для сортування маппінгів */}
      <ReactSortable list={state} setList={setState}>
        {sortableMappings.map((mapping, index) => (
          <Mapping mapping={mapping.value} key={index} onDelete={() => deleteMapping(index)} />
        ))}
      </ReactSortable>
      {/* Поле введення для додавання нового маппінга */}
      <Field invalid={invalidMapping()} error={generateErrorMessage()}>
        <Input
          addonAfter={addonAfter} // Кнопка для додавання маппінга
          onKeyPress={handleKeyPress} // Обробник натискання клавіші Enter
          onChange={(e) => setNewMapping(e.currentTarget.value)} // Оновлення стану нового маппінга
          value={newMapping} // Поточне значення нового маппінга
        />
      </Field>
    </>
  );
};
