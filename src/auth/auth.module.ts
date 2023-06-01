import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule,
            JwtModule.register({
                secret:"A better solution could be retrieving the existing"
            })],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}