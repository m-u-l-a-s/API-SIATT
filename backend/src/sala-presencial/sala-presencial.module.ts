import { Module } from '@nestjs/common';
import { SalaPresencialService } from './sala-presencial.service';
import { SalaPresencialController } from './sala-presencial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaPresencialEntity } from './entities/sala-presencial.entity';
import { ReuniaoEntity } from 'src/reuniao/entities/reuniao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalaPresencialEntity, ReuniaoEntity])],
  controllers: [SalaPresencialController],
  providers: [SalaPresencialService],
  exports: [TypeOrmModule]
})
export class SalaPresencialModule {}
