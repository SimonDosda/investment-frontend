import { Currency } from "../models/market";

export const parseDate = (date: Date): string =>
  `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

export const getCurrentyParser = (currency: Currency) => {
  const currencySymbols: { [currency: Currency]: string } = {
    EUR: "€",
    USD: "$",
  };
  return (value: number): string => {
    return `${value} ${currencySymbols[currency]}`;
  };
};

export const parsePercent = (value: number): string => `${value} %`;

export const parseBool = (value: boolean) => (value ? "Y" : "N");

export function handleNull<T>(
  value: T | null | undefined,
  parser: (v: T) => string = (v) => `${v}`
): string {
  if (value === null || value === undefined) {
    return "-";
  }
  return parser(value);
}
