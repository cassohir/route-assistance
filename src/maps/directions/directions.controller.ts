import { Controller, Get, Query } from '@nestjs/common';
import { DirectionsService } from './directions.service';

@Controller('directions')
export class DirectionsController {
  constructor(private directionsService: DirectionsService) {}
  @Get()
  getDirections(
    @Query('originId') origin: string,
    @Query('destinationId') destination: string,
  ) {
    return this.directionsService.getDirections(origin, destination);
  }
}
