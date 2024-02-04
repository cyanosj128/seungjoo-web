import AntContent from '@/components/AntContent';
import AntHeader from '@/components/AntHeader';
import AntNavigation from '@/components/AntNavigation';
import { Layout } from 'antd';

export default function AntLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AntNavigation />
      <Layout>
        <AntHeader />
        <AntContent>{children}</AntContent>
      </Layout>
    </Layout>
  );
}
