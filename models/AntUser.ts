import { AntUserGenderType } from '@/app/(ant)/ant/users/page';

export interface AntUserTableRow {
  gender: Omit<AntUserGenderType, 'all'>;
  name: string;
  country: string;
  age: number;
}

export interface Response {
  results: AntUserDto[];
  info: Info;
}

export interface AntUserDto {
  gender: string;
  name: Name;
  email: string;
  login: Login;
  dob: Dob;
  registered: Registered;
  phone: string;
  cell: string;
  id: Id;
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

export interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface Dob {
  date: string;
  age: number;
}

export interface Registered {
  date: string;
  age: number;
}

export interface Id {
  name: string;
  value?: string;
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
