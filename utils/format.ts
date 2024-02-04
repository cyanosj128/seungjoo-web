import Big from 'big.js';

export const Format = {
  bigNumber(value: Big) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
};
