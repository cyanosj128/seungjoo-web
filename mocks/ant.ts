import { Dividend, Stock } from '@/models/Stock';
import { CommonMock } from './common';
import Big from 'big.js';

const stockNames = [
  { name: 'tesla', nameKor: '테슬라' },
  { name: 'meta', nameKor: '메타' },
  { name: 'nvdia', nameKor: '엔비디아' },
  { name: 'apple', nameKor: '애플' },
  { name: 'microsoft', nameKor: '마이크로소프트' },
  { name: 'pepsi', nameKor: '펩시' },
  { name: 'starbucks', nameKor: '스타벅스' },
  { name: 'amazon', nameKor: '아마존' },
];

const nowMilliseconds = new Date().getTime();

export const AntMock = {
  generateStocks(): Stock[] {
    return stockNames.map((stockName) => {
      const dividendsCount = CommonMock.generateNumber(20);
      const dividends = new Array(dividendsCount)
        .fill(0)
        .map(
          () =>
            new Dividend(
              nowMilliseconds - CommonMock.generateNumber(1000000),
              this.generateStockDollarPrice()
            )
        );
      return new Stock(
        this.generateTicker(),
        stockName.nameKor,
        stockName.name,
        this.generateStockDollarPrice(),
        this.generateStockDollarPrice(),
        new Big(CommonMock.generateNumber(624)),
        this.generateStockDollarPrice(),
        dividends
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
