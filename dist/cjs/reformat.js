"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cache = {};
function reformat(format, from, to) {
    var cacheKey = from + ":" + to + ":" + format;
    if (cacheKey in cache) {
        return cache[cacheKey];
    }
    var sourceTokens = getSortedSourceTokens(from, to);
    for (var _i = 0, sourceTokens_1 = sourceTokens; _i < sourceTokens_1.length; _i++) {
        var sourceToken = sourceTokens_1[_i];
        // Replace token with a temporary placeholder, e.g. '{7}'
        format = format.replace(new RegExp(sourceToken.value, 'g'), "{" + sourceToken.id + "}");
    }
    for (var _a = 0, sourceTokens_2 = sourceTokens; _a < sourceTokens_2.length; _a++) {
        var sourceToken = sourceTokens_2[_a];
        // Replace the placeholders with the destination format value
        format = format.replace(new RegExp("\\{" + sourceToken.id + "\\}", 'g'), to[sourceToken.formatKey]);
    }
    cache[cacheKey] = format;
    return format;
}
exports.reformat = reformat;
function getSortedSourceTokens(from, to) {
    var id = 0;
    var tokens = [];
    for (var formatKey in from) {
        if (!from.hasOwnProperty(formatKey) || !to.hasOwnProperty(formatKey)) {
            continue;
        }
        tokens.push({
            id: id++,
            value: from[formatKey],
            formatKey: formatKey,
        });
    }
    // Sort by length so that the longest tokens match first
    tokens.sort(function (lhs, rhs) { return rhs.value.length - lhs.value.length; });
    return tokens;
}
//# sourceMappingURL=reformat.js.map