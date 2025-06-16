"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("./data");
function split(parts, value) {
    var result = {};
    var current = result;
    parts.forEach(function (part, index) {
        if (index === parts.length - 1) {
            current[part] = value;
        }
        else {
            if (typeof current[part] !== 'object' || current[part] === null) {
                current[part] = {};
            }
            current = current[part];
        }
    });
    return result;
}
function mergeDeep(target, source) {
    for (var key in source) {
        if (key in target &&
            typeof target[key] === "object" &&
            typeof source[key] === "object") {
            mergeDeep(target[key], source[key]);
        }
        else {
            target[key] = source[key];
        }
    }
}
function splitObject(object) {
    var result = {};
    for (var key in object) {
        var nested = split(key.split("_"), object[key]);
        mergeDeep(result, nested);
    }
    return result;
}
var main = function () {
    console.log(JSON.stringify(splitObject(data_1.data), null, 2));
};
main();
