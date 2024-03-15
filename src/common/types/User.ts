export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}

export interface JwtPayload {
  key: string;
}

export enum IdentityProviders {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  GITHUB = 'github',
}

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
  ORGANIZATION_OWNER = 'organization_owner',
}

export enum UserType {
  INDIVIDUAL = 'individual',
  ORGANIZATION = 'organization',
}

export enum AuthStrategies {
  LOCAL = 'local',
  GOOGLE = 'google',
}
