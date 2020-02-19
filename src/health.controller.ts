import { Controller, Get } from '@nestjs/common';
import * as fs from 'fs-plus';
import * as path from 'path';

interface Ping {
    version: string;
    name: string;
    now: Date;
}

@Controller('api/internal')
export class HealthController {
    pkg: any;

    constructor() {
        let pkgFile = path.join(process.cwd(), 'package.json');
        while (!fs.existsSync(pkgFile) && path.dirname(pkgFile) !== '/') {
            pkgFile = path.join(path.dirname(pkgFile), '..', 'package.json');
        }

        this.pkg = JSON.parse(fs.readFileSync(pkgFile).toString());
    }

    @Get('heartbeat')
    async getHeartbeat(): Promise<Ping> {
        return {
            name: this.pkg.name,
            version: this.pkg.version,
            now: new Date()
        };
    }
}
