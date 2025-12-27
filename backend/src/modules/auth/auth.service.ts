import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserResponseDto } from "../users/dto/user-response.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    const token = this.generateToken(user);

    return {
      user,
      access_token: token,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException("Email ou senha inválidos");
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Email ou senha inválidos");
    }

    const userResponse = new UserResponseDto(user);
    const token = this.generateToken(userResponse);

    return {
      user: userResponse,
      access_token: token,
    };
  }

  async validateUser(userId: string): Promise<UserResponseDto> {
    return this.usersService.findOne(userId);
  }

  private generateToken(user: UserResponseDto): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
