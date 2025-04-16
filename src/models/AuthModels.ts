export class LoginData {
  email: string | undefined;
  password: string | undefined;
}

export class BaseRegistrationData {
  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
  repeatPassword: string | undefined;
}

export class AddionalCustomerData {
  bio: string | undefined;
  name: string | undefined;
  lastName: string | undefined;
}

export class AdditionalArtistData {
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

export class CreatorRegistrationData {
  login: string | undefined;
  password: string | undefined;
  email: string | undefined;
  name: string | undefined;
  surname: string | undefined;
  bio: string | undefined;
  phoneNumber: number | undefined; // This is how it is defined on backend side

  constructor(base: BaseRegistrationData, addtional: AdditionalArtistData) {
    this.login = base.username;
    this.password = base.password;
    this.email = base.email;
    this.name = addtional.name;
    this.surname = addtional.lastName;
    this.bio = addtional.bio;
    this.phoneNumber = parseInt(addtional.phoneNumber?? '')
  }
}


export class CustomerRegistrationData {
  login: string | undefined;
  password: string | undefined;
  email: string | undefined;
  name: string | undefined;
  surname: string | undefined;
  bio: string | undefined;

  constructor(base: BaseRegistrationData, additional: AddionalCustomerData) {
    this.login = base.username;
    this.password = base.password;
    this.email = base.email;
    this.name = additional.name;
    this.surname = additional.lastName;
    this.bio = additional.bio;
  }
}
