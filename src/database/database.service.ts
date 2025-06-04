import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseConnectionInfo } from './utils';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  private readonly logger = new Logger(DatabaseService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log(DatabaseConnectionInfo.DATABASE_CONNECTION_ESTABLISHED);
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log(DatabaseConnectionInfo.DATABASE_CONNECTION_CLOSED);
  }
}
