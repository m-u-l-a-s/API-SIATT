import { Test, TestingModule } from '@nestjs/testing';
import { ReuniaoService } from './reuniao.service';

describe('ReuniaoService', () => {
  let service: ReuniaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReuniaoService],
    }).compile();

    service = module.get<ReuniaoService>(ReuniaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
