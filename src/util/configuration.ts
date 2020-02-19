import { Injectable } from '@nestjs/common';

export interface Configuration {
    interactive: {
        url: string;
        host?: string;
        session: {
            siteId: string;
            clientId: string;
        }
    }
}

export function getConfiguration(): Configuration {
    return {
        interactive: {
            url: 'http://192.168.131.12',
            host: 'lnz-d2-interactive-mobile.dev.igt.com',
            session: { siteId: '25', clientId: 'LnzInteractiveMobileApp' }
        }
    }
}