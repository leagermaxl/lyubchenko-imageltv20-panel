// Оголошення типу Sensor для опису сенсора
type Sensor = {
  visible: boolean; // Видимість сенсора
  name: string; // Назва сенсора
  query: {
    id: string; // Ідентифікатор запиту
    alias: string; // Псевдонім запиту
  };
  backgroundColor: string; // Колір фону сенсора
  fontColor: string; // Колір шрифту сенсора
  bold: boolean; // Жирний шрифт
  valueBlink: boolean; // Миготіння значення
  iconName: string; // Ім'я іконки
  backgroundBlink: boolean; // Миготіння фону
  link: string; // Посилання, пов'язане з сенсором
  position: {
    x: number; // Позиція сенсора по осі X
    y: number; // Позиція сенсора по осі Y
  };
  mappingIds: string[]; // Масив ідентифікаторів маппінгів
  unit: string | undefined; // Одиниця вимірювання
  decimals: number; // Кількість десяткових знаків
};

// Експорт типу Sensor за замовчуванням
export default Sensor;
