import { Test, TestingModule } from '@nestjs/testing';
import { ReuniaoAnexosController } from './reuniao-anexos.controller';
import { ReuniaoAnexosService } from './reuniao-anexos.service';

describe('ReuniaoAnexosController', () => {
  let controller: ReuniaoAnexosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReuniaoAnexosController],
      providers: [ReuniaoAnexosService],
    }).compile();

    controller = module.get<ReuniaoAnexosController>(ReuniaoAnexosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
