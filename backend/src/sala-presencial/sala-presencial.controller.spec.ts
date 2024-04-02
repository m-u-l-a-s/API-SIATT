import { Test, TestingModule } from '@nestjs/testing';
import { SalaPresencialController } from './sala-presencial.controller';
import { SalaPresencialService } from './sala-presencial.service';

describe('SalaPresencialController', () => {
  let controller: SalaPresencialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaPresencialController],
      providers: [SalaPresencialService],
    }).compile();

    controller = module.get<SalaPresencialController>(SalaPresencialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
