/*!
 * Copyright (c) 2009-2020 digi.me Limited. All rights reserved.
 */

import * as t from "io-ts";
import { ThrowReporter } from "io-ts/lib/ThrowReporter";
import { TypeValidationError } from "../../errors";
import util from "util";

export const SessionCodec = t.type({
    expiry: t.number,
    sessionKey: t.string,
    sessionExchangeToken: t.string,
});

export type Session = t.TypeOf<typeof SessionCodec>;

export const isSession = SessionCodec.is;

export const assertIsSession: (value: unknown, message?: string) => asserts value is Session = (
    value,
    message = "%s",
) => {

    try {
        ThrowReporter.report(SessionCodec.decode(value));
    } catch(error) {
        throw new TypeValidationError(util.format(message, error.message));
    }

}
