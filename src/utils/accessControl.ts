import { AccessControl } from 'accesscontrol';

const admin = {
  user: {
    'create:any': ['*', '!views'],
    'read:any': ['*'],
    'update:any': ['*', '!views'],
    'delete:any': ['*']
  }
};

const guest = {
  user: {
    'create:own': ['*'],
    'read:own': ['*'],
    'update:own': ['*', '!rating', '!views'],
    'delete:own': ['*']
  }
};

export const accessControl = new AccessControl({ admin, guest });
