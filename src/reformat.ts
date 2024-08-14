import { Format } from "./format";

let cache: { [cacheKey: string]: string } = {};

export function reformat(format: string, from: Format, to: Format) {
  let cacheKey = `${from}:${to}:${format}`;

  if (cacheKey in cache) {
    return cache[cacheKey];
  }

  let sourceTokens = getSortedSourceTokens(from, to);

  for (let sourceToken of sourceTokens) {
    // Replace token with a temporary placeholder, e.g. '{7}'
    format = format.replace(
      new RegExp(sourceToken.value, "g"),
      `{${sourceToken.id}}`,
    );
  }

  for (let sourceToken of sourceTokens) {
    // Replace the placeholders with the destination format value
    format = format.replace(
      new RegExp(`\\{${sourceToken.id}\\}`, "g"),
      to[sourceToken.formatKey],
    );
  }

  cache[cacheKey] = format;

  return format;
}

function getSortedSourceTokens(from: Format, to: Format) {
  let id = 0;
  let tokens = [];
  for (let formatKey in from) {
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
  tokens.sort((lhs, rhs) => rhs.value.length - lhs.value.length);

  return tokens;
}
