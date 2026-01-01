import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any | null> {
    // Hardcoded admin credentials for testing only
    if (username === 'admin' && pass === 'password123') {
      return { id: 1, username: 'admin', role: 'admin' }; // Admin role for testing
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}