'use client';

import { Layout } from 'antd';

const { Content } = Layout;

export default function AntContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Content style={{ margin: '24px 16px 0' }}>{children}</Content>;
}
