/*!
 * Copyright (c) 2009-2020 digi.me Limited. All rights reserved.
 */

import { isPlainObject, isNumber } from "../../utils"
import isString from "lodash.isstring";
import { TypeValidationError } from "../../errors";

export interface CAFileResponse {
    fileContent: string;
    fileMetadata: {
        objectCount: number;
        objectType: string;
        serviceGroup: string;
        serviceName: string;
        mimetype?: string;
    };
    compression?: string;
}

export const isCAFileResponse = (value: unknown): value is CAFileResponse => {

    try {
        assertIsCAFileResponse(value);
    } catch {
        return false;
    }
    return true;
}

export const assertIsCAFileResponse: (value: unknown) => asserts value is CAFileResponse = (value) => {

    if (!isPlainObject(value)){
        throw new TypeValidationError("Invalid 'assertIsCAFileResponse' argument - argument is not a plain object");
    }

    if (!isString(value.fileContent)){
        throw new TypeValidationError("Invalid 'assertIsCAFileResponse' argument - Property 'fileContent' on the argument is not a string");
    }

    if (!isPlainObject(value.fileMetadata)){
        throw new TypeValidationError("Invalid 'assertIsCAFileResponse' argument - argument.fileDescriptor is not a plain object");
    }

    if (!isNumber(value.fileMetadata.objectCount)) {
        throw new TypeValidationError("Invalid 'assertIsCAFileResponse' argument - Property 'fileDescriptor.objectCount' on the argument is not a number");
    }

    if (!isString(value.fileMetadata.objectType)){
        throw new TypeValidationError("Invalid 'assertIsCAFileResponse' argument - Property 'fileDescriptor.objectType' on the argument is not a string");
    }

    if (!isString(value.fileMetadata.serviceGroup)){
        throw new TypeValidationError("Invalid 'assertIsCAFileResponse' argument - Property 'fileDescriptor.serviceGroup' on the argument is not a string");
    }

    if (!isString(value.fileMetadata.serviceName)){
        throw new TypeValidationError("Invalid 'assertIsCAFileResponse' argument - Property 'fileDescriptor.serviceName' on the argument is not a string");
    }

    if (value.fileMetadata.mimetype && !isString(value.fileMetadata.mimetype)){
        throw new TypeValidationError("Invalid 'assertIsCAFileResponse' argument - Property 'fileDescriptor.mimetype' on the argument is not a string");
    }

    if (value.compression && !isString(value.compression)){
        throw new TypeValidationError("Invalid 'assertIsCAFileResponse' argument - Property 'compression' on the argument is not a string");
    }

}
