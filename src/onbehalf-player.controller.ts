import { Controller, Get, Param, HttpException, Inject } from '@nestjs/common';
import {Logger} from './util/logger';
import {InteractiveService} from './service/interactive-service';

@Controller('api/onbehalf/players')
export class OnBehalfPlayerController {
    constructor(private readonly logger: Logger,
        private readonly interactive: InteractiveService) {

    }

    @Get('/:playerId/profiles')
    async getProfile(@Param('playerId') playerId: string): Promise<any> {
        try {
            this.logger.log().info({playerId}, 'Get Profile');
            const profile = await this.interactive.onbehalf().getProfile(playerId);

            return profile;
        } catch (ex) {
            throw new HttpException('System Error', 500);
        }
    }
}
