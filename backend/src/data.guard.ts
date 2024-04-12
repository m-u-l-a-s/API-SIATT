// data.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { MockDataBase } from './MockDataBase/mock-database.service';

@Injectable()
export class DataGuard implements CanActivate {
  constructor(private readonly dataService: MockDataBase) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await this.dataService.isEmpty();
    return true;
  }
}
