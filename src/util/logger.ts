import * as Bunyan from 'bunyan';
import * as BunyanFormat from 'bunyan-format';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Logger {
    private bunyan: Bunyan;

    constructor() {
        const formatter = new BunyanFormat({
            outputMode: 'short'
        });

        const settings: Bunyan.LoggerOptions = {
            name: 'mylotto-experience-api',
            serializers: Bunyan.stdSerializers,
            streams: [
                {
                    level: Bunyan.levelFromName['debug'],
                    stream: formatter
                }
            ]
        }

        this.bunyan = Bunyan.createLogger(settings);
    }

    log(): Bunyan {
        return this.bunyan;
    }
}