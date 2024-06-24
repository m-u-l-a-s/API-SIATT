import { Module } from '@nestjs/common';
import { ReuniaoAnexosService } from './reuniao-anexos.service';
import { ReuniaoAnexosController } from './reuniao-anexos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReuniaoAnexo } from './entities/reuniao-anexo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReuniaoAnexo])],
  controllers: [ReuniaoAnexosController],
  providers: [ReuniaoAnexosService],
  exports: [TypeOrmModule]
})
export class ReuniaoAnexosModule {}
