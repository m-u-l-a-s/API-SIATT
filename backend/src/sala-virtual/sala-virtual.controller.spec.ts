import { Test, TestingModule } from '@nestjs/testing';
import { SalaVirtualController } from './sala-virtual.controller';
import { SalaVirtualService } from './sala-virtual.service';

describe('SalaVirtualController', () => {
  let controller: SalaVirtualController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaVirtualController],
      providers: [SalaVirtualService],
    }).compile();

    controller = module.get<SalaVirtualController>(SalaVirtualController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
