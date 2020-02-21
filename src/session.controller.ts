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
            const tokens = await this.interactive.player().login(body.username, body.password, this.config.interactive.session);

            const bearer = tokens.find( t => t.tokenType === "bearer");
            if (bearer == undefined) {
                throw new HttpException('Unable to login', 500);
            }

            this.logger.log().info({username: body.username}, 'Retrieving profile and wallet (scatter-gather)');
            const info = await Promise.all([
                this.interactive.player().getProfile(bearer.token),
                this.interactive.player().getWallet(bearer.token)]
            );

            return {
                profile: info[0],
                wallet: info[1],
                isInsideGeoFence: true,
                tokens
            };
        } catch (ex) {
            this.logger.log().error({message: ex.message}, 'Login');
            if (ex instanceof HttpException) {
                throw ex;
            }

            throw new HttpException(ex.message, 401);
        }
    }
}
