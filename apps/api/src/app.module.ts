import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';
import { LibraryModule } from './library/library.module';

@Module({
  imports: [HealthModule, AuthModule, CatalogModule, LibraryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
