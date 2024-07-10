import { Injectable } from '@nestjs/common';
import { Season } from './entities/seasons.entity'; // Replace with actual entity path
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class V1Service {
    constructor(
        @InjectRepository(Season)
        private readonly seasonRepository: Repository<Season>,
    ) {}
    
  async getSeasons() {
    const seasons = await this.seasonRepository.find(); // Assuming Season entity has been defined

    return {
      status: true,
      response: { seasons },
    };
  }
}
