import { Controller, Post, Body, HttpException, Inject } from '@nestjs/common';
import {Logger} from './util/logger';
import { Configuration } from './util/configuration';
import {LoginRequest} from './model';
import {InteractiveService} from './service/interactive-service';
import { TokenType } from '@lotto-nz/igt-interactive-system';

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

            const bearer = tokens.find( t => t.tokenType === "bearer");

            const profile = await this.interactive.user().getProfile(bearer.token);
            return {
                profile,
                tokens
            };
        } catch (ex) {
            this.logger.log().error({message: ex.message}, 'Login');
            throw new HttpException('System Error', 500);
        }
    }
}
