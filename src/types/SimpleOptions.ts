import SensorType from './SensorType';
import { MappingType } from './MappingType';

// Оголошення інтерфейсу SimpleOptions для збереження налаштувань
export interface SimpleOptions {
  imageUrl: string; // URL зображення
  forceImageRefresh: boolean; // Примусове оновлення зображення
  lockSensors: boolean; // Блокування сенсорів (не можна переміщати або змінювати)
  sensorsTextSize: number; // Розмір тексту сенсорів
  sensors: SensorType[]; // Масив сенсорів
  mappings: MappingType[]; // Масив маппінгів
}
