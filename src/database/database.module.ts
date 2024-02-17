// config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  exports: [ConfigModule],
})
export class CustomConfigModule {}
