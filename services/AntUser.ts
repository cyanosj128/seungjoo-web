import {
  AntUserCountryType,
  AntUserGenderType,
} from '@/app/(ant)/ant/users/page';

export const AntUserService = {
  async getUsers(
    limit: number,
    gender: AntUserGenderType,
    countries: AntUserCountryType[]
  ) {
    let url = `https://randomuser.me/api?results=${limit}`;

    if (gender !== 'all') {
      url += `&gender=${gender}`;
    }

    if (countries.length) {
      url += `&nat=${countries.join(',')}`;
    }

    try {
      return (await fetch(url)).json().then((e) => e.results);
    } catch (err) {
      console.log(err);
    }
  },
};
