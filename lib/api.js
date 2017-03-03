/**
 * @fileoverview Expose out ESLint and CLI to require.
 * @author Ian Christian Myers
 */

"use strict";

const Linter = require("./linter");

module.exports = {
    Linter
};

let deprecatedLinterInstance = null;

Object.defineProperty(module.exports, "linter", {
    enumerable: false,
    get() {
        if (!deprecatedLinterInstance) {
            deprecatedLinterInstance = new Linter();
        }

        return deprecatedLinterInstance;
    }
});
