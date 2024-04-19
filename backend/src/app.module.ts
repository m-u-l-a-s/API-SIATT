import { Module, OnModuleInit } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ReuniaoModule } from './reuniao/reuniao.module';
import { ReuniaoAnexosModule } from './reuniao-anexos/reuniao-anexos.module';
import { SalaVirtualModule } from './sala-virtual/sala-virtual.module';
import { SalaPresencialModule } from './sala-presencial/sala-presencial.module';
import { DataGuard } from './data.guard';
import { MockDataBase } from './MockDataBase/mock-database.service';
import { MockDataBaseModule } from './MockDataBase/mock-database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      database: process.env.DB_DATABASE,
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}']
    }),
    UsuarioModule,
    ReuniaoModule,
    ReuniaoAnexosModule,
    SalaVirtualModule,
    SalaPresencialModule,
    MockDataBaseModule,
    AuthModule
  ],
  controllers: [],
  providers: [DataGuard, MockDataBase],
})
export class AppModule implements OnModuleInit{
  constructor(private readonly dataGuard : DataGuard){}

  async onModuleInit() {
    await this.dataGuard.canActivate(null);   
  }
}