/*!
 * Copyright (c) 2009-2020 digi.me Limited. All rights reserved.
 */
export interface Session {
    expiry: number;
    sessionKey: string;
    sessionExchangeToken: string;
}
export declare const isSession: (value: unknown) => value is Session;
export declare const assertIsSession: (value: unknown) => void;
