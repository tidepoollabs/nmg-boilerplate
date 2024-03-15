import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TestProviderService } from './test-provider.service';

@Module({
  imports: [ConfigModule],
  providers: [TestProviderService],
  exports: [TestProviderService],
})
export class TestProviderModule {}
