/*!
 * Copyright (c) 2009-2020 digi.me Limited. All rights reserved.
 */

import fs from "fs";
import got from "got";
import type { ExtendOptions, Got } from "got";
import memoize from "lodash.memoize";
import path from "path";
import pkgDir from "pkg-dir";
import { PeerCertificate } from "tls";
import { DigiMeSDKError, ServerIdentityError } from "./errors";

type ExtendedGotExtendOptions = ExtendOptions & {
    checkServerIdentity?: (host: string, cert: PeerCertificate) => void;
};

type ExtendedInstancesOrOptions = Array<Got | ExtendedGotExtendOptions>;

type ExtendedGot = typeof got & {
    extend(...instancesOrOptions: ExtendedInstancesOrOptions): Got;
};

interface PinnedHosts {
    [key: string]: PinnedHostCertificate[];
}

type PinnedHostCertificate = Buffer;

const getCertificate = (certPath: string): Buffer => {
    const pem = fs.readFileSync(certPath)
        .toString()
        .replace("-----BEGIN CERTIFICATE-----", "")
        .replace("-----END CERTIFICATE-----", "")
        .replace(/\s+|\n\r|\n|\r$/gm, "");

    return Buffer.from(pem, "base64");
};

const getPinningData = memoize((directory: string): PinnedHosts => (
    fs.readdirSync(directory).reduce((acc, hostName) => {
        try {
            return {
                ...acc,
                [hostName]: fs.readdirSync(path.resolve(directory, hostName)).map((cert) => (
                    getCertificate(path.resolve(directory, hostName, cert))
                )),
            };
        } catch {
            return acc;
        }
    }, {})
));

const packageDir = (): string => {
    const packageDirectory = pkgDir.sync(__dirname);

    if (!packageDirectory) {
        throw new DigiMeSDKError("Unable to determine digime-js-sdk package root");
    }

    return packageDirectory;
};

const defaultPinningDataPath: string = path.resolve(packageDir(), "certificates");

export const net: Got = (got as ExtendedGot).extend({
    checkServerIdentity: (host: any, cert: any) => {
        const pinnedHosts: PinnedHosts = getPinningData(defaultPinningDataPath);
        const pinnedHost: Buffer[] | undefined = pinnedHosts[host];

        // Host not pinned
        if (!pinnedHost) {
            return;
        }

        if (pinnedHost.length <= 0) {
            throw new ServerIdentityError("Certificate pinning failed!");
        }

        const hasValidPin = pinnedHost.find((pin) => pin.equals(cert.raw));

        if (!hasValidPin) {
            throw new ServerIdentityError("Certificate pinning failed!");
        }
    },
});
