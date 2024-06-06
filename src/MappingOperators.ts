import { MappingOperator } from './types/MappingType';

// Функція для перевірки рівності двох значень (чисел або рядків)
function isEqualTo(a: number | string, b: number | string) {
  // eslint-disable-next-line
  return a !== undefined && b !== undefined ? a == b : false;
}

// Функція для перевірки, чи перше значення більше за друге (числа або рядки)
function isGreaterThan(a: number | string, b: number | string) {
  return a !== undefined && b !== undefined ? a > b : false;
}

// Функція для перевірки, чи перше значення менше за друге (числа або рядки)
function isSmallerThan(a: number | string, b: number | string) {
  return a !== undefined && b !== undefined ? a < b : false;
}

// Функція для перевірки нерівності двох значень (чисел або рядків)
function isNotEqualTo(a: number | string, b: number | string) {
  return !isEqualTo(a, b);
}

// Масив об'єктів операторів мапінгу
const MappingOperators: MappingOperator[] = [
  {
    id: 'equal', // Ідентифікатор оператора рівності
    operator: '=', // Символ оператора рівності
    function: isEqualTo, // Функція для перевірки рівності
    description: 'Check if the two values are equal', // Опис оператора
  },
  {
    id: 'notEqual', // Ідентифікатор оператора нерівності
    operator: '!=', // Символ оператора нерівності
    function: isNotEqualTo, // Функція для перевірки нерівності
    description: 'Check if the two values are not equal', // Опис оператора
  },
  {
    id: 'greaterThan', // Ідентифікатор оператора більше
    operator: '>', // Символ оператора більше
    function: isGreaterThan, // Функція для перевірки більше
  },
  {
    id: 'smallerThan', // Ідентифікатор оператора менше
    operator: '<', // Символ оператора менше
    function: isSmallerThan, // Функція для перевірки менше
  },
];

// Експорт масиву операторів мапінгу за замовчуванням
export default MappingOperators;
