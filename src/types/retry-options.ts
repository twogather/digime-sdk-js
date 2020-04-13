/*!
 * Copyright (c) 2009-2020 digi.me Limited. All rights reserved.
 */

import * as t from "io-ts";
import { TypeValidationError } from "../errors";
import type { RetryFunction } from "got";
import { ThrowReporter } from "io-ts/lib/ThrowReporter";
import util from "util";

const isRetryFunction = (u: unknown): u is RetryFunction => typeof u === 'function';

const RetryFunctionCodec = new t.Type<RetryFunction, unknown, unknown>(
    'RetryFunctionCodec',
    isRetryFunction,
    (u, c) => (isRetryFunction(u) ? t.success(u) : t.failure(u, c)),
    t.identity,
);

export const RetryOptionsCodec = t.partial({
    retries: t.number,
    limit: t.number,
    methods: t.array(t.keyof({
        GET: null,
        POST: null,
        PUT: null,
        PATCH: null,
        HEAD: null,
        DELETE: null,
        OPTIONS: null,
        TRACE: null,
        get: null,
        post: null,
        put: null,
        patch: null,
        head: null,
        delete: null,
        options: null,
        trace: null,
    })),
    statusCodes: t.array(t.number),
    errorCodes: t.array(t.string),
    calculateDelay: RetryFunctionCodec,
    maxRetryAfter: t.number,
});

export type RetryOptions = t.TypeOf<typeof RetryOptionsCodec>;

export const isRetryOptions = RetryOptionsCodec.is;

export const assertIsRetryOptions: (value: unknown, message?: string) => asserts value is RetryOptions = (
    value,
    message = "%s",
) => {

    try {
        ThrowReporter.report(RetryOptionsCodec.decode(value));
    } catch(error) {
        throw new TypeValidationError(util.format(message, error.message));
    }

}
