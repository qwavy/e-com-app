import type { Cart as Basket, LineItem } from '@commercetools/platform-sdk';
import { makeAutoObservable } from 'mobx';

class BasketStore {
  items: LineItem[] = [];
  basket: Basket | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setBasket(basket: Basket) {
    this.basket = basket;
    this.items = basket.lineItems;
  }

  clearBasket() {
    this.basket = null;
  }

  setItems(items: LineItem[]) {
    this.items = items;
  }

  clearItem() {
    this.items = [];
  }

  get totalPrice() {
    return this.items.reduce((acc, item) => {
      const amount = item.totalPrice.centAmount ?? 0;
      return acc + amount;
    }, 0);
  }
}

export const basketStore = new BasketStore();
