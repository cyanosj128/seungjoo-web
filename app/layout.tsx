import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '노승주',
  description: '안녕하세요 노승주입니다',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
