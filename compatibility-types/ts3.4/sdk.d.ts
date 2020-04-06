/*!
 * Copyright (c) 2009-2020 digi.me Limited. All rights reserved.
 */
import NodeRSA from "node-rsa";
import { GetFileListResponse } from "./api-responses";
import { PushedFileMeta } from "./postbox";
import { CAScope, FileMeta, GetSessionDataResponse, OngoingAccessAuthorization, OngoingAccessConfiguration } from "./types";
import { Session } from "./types/session";
import { DMESDKConfiguration } from "./types/dme-sdk-configuration";
declare type FileSuccessResult = {
    data: any;
} & FileMeta;
declare type FileErrorResult = {
    error: Error;
} & FileMeta;
declare type FileSuccessHandler = (response: FileSuccessResult) => void;
declare type FileErrorHandler = (response: FileErrorResult) => void;
declare const init: (sdkOptions?: Partial<DMESDKConfiguration> | undefined) => {
    getFile: (sessionKey: string, fileName: string, privateKey: NodeRSA.Key) => Promise<FileMeta>;
    getFileList: (sessionKey: string) => Promise<GetFileListResponse>;
    establishSession: (appId: string, contractId: string, scope?: CAScope | undefined) => Promise<Session>;
    getSessionData: (sessionKey: string, privateKey: NodeRSA.Key, onFileData: FileSuccessHandler, onFileError: FileErrorHandler) => GetSessionDataResponse;
    exchangeCodeForToken: (details: OngoingAccessConfiguration, codeVerifier: string, authorizationCode: string) => Promise<import("./types").UserAccessToken>;
    getSessionAccounts: (sessionKey: string, privateKey: NodeRSA.Key) => Promise<{
        accounts: any;
    }>;
    pushDataToPostbox: (sessionKey: string, postboxId: string, publicKey: string, pushedData: PushedFileMeta) => Promise<any>;
    getAuthorizeUrl: (appId: string, session: Session, callbackUrl?: string | undefined) => string;
    authorizeOngoingAccess: (details: OngoingAccessAuthorization, session: Session) => Promise<import("./cyclic-ca").AuthorizeOngoingAccessResponse>;
    getGuestAuthorizeUrl: (session: Session, callbackUrl: string) => string;
    getReceiptUrl: (contractId: string, appId: string) => string;
    getCreatePostboxUrl: (appId: string, session: Session, callbackUrl: string) => string;
    getPostboxImportUrl: () => string;
};
export { init, CAScope, FileMeta, FileSuccessResult, FileErrorResult, FileSuccessHandler, FileErrorHandler, Session, DMESDKConfiguration, };
