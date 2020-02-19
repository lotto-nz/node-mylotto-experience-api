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
    user(): InteractiveSystem {
        if (!this._interactive) {
            this._interactive = Interactive.create({
                url: this.config.interactive.url,
                host: this.config.interactive.host,
                bunyan: this.logger.log()
            });
        }

        return this._interactive;
    }

    onbehalf(): OnBehalfInteractiveSystem {
        throw Error('Not supported');
    }
}