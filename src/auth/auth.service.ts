import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { CreateAuthDto, AuthSignInDto } from "./dto";
import { Response } from "express";
import { Staff } from "@prisma/client";
import { hash, compare } from "bcrypt";
import { JwtPayload, ResponseFields, Tokens } from "../common/types";
import { StaffService } from "../staff/staff.service";
import { CreateStaffDto } from "../staff/dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly staffService: StaffService
  ) {}

  async generateTokens(user: Staff): Promise<Tokens> {
    const payload: JwtPayload = {
      id: user.id,
      login: user.login,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }
  async updateRefreshToken(userId: number, refresh_token: string) {
    const hashed_refresh_token = await hash(refresh_token, 7);
    await this.prisma.staff.update({
      where: { id: userId },
      data: { hashed_refresh_token },
    });
  }

  async signUp(
    createStaffDto: CreateStaffDto,
    res: Response
  ): Promise<ResponseFields> {
    const newUser = await this.staffService.create(createStaffDto);
    
    if (!newUser) {
      throw new InternalServerErrorException("Internal Server error");
    }
    const { access_token, refresh_token } = await this.generateTokens(newUser);

    await this.updateRefreshToken(newUser.id, refresh_token);
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME,
    });
    return { id: newUser.id, access_token };
  }

  async signIn(
    authSignInDto: AuthSignInDto,
    res: Response
  ): Promise<ResponseFields> {
    const { password, login } = authSignInDto;

    const user = await this.prisma.staff.findUnique({ where: { login } });
    if (!user) {
      throw new BadRequestException("Login or password incorrect");
    }

    const validPassword = await compare(password, user.hashed_password);
    if (!validPassword) {
      throw new BadRequestException("Login or password incorrect");
    }

    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME,
    });
    return {
      id: user.id,
      access_token: tokens.access_token,
    };
  }

  async handleRefreshToken(
    userId: number,
    refreshToken: string,
    res: Response
  ): Promise<ResponseFields> {
    const user = await this.prisma.staff.findUnique({
      where: { id: +userId },
    });

    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException("User is not defined");
    }
    const rMatches = await compare(refreshToken, user.hashed_refresh_token);
    if (!rMatches) {
      throw new ForbiddenException("Access denied");
    }
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (!decodedToken) {
      throw new UnauthorizedException("Token expired");
    }

    if (userId != decodedToken["id"]) {
      throw new UnauthorizedException("You are not authorized");
    }

    const tokens = await this.generateTokens(user);

    await this.updateRefreshToken(user.id, tokens.refresh_token);

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME,
    });
    return {
      id: user.id,
      access_token: tokens.access_token,
    };
  }

  async signOut(userId: number, res: Response) {
    const user = await this.prisma.staff.updateMany({
      where: {
        id: userId,
        hashed_refresh_token: {
          not: null,
        },
      },
      data: { hashed_refresh_token: null },
    });

    if (!user) {
      throw new ForbiddenException("Access Denied");
    }

    res.clearCookie("refresh_token");
    return {
      message: "User successfully sign out",
    };
  }
}
