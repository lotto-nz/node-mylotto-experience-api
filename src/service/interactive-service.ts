import Interactive, { InteractiveSystem, OnBehalfInteractiveSystem } from '@lotto-nz/igt-interactive-system';
import { Injectable, Inject } from '@nestjs/common';
import { Configuration } from '../util/configuration';
import {Logger} from '../util/logger';
import { config } from 'rxjs';

@Injectable()
export class InteractiveService {
    constructor(private logger: Logger, @Inject('config') private config: Configuration) {

    }

    private _interactive: InteractiveSystem;
    player(): InteractiveSystem {
        if (!this._interactive) {
            this._interactive = Interactive.player({
                url: this.config.interactive.url,
                host: this.config.interactive.host,
                bunyan: this.logger.log()
            });
        }

        return this._interactive;
    }

    private _onbehalf: OnBehalfInteractiveSystem;
    onbehalf(): OnBehalfInteractiveSystem {
        if (!this._onbehalf) {
            this._onbehalf = Interactive.onbehalf({
                url: this.config.onbehalf.url,
                host: this.config.onbehalf.host,
                apiKey: this.config.onbehalf.apiKey,
                siteId: this.config.onbehalf.siteId,
                bunyan: this.logger.log()
            });
        }

        return this._onbehalf;
    }
}