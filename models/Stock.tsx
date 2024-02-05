import { Format } from '@/utils/format';
import Big from 'big.js';
import { Avatar } from 'antd';

const RED = '#d61414';
const BLUE = '#1435d6';

export interface StockTableRow {
  ticker: string;
  nameKor: string;
  bid: string; // 매수가
  targetAsk: string; // 매도가
  amount: string;
  quote: JSX.Element; // 시세
  dividendSum: string;
  profit: JSX.Element;
  avatar: JSX.Element;
}

export class Stock {
  constructor(
    readonly ticker: string,
    readonly nameKor: string,
    readonly nameEng: string,
    readonly bid: Big, // 매수가
    readonly targetAsk: Big, // 매도가
    readonly amount: Big,
    readonly quote: Big, // 시세
    readonly dividends: Dividend[],
    readonly avatar: string
  ) {}

  toTableFormat(): StockTableRow {
    const bigDividendSum = this.getBigDividendSum();

    return {
      ticker: this.ticker,
      nameKor: this.nameKor,
      amount: Format.bigNumber(this.amount),
      bid: `$${Format.bigNumber(this.bid)}`,
      targetAsk: `$${Format.bigNumber(this.targetAsk)}`,
      dividendSum: `$${Format.bigNumber(bigDividendSum)}`,
      quote: this.getQuoteRow(),
      profit: this.getProfitRow(),
      avatar: <Avatar src={this.avatar} />,
    };
  }

  getBigDividendSum() {
    return new Big(
      this.dividends.reduce((p, c) => c.amount.add(p).toNumber(), 0)
    );
  }

  getQuoteRow() {
    const percentage = this.quote
      .minus(this.bid)
      .div(this.bid)
      .times(100)
      .round(2);

    const color = percentage.lte(0) ? BLUE : RED;
    const style = { color: color, margin: 0 };

    return (
      <div>
        <p style={style}>{`$${Format.bigNumber(this.quote)}`}</p>
        <p style={style}>{`(${Format.bigNumber(percentage)}%)`}</p>
      </div>
    );
  }

  getProfitRow() {
    const bigDividendSum = this.getBigDividendSum();

    const bigProfit = bigDividendSum
      .add(this.quote.times(this.amount))
      .minus(this.bid.times(this.amount));

    const color = bigProfit.lte(0) ? BLUE : RED;

    return (
      <span style={{ color: color }}>{`$${Format.bigNumber(bigProfit)}`}</span>
    );
  }
}

export class Dividend {
  constructor(readonly date: number, readonly amount: Big) {}
}
