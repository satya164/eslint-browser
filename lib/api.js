/**
 * @fileoverview Expose out ESLint and CLI to require.
 * @author Ian Christian Myers
 */

"use strict";

const { Linter } = require("./linter");
const { SourceCode } = require("./source-code");

class RuleTester {}

module.exports = {
    Linter,
    RuleTester,
    SourceCode
};
