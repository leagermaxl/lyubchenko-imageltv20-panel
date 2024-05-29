// Оголошення типу Mapping для опису маппінгу
export type Mapping = {
  id: string; // Унікальний ідентифікатор маппінгу
  description: string; // Опис маппінгу
  operator: MappingOperator['id']; // Ідентифікатор оператора маппінгу
  compareTo: number | string; // Значення для порівняння

  values: {
    fontColor: string; // Колір шрифту
    backgroundColor: string; // Колір фону
    visible: boolean; // Видимість
    bold: boolean; // Жирний шрифт
    valueBlink: boolean; // Миготіння значення
    backgroundBlink: boolean; // Миготіння фону
    overrideValue?: string; // Перезапис значення (необов'язкове)
  };
};

// Оголошення типу MappingOperator для опису оператора маппінгу
export type MappingOperator = {
  id: string; // Унікальний ідентифікатор оператора
  operator: string; // Назва оператора
  function: (value: any, compareTo: any) => boolean; // Функція для порівняння значень
  description?: string; // Опис оператора (необов'язкове)
};
