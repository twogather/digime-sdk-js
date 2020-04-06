/*!
 * Copyright (c) 2009-2020 digi.me Limited. All rights reserved.
 */
import { RetryOptions } from "got";
export interface DMESDKConfiguration {
    baseUrl: string;
    retryOptions?: RetryOptions;
}
export declare const isDMESDKConfiguration: (value: unknown) => value is DMESDKConfiguration;
export declare const assertIsDMESDKConfiguration: (value: unknown) => void;
