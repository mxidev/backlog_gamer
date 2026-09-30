import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}