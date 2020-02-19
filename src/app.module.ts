import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { SessionController } from './session.controller';
import { Logger } from './util/logger';
import { getConfiguration } from './util/configuration';
import {InteractiveService} from './service/interactive-service'

@Module({
  imports: [],
  controllers: [HealthController, SessionController],
  providers: [
    Logger,
    InteractiveService,
    {
      provide: 'config',
      useValue: getConfiguration()
    }
  ],
})
export class AppModule { }
