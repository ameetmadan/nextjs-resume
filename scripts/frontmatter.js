import { parse } from 'yaml';

export function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? (parse(match[1]) ?? {}) : {};
}

// A refresh writes JSON that the build trusts, so reject a wrong-typed field
// by name instead of writing it through.
export function asString(value, field, file) {
  if (value === undefined || value === null) {
    return '';
  }
  if (typeof value !== 'string') {
    throw new TypeError(`${file}: "${field}" must be a string`);
  }
  return value.trim();
}

export function asStringArray(value, field, file) {
  if (value === undefined || value === null) {
    return [];
  }
  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim());
  }
  if (Array.isArray(value) && value.every((item) => typeof item === 'string')) {
    return value;
  }
  throw new TypeError(`${file}: "${field}" must be a list of strings`);
}
