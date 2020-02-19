import { Controller, Post, Body, HttpException, Inject } from '@nestjs/common';
import {Logger} from './util/logger';
import { Configuration } from './util/configuration';
import {LoginRequest} from './model';
import {InteractiveService} from './service/interactive-service';

@Controller('api/sessions')
export class SessionController {
    constructor(private readonly logger: Logger,
        @Inject('config') private config: Configuration,
        private readonly interactive: InteractiveService) {

    }

    @Post()
    async login(@Body() body: LoginRequest): Promise<any> {
        try {
            this.logger.log().info({username: body.username}, 'Logging in');
            const tokens = await this.interactive.user().login(body.username, body.password, { siteId: '25', clientId: 'LnzInteractiveMobileApp' });
            return {
                tokens
            };
        } catch (ex) {
            throw new HttpException('System Error', 500);
        }
    }
}
