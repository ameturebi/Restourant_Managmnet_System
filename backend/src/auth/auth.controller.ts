import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')  // Change this to 'auth'
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    // Validate the user credentials
    const user = await this.authService.validateUser(body.username, body.password);

    // If the user doesn't exist or credentials are invalid
    if (!user) {
      return { status: 'error', message: 'Invalid username or password' };
    }

    // If validation is successful, generate and return JWT token
    const token = await this.authService.login(user);
    return { status: 'success', access_token: token };
  }
}