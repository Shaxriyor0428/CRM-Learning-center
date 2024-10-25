import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { AuthSignInDto, CreateAuthDto } from "./dto";
import { JwtPayloadWithRefreshToken, ResponseFields } from "../common/types";
import { AccessTokenGuard, RefreshTokenGuard } from "../common/guards";
import { GetCurentUser, GetCurentUserId, Public } from "../common/decorators";
import { CreateStaffDto } from "../staff/dto";

@UseGuards(AccessTokenGuard)
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("signup")
  @HttpCode(HttpStatus.OK)
  async signUp(
    @Body() createStaffDto: CreateStaffDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.authService.signUp(createStaffDto, res);
  }

  @Public()
  @Post("signin")
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body()
    authSingInDto: AuthSignInDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.authService.signIn(authSingInDto, res);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post("refresh-token")
  @HttpCode(HttpStatus.OK)
  async handleRefreshToken(
    @GetCurentUserId() id: number,
    @GetCurentUser("refreshToken") refreshToken: string,
    @GetCurentUser() user: JwtPayloadWithRefreshToken,
    @Res({ passthrough: true })
    res: Response
  ): Promise<ResponseFields> {
    console.log(user);

    return this.authService.handleRefreshToken(id, refreshToken, res);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post("signout")
  @HttpCode(HttpStatus.OK)
  async signOut(
    @GetCurentUserId() id: number,
    @Res({ passthrough: true })
    res: Response
  ) {
    return this.authService.signOut(+id, res);
  }
}
