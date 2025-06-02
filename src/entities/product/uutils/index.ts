import { TypedMoney } from '@commercetools/platform-sdk';

export const getPrice = (priceObj: TypedMoney) => {
  return (priceObj.centAmount / Math.pow(10, priceObj?.fractionDigits)).toFixed(priceObj.fractionDigits);
};

export const getPercent = (priceObj: TypedMoney, discountedPriceObj: TypedMoney) => {
  const percent = (Number(getPrice(discountedPriceObj)) / Number(getPrice(priceObj))) * 100;
  return 100 - percent;
};
