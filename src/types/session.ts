/*!
 * Copyright (c) 2009-2020 digi.me Limited. All rights reserved.
 */

import { isPlainObject } from "../utils"
import isInteger from "lodash.isinteger"
import isString from "lodash.isstring";
import { TypeValidationError } from "../errors";

export interface Session {
    expiry: number;
    sessionKey: string;
    sessionExchangeToken: string;
}

export const isSession = (value: unknown): value is Session => {

    try {
        assertIsSession(value);
    } catch {
        return false;
    }
    return true;
}

export const assertIsSession: (value: unknown) => asserts value is Session = (value) => {

    if (!isPlainObject(value)){
        throw new TypeValidationError("Invalid 'assertIsSession' argument - argument is not a plain object");
    }

    if (!isInteger(value.expiry)){
        throw new TypeValidationError("Invalid 'assertIsSession' argument - Property 'expiry' on the argument is not an integer");
    }

    if (!isString(value.sessionKey)){
        throw new TypeValidationError("Invalid 'assertIsSession' argument - Property 'sessionKey' on the argument is not a string");
    }

    if (!isString(value.sessionExchangeToken)){
        throw new TypeValidationError("Invalid 'assertIsSession' argument - Property 'sessionExchangeToken' on the argument is not a string");
    }
}
