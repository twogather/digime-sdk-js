/*!
 * Copyright (c) 2009-2020 digi.me Limited. All rights reserved.
 */

import { isPlainObject } from "../utils"
import isString from "lodash.isstring";
import { TypeValidationError } from "../errors";
import { assertIsRetryOptions } from "./retry-options";
import type { RetryOptions } from "got";

export interface DMESDKConfiguration {
    baseUrl: string;
    retryOptions?: RetryOptions;
}

export const isDMESDKConfiguration = (value: unknown): value is DMESDKConfiguration => {

    try {
        assertIsDMESDKConfiguration(value);
    } catch {
        return false;
    }
    return true;
}

export const assertIsDMESDKConfiguration: (value: unknown) => asserts value is DMESDKConfiguration = (value) => {

    if (!isPlainObject(value)){
        throw new TypeValidationError("Invalid 'assertIsDMESDKConfiguration' argument - argument is not a plain object");
    }

    if (!isString(value.baseUrl)){
        throw new TypeValidationError("Invalid 'assertIsDMESDKConfiguration' argument - Property 'baseUrl' on the argument is not a string");
    }

    if (value.retryOptions) {
        assertIsRetryOptions(value.retryOptions);
    }
}
