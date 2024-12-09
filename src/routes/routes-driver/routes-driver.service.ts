import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

type processRouteDTO = {
  routeId: string;
  lat: number;
  lng: number;
};

@Injectable()
export class RoutesDriverService {
  constructor(private prismaService: PrismaService) {}
  async processRoute(dto: processRouteDTO) {
    await this.prismaService.routeDriver.upsert({
      include: { route: true },
      where: { routeId: dto.routeId },
      create: {
        routeId: dto.routeId,
        points: {
          set: {
            location: {
              lat: dto.lat,
              lng: dto.lng,
            },
          },
        },
      },
      update: {
        points: {
          push: {
            location: {
              lat: dto.lat,
              lng: dto.lng,
            },
          },
        },
      },
    });
  }
}
