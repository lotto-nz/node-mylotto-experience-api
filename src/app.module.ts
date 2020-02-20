import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { SessionController } from './session.controller';
import { Logger } from './util/logger';
import { getConfiguration } from './util/configuration';
import {InteractiveService} from './service/interactive-service';
import { OnBehalfFavouriteController} from './onbehalf-favourite.controller';
import {OnBehalfPlayerController} from './onbehalf-player.controller';
import {OnBehalfResponsibleController} from './onbehalf-responsible.controller';

@Module({
  imports: [],
  controllers: [
    HealthController,
    SessionController,
    OnBehalfFavouriteController,
    OnBehalfPlayerController,
    OnBehalfResponsibleController
  ],
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
