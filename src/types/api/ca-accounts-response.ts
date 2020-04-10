/*!
 * Copyright (c) 2009-2020 digi.me Limited. All rights reserved.
 */

import { isPlainObject } from "../../utils"
import { TypeValidationError } from "../../errors";
import { CAAccount, assertIsCAAccount } from "./ca-account";

export interface CAAccountsResponse {
    accounts: CAAccount[];
}

export const isCAAccountsResponse = (value: unknown): value is CAAccountsResponse => {

    try {
        assertIsCAAccountsResponse(value);
    } catch {
        return false;
    }
    return true;
}

export const assertIsCAAccountsResponse: (value: unknown) => asserts value is CAAccountsResponse = (value) => {

    if (!isPlainObject(value)){
        throw new TypeValidationError("Invalid 'assertIsCAAccountsResponse' argument - argument is not a plain object");
    }

    if (!Array.isArray(value.accounts)){
        throw new TypeValidationError("Invalid 'assertIsCAAccountsResponse' argument - argument is not a plain object");
    }

    value.accounts.every(assertIsCAAccount);

}
