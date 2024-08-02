import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/services/users.service';
import { User } from '../users/models';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);

    if (user && user.password === password) { // temp, add proper logic later
      return user;
    } else if (user && user.password !== password) {
      throw new BadRequestException("Incorrect credentials");
    } 

    return this.usersService.createOne({ username, password });
  }

  login(user: User, type) {
    const LOGIN_MAP = {
      jwt: this.loginJWT,
      basic: this.loginBasic,
      default: this.loginJWT,
    }
    const login = LOGIN_MAP[ type ]

    return login ? login(user) : LOGIN_MAP.default(user);
  }

  loginJWT(user: User) {
    const payload = { username: user.name, sub: user.id };

    return {
      token_type: 'Bearer',
      access_token: this.jwtService.sign(payload),
    };
  }

  loginBasic(user: User) {
    // const payload = { username: user.name, sub: user.id };

    function encodeUserToken(user) {
      const { id, username, password } = user;
      const buf = Buffer.from([username, password].join(':'), 'utf8');

      return buf.toString('base64');
    }

    return {
      token_type: 'Basic',
      access_token: encodeUserToken(user),
    };
  }



}
