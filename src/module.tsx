import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types/SimpleOptions';
import { ImageltPanel } from './ImageltPanel';
import { EditorSensorList } from 'customEditors/EditorSensorList';
import { EditorMappingList } from 'customEditors/EditorMappingList';

// Оголошення визначення опцій для плагіну
export const plugin = new PanelPlugin<SimpleOptions>(ImageltPanel).setPanelOptions((builder) => {
  const panelOptionsBuilder = builder
    // Додавання текстового поля вводу для опції imageUrl (посилання на зображення фону)
    .addTextInput({
      path: 'imageUrl',
      name: 'Image URL',
      description: 'URL of background image',
      defaultValue: 'https://i.ibb.co/6F8wgdG/default-background.png',
    })
    // Додавання перемикачу для опції Force image refresh
    .addBooleanSwitch({
      path: 'forceImageRefresh',
      name: 'Force image refresh',
      description:
        'Enable to force image refresh when data changes. Use only if cache control is not possible. Check readme on Github if not sure.',
      defaultValue: false,
    })
    // Додавання перемикачу для опції Lock sensors movement (блокування переміщення метрик)
    .addBooleanSwitch({
      path: 'lockSensors',
      name: 'Lock sensors movement',
      defaultValue: false,
      category: ['Sensors'],
    })
    // Додавання числового поля вводу для опції Sensors text size (розмір тексту метрик)
    .addNumberInput({
      path: 'sensorsTextSize',
      name: 'Sensors text size',
      description: 'Default sensors text size. Default 10.',
      defaultValue: 10,
      category: ['Sensors'],
    })
    // Додавання власного редактору для опцій sensors (метрик)
    .addCustomEditor({
      id: 'sensors',
      path: 'sensors',
      name: 'Sensors',
      description: 'List of sensors',
      category: ['Sensors'],
      defaultValue: [],
      editor: EditorSensorList, // UI для редагування списку sensors (метрик)
    })
    // Додавання власного редактору для опцій mappings (системи реагування)
    .addCustomEditor({
      id: 'mappings',
      path: 'mappings',
      name: 'Mappings',
      description: 'List of mappings',
      category: ['Mappings'],
      defaultValue: [],
      editor: EditorMappingList, // UI для редагування списку mappings (системи реагування)
    });

  return panelOptionsBuilder;
});
