import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOrCreateUser(walletAddress: string) {
    let user = await this.prisma.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: { walletAddress },
      });
    }

    return user;
  }

  async getUserByWallet(walletAddress: string) {
    return this.prisma.user.findUnique({
      where: { walletAddress },
      include: {
        bets: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
  }
}
