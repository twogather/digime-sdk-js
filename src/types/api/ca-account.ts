/*!
 * Copyright (c) 2009-2020 digi.me Limited. All rights reserved.
 */

import { isPlainObject } from "../../utils"
import { TypeValidationError } from "../../errors";

export interface CAAccount {
    [key: string]: unknown;
}

export const isCAAccount = (value: unknown): value is CAAccount => {

    try {
        assertIsCAAccount(value);
    } catch {
        return false;
    }
    return true;
}

export const assertIsCAAccount: (value: unknown) => asserts value is CAAccount = (value) => {

    if (!isPlainObject(value)){
        throw new TypeValidationError("Invalid 'assertIsCAAccount' argument - argument is not a plain object");
    }

}
