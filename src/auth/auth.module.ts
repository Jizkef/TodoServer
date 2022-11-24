import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { MongooseModule } from "@nestjs/mongoose"
import { User, UserSchema } from "src/schemas/user.schema";
import { UserService } from "src/user/user.service";
import { UserModule } from "src/user/user.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    UserModule, 
    PassportModule, 
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
  }), 
    MongooseModule.forFeature([
      { 
        name: User.name, 
        schema: UserSchema 
      }
      ])
    ],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}