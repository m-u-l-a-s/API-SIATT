import { Test, TestingModule } from '@nestjs/testing';
import { SalaPresencialService } from './sala-presencial.service';

describe('SalaPresencialService', () => {
  let service: SalaPresencialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalaPresencialService],
    }).compile();

    service = module.get<SalaPresencialService>(SalaPresencialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
