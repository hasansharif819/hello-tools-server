export const USER_ROLE = {
  superAdmin: 'superAdmin',
  admin: 'admin',
  user: 'user',
} as const;

export const UserStatus = ['in-progress', 'blocked'];

export const UserRole = ['superAdmin', 'admin', 'user'];

import { TBloodGroup, TGender } from './user.interface';

export const Gender: TGender[] = ['male', 'female', 'other'];

export const BloodGroup: TBloodGroup[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];
