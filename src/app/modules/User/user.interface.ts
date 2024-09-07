/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TGender = 'male' | 'female' | 'other';
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export interface TUser {
  name: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'superAdmin' | 'admin' | 'user';
  gender: TGender;
  dateOfBirth?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  bloodGroup: TBloodGroup;
  presentAddress?: string;
  permanentAddress?: string;
  status: 'in-progress' | 'blocked';
  olderPassword?: string;
  oldestPassword?: string;
  isDeleted: boolean;
  img?: string;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isOlderPasswordMatched(newP: string, olderP: string): Promise<boolean>;
  isOldestPasswordMatched(newP: string, oldestP: string): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
