import { Injectable, Dependencies, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Roles } from './roles.decorator';
import { Role } from './role.enum';
import { compareSync } from 'bcrypt';

@Dependencies(UsersService, JwtService)
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService   

  ) {}
  async signIn(
    email: string,  
    pass: string,
    
  ): Promise<{  access_token: string , userId: number, email: string  }> {
    const user = await this.usersService.findOne2(email);
    if (!user) {
      throw new NotFoundException("Login ou senha invalido!s");
    }

    const isValid = compareSync(pass, user.password);

    if (!isValid) {
      console.log('Password mismatch');
      throw new UnauthorizedException('Invalid password');
    }



    const payload = { email: user.email, userId: user.userId };

    const accessToken = await this.jwtService.signAsync(payload);
    return {
      access_token: accessToken,
      userId : user.userId,
      email : email,
     

    };
  }
}