import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule,
            JwtModule.register({
                secret:"FUEHFZEF HZOEUHFOZE UFHEZOUHFO ZEHFO"
            }),
            PassportModule,],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}