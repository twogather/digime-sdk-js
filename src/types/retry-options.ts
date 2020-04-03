/*!
 * Copyright (c) 2009-2020 digi.me Limited. All rights reserved.
 */

import { isPlainObject, isNumber } from "../utils"
import isString from "lodash.isstring";
import { TypeValidationError } from "../errors";
import type { RetryOptions, Method } from "got";
import isFunction from "lodash.isfunction";

export const isRetryOptions = (value: unknown): value is RetryOptions => {

    try {
        assertIsRetryOptions(value);
    } catch {
        return false;
    }
    return true;
}

export const assertIsRetryOptions: (value: unknown) => asserts value is RetryOptions = (value) => {

    if (!isPlainObject(value)) {
        throw new TypeValidationError("Invalid 'assertIsRetryOptions' argument - argument is not a plain object");
    }

    if (value.limit && !isNumber(value.limit)) {
        throw new TypeValidationError("Invalid 'assertIsRetryOptions' argument - Property 'limit' on the argument is not a number");
    }

    if (value.methods) {
        if (!Array.isArray(value.methods)) {
            throw new TypeValidationError("Invalid 'assertIsRetryOptions' argument - Property 'methods' on the argument is not an array");
        }

        value.methods.forEach(element => {
            assertIsMethod(element);
        });
    }

    if (value.statusCodes) {
        if (!Array.isArray(value.statusCodes)) {
            throw new TypeValidationError("Invalid 'assertIsRetryOptions' argument - Property 'statusCodes' on the argument is not an array");
        }

        if (!value.statusCodes.every(isNumber)) {
            throw new TypeValidationError("Invalid 'assertIsRetryOptions' argument - Property 'statusCodes' on the argument is not an array of numbers");
        }
    }

    if (value.errorCodes) {
        if (!Array.isArray(value.errorCodes)) {
            throw new TypeValidationError("Invalid 'assertIsRetryOptions' argument - Property 'errorCodes' on the argument is not an array");
        }

        if (!value.errorCodes.every(isString)) {
            throw new TypeValidationError("Invalid 'assertIsRetryOptions' argument - Property 'errorCodes' on the argument is not an array of strings");
        }
    }

    if (value.calculateDelay && !isFunction(value.calculateDelay)) {
        throw new TypeValidationError("Invalid 'assertIsRetryOptions' argument - Property 'calculateDelay' on the argument is not a function");
    }

    if (value.maxRetryAfter && !isNumber(value.maxRetryAfter)) {
        throw new TypeValidationError("Invalid 'assertIsRetryOptions' argument - Property 'maxRetryAfter' on the argument is not a number");
    }

    if (value.retries && !isNumber(value.retries)) {
        throw new TypeValidationError("Invalid 'assertIsRetryOptions' argument - Property 'retries' on the argument is not a number");
    }
}

const METHODS: Method[] = ["GET", "POST", "PUT", "PATCH", "HEAD", "DELETE", "OPTIONS", "TRACE", "get", "post", "put", "patch", "head", "delete", "options", "trace"];

const assertIsMethod: (value: unknown) => asserts value is Method = (value) => {
    const isMethod = METHODS.some((method) => value === method);
    if (isMethod) {
        throw new TypeValidationError(`Invalid 'assertIsRetryOptions' argument - Property 'methods' on the argument contains an invalid value ${value}`);
    }
}
