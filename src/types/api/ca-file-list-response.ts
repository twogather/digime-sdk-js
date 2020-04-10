/*!
 * Copyright (c) 2009-2020 digi.me Limited. All rights reserved.
 */

import { isPlainObject, isNumber } from "../../utils"
import isString from "lodash.isstring";
import { TypeValidationError } from "../../errors";

/*
 * AccountSyncStatus
 */

export type AccountSyncStatus = "running" | "partial" | "completed";

const ACCOUNT_SYNC_STATES: AccountSyncStatus[] = ["running", "partial", "completed"];

const assertIsAccountSyncStatus: (value: unknown) => asserts value is AccountSyncStatus = (value) => {
    const isValidState = ACCOUNT_SYNC_STATES.some((status) => value === status);
    if (!isValidState) {
        throw new TypeValidationError(`Invalid 'assertIsState' argument - argument.status.state contains an invalid value ${value}`);
    }
}

/*
 * LibrarySyncStatus
 */

export type LibrarySyncStatus = "running" | "partial" | "completed" | "pending";

const LIBRARY_SYNC_STATES: LibrarySyncStatus[] = ["running", "partial", "completed", "pending"];

const assertIsLibrarySyncStatus: (value: unknown) => asserts value is LibrarySyncStatus = (value) => {
    const isValidState = LIBRARY_SYNC_STATES.some((status) => value === status);
    if (!isValidState) {
        throw new TypeValidationError(`Invalid 'assertIsState' argument - argument.status.state contains an invalid value ${value}`);
    }
}

/*
 * CAFileListEntry
 */

export interface CAFileListEntry {
    name: string;
    updatedDate: number;
}

const assertIsCAFileListEntry: (value: unknown) => asserts value is CAFileListEntry = (value) => {

    if (!isPlainObject(value)){
        throw new TypeValidationError("Invalid 'assertIsCAFileListEntry' argument - argument.fileList is not a plain object");
    }

    if (!isString(value.name)){
        throw new TypeValidationError("Invalid 'assertIsCAFileListEntry' argument - argument.fileList.name is not a string");
    }

    if (!isNumber(value.updatedDate)){
        throw new TypeValidationError("Invalid 'assertIsCAFileListEntry' argument - argument.fileList.updatedDate is not a number");
    }
}

/*
 * AccountSyncStatusEntry
 */

export interface AccountSyncStatusEntry {
    state: AccountSyncStatus
}

export const assertIsAccountSyncStatusEntry: (value: unknown) => asserts value is AccountSyncStatusEntry = (value) => {
    if (!isPlainObject(value)) {
        throw new TypeValidationError("Invalid 'assertIsAccountSyncStatusEntry' argument - argument is not a plain object");
    }

    assertIsAccountSyncStatus(value.state);
}

/*
 * CAFileListResponse
 */

export interface CAFileListResponse {
    status: {
        state: LibrarySyncStatus;
        details?: {
            [key: string]: AccountSyncStatusEntry;
        };
    };
    fileList?: CAFileListEntry[];
}

export const isCAFileListResponse = (value: unknown): value is CAFileListResponse => {

    try {
        assertIsCAFileListResponse(value);
    } catch {
        return false;
    }
    return true;
}

export const assertIsCAFileListResponse: (value: unknown) => asserts value is CAFileListResponse = (value) => {

    if (!isPlainObject(value)){
        throw new TypeValidationError("Invalid 'assertIsCAFileListResponse' argument - argument is not a plain object");
    }

    if (!isPlainObject(value.status)){
        throw new TypeValidationError("Invalid 'assertIsCAFileListResponse' argument - argument.status is not a plain object");
    }

    assertIsLibrarySyncStatus(value.status.state);

    if (value.status.details) {
        if (!isPlainObject(value.status.details)) {
            throw new TypeValidationError("Invalid 'assertIsCAFileListResponse' argument - argument.status.details is not an array");
        }

        Object.values(value.status.details).every(assertIsAccountSyncStatusEntry);
    }

    if(value.fileList) {
        if (!Array.isArray(value.fileList)) {
            throw new TypeValidationError("Invalid 'assertIsCAFileListResponse' argument - argument.fileList is not an array");
        }

        value.fileList.every(assertIsCAFileListEntry);
    }
}
