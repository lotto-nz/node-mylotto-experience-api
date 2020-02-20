import { Controller, Get, Param, HttpException, Inject } from '@nestjs/common';
import {Logger} from './util/logger';
import {InteractiveService} from './service/interactive-service';

@Controller('api/onbehalf/players')
export class OnBehalfResponsibleController {
    constructor(private readonly logger: Logger,
        private readonly interactive: InteractiveService) {

    }

    @Get('/:playerId/limits')
    async getLimits(@Param('playerId') playerId: string): Promise<any> {
        try {
            this.logger.log().info({playerId}, 'Get Limits');
            const profile = await this.interactive.onbehalf().getLimits(playerId);

            return profile;
        } catch (ex) {
            throw new HttpException('System Error', 500);
        }
    }
}
