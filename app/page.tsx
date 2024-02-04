'use client';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';

const links = [
  { label: '노승주', link: 'me', width: 8 },
  { label: 'Frontend 개발자', link: 'developer', width: 4 },
  { label: '지도', link: 'map', width: 4 },
  { label: 'Ant Design Library', link: 'ant', width: 6 },
  { label: '주식', link: 'stock', width: 2 },
  { label: '탈중앙화거래소 (DEX)', link: 'dex', width: 7 },
  { label: '로또', link: 'lotto', width: 2 },
  { label: 'Others', link: 'others', width: 3 },
];

const widths = [8, 6, 4, 3, 2];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {
  return (
    <Grid container spacing={2}>
      {links.map((link, index) => (
        <Grid key={`${index}`} xs={link.width}>
          <Link href={link.link}>
            <Item>{link.label}</Item>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
