import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
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

  private generateRefreshToken(user: USERS) {
    const type = 'refresh';
    const { id } = user;
    const key = this.generateKey(user);

    return this.jwtService.sign({ type, id: id, key });
  }

  private generateKey(user: USERS) {
    const { password, id: id } = user;
    return crypto
      .createHmac(
        'sha256',
        'FUEHFZEF HZOEUHFOZE UFHEZOUHFO ZEHFO',
      )
      .update(id + password)
      .digest('hex');
  }


  async login(data): Promise<{}> {

    if (!data.email || !data.password) {
      throw new UnauthorizedException('Authentication failed');
    }
    const user = await this.userService.findOneByMail(data.email);

    if (!user) {
      throw new UnauthorizedException('Authentication failed');
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.dataValues.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Authentication failed');
    }

    const token = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    const result = {
      accessToken : token,
      refreshToken : refreshToken,
      userId: user.id
    }

    return result
  }

  // async refreshToken(
  //   refreshTokenAuthDto: RefreshTokenAuthDto,
  // ): Promise<RefreshTokenAuthResult> {
  //   try {
  //     const payload = this.jwtService.verify(refreshTokenAuthDto.refreshToken);

  //     if (payload.type !== 'refresh') {
  //       throw new UnauthorizedException('Authentication failed');
  //     }

  //     const user = await this.userService.findById(payload.id);

  //     const expectedKey = this.generateKey(user);
  //     if (expectedKey !== payload.key) {
  //       throw new UnauthorizedException('Authentication failed');
  //     }

  //     user.lastRefreshTokenRequest = new Date();
  //     await user.save();

  //     return new RefreshTokenAuthResult(this.generateAccessToken(user));
  //   } catch (error) {
  //     throw new UnauthorizedException();
  //   }
  // }

  async isAccessTokenValid(): Promise<boolean> {
    return true;
  }
}
