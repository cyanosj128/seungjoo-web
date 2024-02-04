'use client';

import { useEffect, useState } from 'react';
import { AntUserService } from '@/services/AntUser';
import {
  Card,
  Col,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Table,
} from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { ColumnType } from 'antd/es/table';
import { AntUserDto, AntUserTableRow } from '@/models/AntUser';

export const antUserGenders = ['all', 'male', 'female'] as const;
export type AntUserGenderType = (typeof antUserGenders)[number];

export const antUserCountries = ['FR', 'CH', 'US', 'BR'] as const;
export type AntUserCountryType = (typeof antUserCountries)[number];

// when items are added to antUserCountries,
// typescript will warn that the added items are not included in antUserCountryInfo
// it is safe to use antUserCountries below to make SelectOption
export const antUserCountryInfo: {
  [code in AntUserCountryType]: DefaultOptionType;
} = {
  FR: { label: '프랑스', icon: '🇫🇷' },
  CH: { label: '스위스', icon: '🇨🇭' },
  US: { label: '미국', icon: '🇺🇸' },
  BR: { label: '브라질', icon: '🇧🇷' },
};

interface AntUserFilter {
  limit: number;
  gender: AntUserGenderType;
  countries: AntUserCountryType[];
}

const defaultAntUserFilter: AntUserFilter = {
  limit: 15,
  gender: 'all',
  countries: [],
};

const columns: ColumnType<AntUserTableRow>[] = [
  {
    key: 'index',
    title: '순번',
    align: 'center',
    render: (_, __, i) => i + 1,
  },
  {
    key: 'gender',
    title: '성별',
    align: 'center',
    render: (_, r) => r.gender,
  },
  {
    key: 'name',
    title: '이름',
    align: 'center',
    render: (_, r) => r.name,
  },
  {
    key: 'country',
    title: '국적',
    align: 'center',
    render: (_, r) => r.country,
  },
  {
    key: 'age',
    title: '나이',
    align: 'center',
    render: (_, r) => r.age,
  },
];

export default function AntUserPage() {
  const [users, setUsers] = useState<AntUserDto[]>([]);
  const [filters, setFilters] = useState<AntUserFilter>(defaultAntUserFilter);

  useEffect(() => {
    updateUsers();
  }, [filters]);

  const updateUsers = async () => {
    const users = await AntUserService.getUsers(
      filters.limit,
      filters.gender,
      filters.countries
    );
    setUsers(users);
  };

  const onGenderSelect = ({ target: { value } }: RadioChangeEvent) => {
    setFilters({ ...filters, gender: value });
  };

  const onCountrySelect = (value: AntUserCountryType[]) => {
    setFilters({ ...filters, countries: value });
  };

  return (
    <>
      <Card title={'유저검색'}>
        <Row gutter={[4, 8]}>
          <Col span={12}>
            <Select<AntUserCountryType[]>
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select countries"
              defaultValue={[]}
              onChange={onCountrySelect}
              options={antUserCountries.map((c) => ({
                ...antUserCountryInfo[c],
                value: c,
              }))}
              optionRender={(option) => (
                <Space>
                  <span role="img" aria-label={option.data.label}>
                    {option.data.icon}
                  </span>
                  {option.data.label}
                </Space>
              )}
            />
          </Col>
          <Col span={12}>
            <Radio.Group
              style={{ display: 'flex', width: '100%', textAlign: 'center' }}
              onChange={onGenderSelect}
              value={filters.gender}
              optionType="button"
            >
              {antUserGenders.map((g, i) => (
                <Radio.Button style={{ flex: 1 }} value={g} key={`${g}-${i}`}>
                  {g}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Col>
          <Col span={24}></Col>
        </Row>
      </Card>
      <Table
        columns={columns}
        dataSource={users.map((user) => ({
          key: `${user.login.uuid}`,
          gender: user.gender,
          name: user.name.first + user.name.last,
          country: user.location.country,
          age: user.dob.age,
        }))}
      />
    </>
  );
}
