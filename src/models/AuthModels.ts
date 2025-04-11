export class BaseRegistrationData {
  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
  repeatPassword: string | undefined;
}

export class CustomerData {
  bio: string | undefined;
  name: string | undefined;
  lastName: string | undefined;
}

export class ArtistData {
  bio: string | undefined;
  name: string | undefined;
  lastName: string | undefined;
  phoneNumber: string | undefined;
  professions = [
    {professionName: 'Mixed Media', active: false},
    {professionName: 'Painters & illustrators', active: false},
    {professionName: 'Ceramic', active: false},
    {professionName: 'Fiber', active: false},
    {professionName: 'Jewelery', active: false},
    {professionName: 'Leather-worker', active: false},
    {professionName: 'Soap & Candle', active: false},
    {professionName: 'Woodworker', active: false},
    {professionName: 'Doll & miniature', active: false},
    {professionName: 'Other', active: false},
  ];
}

