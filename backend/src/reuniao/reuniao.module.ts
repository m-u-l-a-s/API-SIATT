import { Module } from '@nestjs/common';
import { ReuniaoService } from './reuniao.service';
import { ReuniaoController } from './reuniao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReuniaoEntity } from './entities/reuniao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReuniaoEntity])],
  controllers: [ReuniaoController],
  providers: [ReuniaoService],
  exports: [TypeOrmModule]
})
export class ReuniaoModule {}
