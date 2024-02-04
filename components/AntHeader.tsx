'use client';
import { Layout, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Header } = Layout;

export default function AntHeader() {
  const router = useRouter();

  return (
    <Header style={{ padding: 0, backgroundColor: '#FFF', textAlign: 'right' }}>
      <Button icon={<HomeOutlined />} onClick={() => router.push('/')} />
    </Header>
  );
}
