/*!
 * Copyright (c) 2009-2020 digi.me Limited. All rights reserved.
 */
export interface JWK {
    [key: string]: unknown;
}
export interface JWKS {
    keys: JWK[];
}
export declare const isJWKS: (value: unknown) => value is JWKS;
export declare const assertIsJWKS: (value: unknown) => void;
