"use strict";

const path = require("path");
const fs = require("fs");

const plugins = {
    babel: "rules",
    flowtype: "dist/rules",
    react: "lib/rules",
    "react-native": "lib/rules"
};

let output = `
    "react-hooks/rules-of-hooks": () => require("./react-hooks/RulesOfHooks.js"),
    "react-hooks/exhaustive-deps": () => require("./react-hooks/ExhaustiveDeps.js"),
`;

Object.keys(plugins).forEach(plugin => {
    const rulesPath = plugin.startsWith("@") ? `${plugin}/${plugins[plugin]}` : `eslint-plugin-${plugin}/${plugins[plugin]}`;

    fs.readdirSync(path.join(__dirname, "node_modules", rulesPath)).filter(f => f.slice(f.lastIndexOf(".") + 1) === "js").forEach(filename => {
        const basename = path.basename(filename, ".js");

        output += `    "${plugin}/${basename.replace(/([a-zA-Z])(?=[A-Z])/ug, "$1-").toLowerCase()}": () => require("${rulesPath}/${basename}"),\n`;
    });
});

output = `"use strict";

module.exports = {${output}};
`;

fs.writeFileSync("custom-rules.js", output);
