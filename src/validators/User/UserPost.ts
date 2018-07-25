import { MinLength, IsEmail, IsString, IsNotEmpty, IsDateString, IsArray } from 'class-validator';

import { UserParams } from '../../interfaces/User/UserParams';


export class UserPost implements UserParams {
  @IsNotEmpty()
  @IsEmail() 
 public email;

  @IsNotEmpty()
  @IsString()
  @MinLength(1, {
    message: '$property is too short'
  })
  @IsString()
  public firstName;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(1, {
    message: '$property is too short'
  })
  public  lastName;


  
  @IsNotEmpty()
  @IsString()
  @MinLength(1, {
    message: '$property is too short'
  })
  public  password;

  // @IsDateString()
  public  createdAt;
  public  roles;

}
