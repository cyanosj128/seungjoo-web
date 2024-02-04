'use client';

import { useState, useEffect } from 'react';
import { Card, Table, Avatar } from 'antd';
import { AntMock } from '@/mocks/ant';
import { ColumnType } from 'antd/es/table';
import { Stock, StockTableRow } from '@/models/Stock';

const columns: ColumnType<StockTableRow>[] = [
  {
    key: 'ticker',
    title: '코드',
    align: 'center',
    render: (_, r) => r.ticker,
  },
  {
    key: 'image',
    title: '이미지',
    align: 'center',
    render: (_, r) => <Avatar src={r.imageUrl} alt={r.ticker} />,
  },
  {
    key: 'nameKor',
    title: '이름',
    align: 'center',
    render: (_, r) => r.nameKor,
  },
  {
    key: 'amount',
    title: '수량',
    align: 'right',
    render: (_, r) => r.amount,
  },
  {
    key: 'bid',
    title: '매수가',
    align: 'right',
    render: (_, r) => r.bid,
  },
  {
    key: 'quote',
    title: '현재가',
    align: 'right',
    render: (_, r) => r.quote,
  },
  {
    key: 'ask',
    title: '목표 매도가',
    align: 'right',
    render: (_, r) => r.targetAsk,
  },
  {
    key: 'dividends',
    title: '누적 배당',
    align: 'right',
    render: (_, r) => r.dividendSum,
  },
  {
    key: 'profit',
    title: '수익',
    align: 'right',
    render: (_, r) => r.profit,
  },
];

export default function AntStockPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    setStocks(AntMock.generateStocks());
  }, []);

  return (
    <Card title={'주식투자 현황'}>
      <Table
        columns={columns}
        dataSource={stocks.map((s, i) => ({
          key: s.ticker + i,
          ...s.toTableFormat(),
        }))}
      />
    </Card>
  );
}
