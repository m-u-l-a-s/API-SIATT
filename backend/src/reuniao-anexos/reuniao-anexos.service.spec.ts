import { Test, TestingModule } from '@nestjs/testing';
import { ReuniaoAnexosService } from './reuniao-anexos.service';

describe('ReuniaoAnexosService', () => {
  let service: ReuniaoAnexosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReuniaoAnexosService],
    }).compile();

    service = module.get<ReuniaoAnexosService>(ReuniaoAnexosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
