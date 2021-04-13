import { Order } from '@/store/models/order';
import { Product } from '@/store/models/product';
import { Unit } from '@/store/models/product';

export type State = {
    currentOrderStatus: string;
    order: Order;
    productResults: Product[];
    recentProducts: any;
    listOfProducts: Product[];
    units: Unit[];
    // eslint-disable-next-line
    error: any;
};

export const state: State = {
  currentOrderStatus: '',
  order: {},
  productResults: [],
  recentProducts: {},
  listOfProducts: [],
  units: [],
  error: null
};