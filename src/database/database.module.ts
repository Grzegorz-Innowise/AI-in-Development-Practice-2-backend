import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

/**
 * DatabaseModule provides the database connection and related services for the application.
 *
 * Exports DatabaseService for use in other modules.
 */
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
