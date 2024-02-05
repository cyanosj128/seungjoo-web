import { Table } from 'antd';
import { ColumnType } from 'antd/es/table';

interface Props<T> {
  data: T[];
  columns: ColumnType<T>[];
}

export default function AntServerTable<T extends Object>({
  columns,
  data,
}: Props<T>) {
  return (
    <Table
      columns={columns}
      dataSource={data.map((d, index) => ({
        key: `${index}`,
        ...d,
      }))}
    />
  );
}
