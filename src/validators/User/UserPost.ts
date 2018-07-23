import { MinLength, IsEmail, IsString, IsNotEmpty, IsDateString, IsArray } from 'class-validator';

import { UserParams } from '../../interfaces/User/UserParams';


export class UserPost implements UserParams {
  @IsNotEmpty()
  @IsEmail() 
  email;

  @IsNotEmpty()
  @IsString()
  @MinLength(1, {
    message: '$property is too short'
  })
  @IsString()
  firstName;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(1, {
    message: '$property is too short'
  })
  lastName;


  
  @IsNotEmpty()
  @IsString()
  @MinLength(1, {
    message: '$property is too short'
  })
  password;

  // @IsDateString()
  createdAt;
  roles;

}
