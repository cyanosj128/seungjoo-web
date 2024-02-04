import { Dividend, Stock } from '@/models/Stock';
import { CommonMock } from './common';
import Big from 'big.js';

const sampleStocks = [
  { name: 'tesla', nameKor: '테슬라', imageUrl: '/stocks/tesla.png' },
  { name: 'meta', nameKor: '메타', imageUrl: '/stocks/meta.png' },
  { name: 'nvdia', nameKor: '엔비디아', imageUrl: '/stocks/nvdia.png' },
  { name: 'apple', nameKor: '애플', imageUrl: '/stocks/apple.png' },
  {
    name: 'microsoft',
    nameKor: '마이크로소프트',
    imageUrl: '/stocks/microsoft.png',
  },
  { name: 'pepsi', nameKor: '펩시', imageUrl: '/stocks/pepsi.png' },
  { name: 'starbucks', nameKor: '스타벅스', imageUrl: '/stocks/starbucks.png' },
  { name: 'amazon', nameKor: '아마존', imageUrl: '/stocks/amazon.png' },
];

const nowMilliseconds = new Date().getTime();

export const AntMock = {
  generateStocks(): Stock[] {
    return sampleStocks.map((sampleStock) => {
      const dividendsCount = CommonMock.generateNumber(20);
      const dividends = Array.from(
        { length: dividendsCount },
        () =>
          new Dividend(
            nowMilliseconds - CommonMock.generateNumber(1000000),
            this.generateStockDollarPrice()
          )
      );
      return new Stock(
        this.generateTicker(),
        sampleStock.nameKor,
        sampleStock.name,
        this.generateStockDollarPrice(),
        this.generateStockDollarPrice(),
        new Big(CommonMock.generateNumber(624)),
        this.generateStockDollarPrice(),
        dividends,
        sampleStock.imageUrl
      );
    });
  },
  generateTicker() {
    const letters = 'TSBDAEFAFT';
    let tempTicker = '';

    while (tempTicker.length < 3) {
      tempTicker += letters[Math.floor(Math.random() * letters.length)];
    }

    return tempTicker;
  },
  generateStockDollarPrice() {
    return new Big(CommonMock.generateNumber(3252321) / 100);
  },
};
