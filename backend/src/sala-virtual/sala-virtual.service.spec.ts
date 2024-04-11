import { Test, TestingModule } from '@nestjs/testing';
import { SalaVirtualService } from './sala-virtual.service';

describe('SalaVirtualService', () => {
  let service: SalaVirtualService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalaVirtualService],
    }).compile();

    service = module.get<SalaVirtualService>(SalaVirtualService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
