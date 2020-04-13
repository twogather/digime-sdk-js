/*!
 * Copyright (c) 2009-2020 digi.me Limited. All rights reserved.
 */

import * as t from "io-ts";
import { TypeValidationError } from "../../errors";
import { ThrowReporter } from "io-ts/lib/ThrowReporter";
import util from "util";

export const JWKSCodec = t.type({
    keys: t.array(t.UnknownRecord),
});

export type JWKS = t.TypeOf<typeof JWKSCodec>;

export const isJWKS = JWKSCodec.is;

export const assertIsJWKS: (value: unknown, message?: string) => asserts value is JWKS = (
    value,
    message = "%s",
) => {

    try {
        ThrowReporter.report(JWKSCodec.decode(value));
    } catch(error) {
        throw new TypeValidationError(util.format(message, error.message));
    }

}