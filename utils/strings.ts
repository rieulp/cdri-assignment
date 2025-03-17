import { decode } from 'entities';

export const numberToCurrency = (number: number) => {
  return number.toLocaleString('ko-KR');
};

export const decodeText = (text: string) => {
  return decode(text).replace(/  /g, '\n');
};
