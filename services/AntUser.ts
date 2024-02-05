import {
  AntUser,
  AntUserCountryType,
  AntUserDto,
  AntUserGenderType,
  AntUserResponse,
} from '@/models/AntUser';

export const AntUserService = {
  async getUsers(
    limit: number,
    gender: AntUserGenderType,
    countries: AntUserCountryType[]
  ): Promise<AntUser[]> {
    let url = `https://randomuser.me/api?results=${limit}`;

    if (gender !== 'all') {
      url += `&gender=${gender}`;
    }

    if (countries.length) {
      url += `&nat=${countries.join(',')}`;
    }

    try {
      return (await fetch(url))
        .json()
        .then((e: AntUserResponse) =>
          e.results.map(
            (result) =>
              new AntUser(
                result.name.first,
                result.name.last,
                result.gender,
                result.location.country,
                result.dob.age,
                result.picture.medium
              )
          )
        );
    } catch (err) {
      console.log(err);
      return [];
    }
  },
};
