'use client';
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  StockOutlined,
  ProductOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';

const { Sider } = Layout;

const items = [
  { label: 'User', link: 'users', icon: UserOutlined },
  { label: 'Stock', link: 'stocks', icon: StockOutlined },
  { label: 'Product', link: 'products', icon: ProductOutlined },
].map((item) => ({
  key: item.link,
  icon: React.createElement(item.icon),
  label: item.label,
}));

export default function AntNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div style={{ height: '64px' }} />
      <Menu
        theme="dark"
        mode="inline"
        items={items}
        onClick={(e) => router.push(`/ant/${e.key}`)}
      />
    </Sider>
  );
}
