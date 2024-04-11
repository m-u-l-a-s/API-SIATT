import { Module } from '@nestjs/common';
import { ReuniaoAnexosService } from './reuniao-anexos.service';
import { ReuniaoAnexosController } from './reuniao-anexos.controller';

@Module({
  controllers: [ReuniaoAnexosController],
  providers: [ReuniaoAnexosService],
})
export class ReuniaoAnexosModule {}
