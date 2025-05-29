import { TypedMoney } from '@commercetools/platform-sdk';

export const getPrice = (priceObj: TypedMoney) => {
  return (priceObj.centAmount / Math.pow(10, priceObj?.fractionDigits)).toFixed(priceObj.fractionDigits);
};
