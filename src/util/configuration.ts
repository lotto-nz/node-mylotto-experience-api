import { Injectable } from '@nestjs/common';

export interface Configuration {
    interactive: {
        url: string;
        host?: string;
        session: {
            siteId: string;
            clientId: string;
        }
    },
    onbehalf?: {
        url: string;
        host?: string;
        siteId: number;
        apiKey: string;
    }
}

export function getConfiguration(): Configuration {
    return {
        interactive: {
            url: 'http://192.168.131.12',
            host: 'lnz-d2-interactive-mobile.dev.igt.com',
            session: { siteId: '25', clientId: 'LnzInteractiveMobileApp' }
        },
        onbehalf: {
            url: 'http://192.168.131.12',
            host: 'p2p-d2-mobile-api.dev.igt.com',
            apiKey: 'P2P',
            siteId: 25
        }
    }
}