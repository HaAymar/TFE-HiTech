// local.strategy.ts
import { Strategy } from 'passport-local';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // Assurez-vous que votre client envoie l'e-mail avec la clé 'email'
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.authService.validateUser({ email, password });
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      console.error('Error during authentication:', error);
      return null;
    }
  }
}
