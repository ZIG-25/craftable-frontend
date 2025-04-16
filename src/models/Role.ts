export enum Role {
  ADMIN = 'ROLE_ADMIN',
  CUSTOMER = 'ROLE_CONSUMER',
  CREATOR = 'ROLE_CREATOR',
}

export const loginDestination = (role: Role): string => {
  switch (role) {
    case Role.ADMIN:
      return '/';
    case Role.CUSTOMER:
      return '/customer-dashboard';
    case Role.CREATOR:
      return '/creator-dashboard';
  }
}

