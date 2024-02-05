import { DefaultOptionType } from 'antd/es/select';

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

export interface AntUserTableRow {
  gender: string;
  name: string;
  country: string;
  age: number;
}

export interface AntUserResponse {
  results: AntUserDto[];
  info: Info;
}

export class AntUser {
  constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly gender: string,
    readonly country: string,
    readonly age: number,
    readonly picture: string
  ) {}

  toTableFormat(): AntUserTableRow {
    return {
      gender: this.gender === 'male' ? '남' : '여',
      name: `${this.firstName} ${this.lastName}`,
      country: this.country,
      age: this.age,
    };
  }
}

export interface AntUserDto {
  gender: string;
  name: Name;
  email: string;
  login: {
    uuid: string;
  };
  dob: {
    age: number;
  };
  phone: string;
  cell: string;
  picture: Picture;
  nat: string;
  location: Location;
}

export interface Location {
  city: string;
  state: string;
  country: string;
  postcode: any;
}

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}
