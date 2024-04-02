import { Test, TestingModule } from '@nestjs/testing';
import { ReuniaoController } from './reuniao.controller';
import { ReuniaoService } from './reuniao.service';

describe('ReuniaoController', () => {
  let controller: ReuniaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReuniaoController],
      providers: [ReuniaoService],
    }).compile();

    controller = module.get<ReuniaoController>(ReuniaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
