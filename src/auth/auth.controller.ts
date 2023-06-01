import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async connect( @Body() data : {}): Promise<string> {
    return this.authService.login(data);
  }

//   @HttpCode(200)
//   @UseGuards(JwtAuthGuard)
//   @Post('isAccessTokenValid')
//   async isAccessTokenValid() {
//     return this.authService.isAccessTokenValid();
//   }
}
