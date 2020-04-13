/*!
 * Copyright (c) 2009-2020 digi.me Limited. All rights reserved.
 */

import * as t from "io-ts";
import { TypeValidationError } from "../errors";
import { RetryOptionsCodec } from "./retry-options";
import { ThrowReporter } from "io-ts/lib/ThrowReporter";
import util from "util";

export const DMESDKConfigurationCodec = t.intersection([
    t.type({
        baseUrl: t.string,
    }),
    t.partial({
        retryOptions: RetryOptionsCodec,
    }),
]);

export type DMESDKConfiguration = t.TypeOf<typeof DMESDKConfigurationCodec>;

export const isDMESDKConfiguration = DMESDKConfigurationCodec.is;

export const assertIsDMESDKConfiguration: (value: unknown, message?: string) => asserts value is DMESDKConfiguration = (
    value,
    message = "%s",
) => {

    try {
        ThrowReporter.report(RetryOptionsCodec.decode(value));
    } catch(error) {
        throw new TypeValidationError(util.format(message, error.message));
    }

}
