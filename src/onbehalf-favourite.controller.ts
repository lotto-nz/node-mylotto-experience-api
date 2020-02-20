import { Controller, Get, Param, HttpException, Inject } from '@nestjs/common';
import {Logger} from './util/logger';
import {InteractiveService} from './service/interactive-service';

@Controller('api/onbehalf/players')
export class OnBehalfFavouriteController {
    constructor(private readonly logger: Logger,
        private readonly interactive: InteractiveService) {

    }

    @Get('/:playerId/favourites')
    async getFavourites(@Param('playerId') playerId: string): Promise<any> {
        try {
            this.logger.log().info({playerId}, 'Get Favourites');
            const favourites = await this.interactive.onbehalf().getFavourites(playerId);
            return {
                data: favourites
            };
        } catch (ex) {
            throw new HttpException('System Error', 500);
        }
    }
}
