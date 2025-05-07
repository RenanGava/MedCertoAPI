import dayjs from "dayjs";
import { decode, Jwt, JwtPayload, Secret, sign, verify } from "jsonwebtoken";
import { prisma } from "../../prisma/prisma";

interface IGenerateJWT {
  payload: string;
}

export class GenerateTokenService {
  async generateJWT({ payload }: IGenerateJWT) {
    const secretKey = process.env.JWT_ENCODE as Secret;
    const jwt = sign({ sub: payload }, secretKey, {
      expiresIn: 60 * 60 * 24,
    });

    return jwt;
  }

  async GenerateRefreshToken(userId: string) {
    console.log(userId);
    
    const RFTokenExists = await prisma.refreshToken.findUnique({
      where: {
        userId: userId
      },
    });

    if(RFTokenExists){
      await prisma.refreshToken.delete({
        where:{
          userId: userId
        }
      })
    }
    
    const tokenDuration = dayjs().add(24, "hours").unix();

    const RFToken = await prisma.refreshToken.create({
      data: {
        userId: userId,
        expiresIn: tokenDuration,
      },
      
    });

    return RFToken;
  }

  static decodeJWT(token: string) {
    const { sub } = decode(token) as JwtPayload;
    return sub;
  }

  async validateRFToken(refreshTokenId: string) {
    const RFTokenExists = await prisma.refreshToken.findUnique({
      where: {
        id: refreshTokenId,
      },
    });

    if (!RFTokenExists) {
      throw new Error('RFT invalid!');
    }

    const tokenExpired = dayjs().isAfter(dayjs.unix(RFTokenExists?.expiresIn));

    if (tokenExpired) {
      await prisma.refreshToken.delete({
        where: { id: refreshTokenId },
      });
      

      const newRFToken = await this.GenerateRefreshToken(RFTokenExists.userId)
      const jwt = await this.generateJWT({payload:RFTokenExists.userId})
      return {
        jwt,
        RFT: newRFToken
      }
    }

    const jwt = await this.generateJWT({payload:RFTokenExists.userId})
    return {
      jwt,
      RFT: RFTokenExists
    }


  }
}
