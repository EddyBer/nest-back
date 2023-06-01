import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/modules/user/user.service';
import { USERS } from 'src/modules/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  private generateAccessToken(user: USERS) {
    const userId = user.id;
    const type = 'access';

    return this.jwtService.sign(
      { type, userId },
      {expiresIn:"2h"},
    );
  }

  async login(data): Promise<string> {

    if (!data.email || !data.password) {
      throw new UnauthorizedException('Authentication failed');
    }
    const user = await this.userService.findOneByMail(data.email);

    if (!user) {
      throw new UnauthorizedException('Authentication failed');
    }
    console.log(user.dataValues.password)
    console.log(data.password)
    const passwordMatch = await bcrypt.compare(
      data.password,
      user.dataValues.password,
    );
    console.log('result :' + passwordMatch)
    if (!passwordMatch) {
      throw new UnauthorizedException('Authentication failed');
    }

    const token = this.generateAccessToken(user);

    return token
  }
}
