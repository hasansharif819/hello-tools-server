/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = payload.password || (config.default_password as string);

  userData.role = payload.role;
  userData.email = payload.email;
  userData.name = payload.name;
  userData.gender = payload.gender;
  userData.dateOfBirth = payload.dateOfBirth;
  userData.contactNo = payload.contactNo;
  userData.emergencyContactNo = payload.emergencyContactNo;
  userData.bloodGroup = payload.bloodGroup;
  userData.presentAddress = payload.presentAddress;
  userData.permanentAddress = payload.permanentAddress;
  userData.img = payload.img

  // console.log('User data from backend = ', payload);
  const result = await User.create(userData);
  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  changeStatus,
};
