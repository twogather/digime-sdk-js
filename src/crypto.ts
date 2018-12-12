/*!
 * Copyright (c) 2009-2018 digi.me Limited. All rights reserved.
 */

import crypto from "crypto";
import NodeRSA from "node-rsa";

const BYTES = {
    DSK: [0, 256],
    DIV: [256, 272],
    HASH_DATA: [272],
    HASH: [0, 64],
    DATA: [64],
};

const isValidSize = (data: string): boolean => {
    const bytes = Buffer.byteLength(data, "base64");
    return bytes >= 352 && bytes % 16 === 0;
};

export const decryptData = (key: NodeRSA, fileData: string): Buffer => {

    // Verify file data is of correct length
    if (!isValidSize(fileData)) {
        throw new Error("File size not valid");
    }

    const file: Buffer = Buffer.from(fileData, "base64");

    // Recover DSK and DIV
    const dsk: Buffer = key.decrypt(file.slice(...BYTES.DSK));
    const div: Buffer = file.slice(...BYTES.DIV);

    // Recover concated hash and data
    const decipher = crypto.createDecipheriv("aes-256-cbc", dsk, div);
    const hashAndData = Buffer.concat([decipher.update(file.slice(...BYTES.HASH_DATA)), decipher.final()]);

    // Separate hash and data
    const hash: Buffer = hashAndData.slice(...BYTES.HASH);
    const data: Buffer = hashAndData.slice(...BYTES.DATA);

    // Validate data
    const dataHash: Buffer = crypto.createHash("sha512").update(data).digest();

    if (!dataHash.equals(hash)) {
        throw new Error("HASH ERROR");
    }

    return data;
};