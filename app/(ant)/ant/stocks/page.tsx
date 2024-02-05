import { Card } from 'antd';
import { AntMock } from '@/mocks/ant';
import { ColumnType } from 'antd/es/table';
import { StockTableRow } from '@/models/Stock';
import AntServerTable from '@/components/AntServerTable';

const columns: ColumnType<StockTableRow>[] = [
  {
    key: 'ticker',
    title: '코드',
    align: 'center',
    dataIndex: 'ticker',
  },
  {
    key: 'avatar',
    title: '이미지',
    align: 'center',
    dataIndex: 'avatar',
  },
  {
    key: 'nameKor',
    title: '이름',
    align: 'center',
    dataIndex: 'nameKor',
  },
  {
    key: 'amount',
    title: '수량',
    align: 'right',
    dataIndex: 'amount',
  },
  {
    key: 'bid',
    title: '매수가',
    align: 'right',
    dataIndex: 'bid',
  },
  {
    key: 'quote',
    title: '현재가',
    align: 'right',
    dataIndex: 'quote',
  },
  {
    key: 'ask',
    title: '목표 매도가',
    align: 'right',
    dataIndex: 'targetAsk',
  },
  {
    key: 'dividends',
    title: '누적 배당',
    align: 'right',
    dataIndex: 'dividendSum',
  },
  {
    key: 'profit',
    title: '수익',
    align: 'right',
    dataIndex: 'profit',
  },
];

async function getStocks() {
  return AntMock.generateStocks();
}

export default async function AntStockPage() {
  const stocks = await getStocks();
  return (
    <Card title={'주식투자 현황'}>
      <AntServerTable
        columns={columns}
        data={stocks.map((s, i) => ({
          key: s.ticker + i,
          ...s.toTableFormat(),
        }))}
      />
    </Card>
  );
}
