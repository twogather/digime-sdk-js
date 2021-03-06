/*!
 * Copyright (c) 2009-2020 digi.me Limited. All rights reserved.
 */

// NOTE: This mock is added to overcome jest timer mocks not working!!

const {isValidString, isPlainObject, isSessionValid, isConfigurationValid} = jest.requireActual("../utils");

export {
    isValidString,
    isPlainObject,
    isSessionValid,
    isConfigurationValid,
};

export const sleep = () => Promise.resolve();
