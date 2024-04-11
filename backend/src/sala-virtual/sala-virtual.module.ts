import { Module } from '@nestjs/common';
import { SalaVirtualService } from './sala-virtual.service';
import { SalaVirtualController } from './sala-virtual.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaVirtualEntity } from './entities/sala-virtual.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalaVirtualEntity])],
  controllers: [SalaVirtualController],
  providers: [SalaVirtualService],
  exports: [TypeOrmModule]
})
export class SalaVirtualModule {}
