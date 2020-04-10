/*!
 * Copyright (c) 2009-2020 digi.me Limited. All rights reserved.
 */

import { isPlainObject } from "../../utils"
import { TypeValidationError } from "../../errors";

export interface JWK {
    [key: string]: unknown,
}

export interface JWKS {
    keys: JWK[]
}

export const isJWKS = (value: unknown): value is JWKS => {

    try {
        assertIsJWKS(value);
    } catch {
        return false;
    }
    return true;
}

export const assertIsJWKS: (value: unknown) => asserts value is JWKS = (value) => {
    if (!isPlainObject(value)) {
        throw new TypeValidationError("Invalid 'assertIsJWKS' argument - argument is not a plain object");
    }

    if (!Array.isArray(value.keys)) {
        throw new TypeValidationError("Invalid 'assertIsJWKS' argument - argument.keys is not an array");
    }

    if (!value.keys.every(isPlainObject)) {
        throw new TypeValidationError("Invalid 'assertIsJWKS' argument - argument.keys array contains non-object values");
    }
}
