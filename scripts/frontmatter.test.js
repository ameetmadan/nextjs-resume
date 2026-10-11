import { describe, expect, test } from 'bun:test';
import { asString, asStringArray, parseFrontmatter } from './frontmatter.js';

describe('parseFrontmatter', () => {
  test('parses an inline list as an array', () => {
    const { category } = parseFrontmatter(
      '---\ncategory: [typescript, frontend]\n---\nbody',
    );
    expect(category).toEqual(['typescript', 'frontend']);
  });

  test('strips quotes from list items', () => {
    const { tags } = parseFrontmatter('---\ntags:\n  - "react"\n  - next\n---');
    expect(tags).toEqual(['react', 'next']);
  });

  test('keeps the text of a folded description', () => {
    const { description } = parseFrontmatter(
      '---\ndescription: >\n  first line\n  second line\n---',
    );
    expect(asString(description, 'description', 'a.md')).toBe(
      'first line second line',
    );
  });

  test('accepts CRLF line endings', () => {
    const { title } = parseFrontmatter('---\r\ntitle: Hello\r\n---\r\nbody');
    expect(title).toBe('Hello');
  });

  test('returns an empty object without frontmatter', () => {
    expect(parseFrontmatter('no frontmatter')).toEqual({});
  });
});

describe('field validation', () => {
  test('treats a missing field as empty', () => {
    expect(asString(undefined, 'title', 'a.md')).toBe('');
    expect(asStringArray(undefined, 'tags', 'a.md')).toEqual([]);
  });

  test('splits a comma separated string into a list', () => {
    expect(asStringArray('a, b', 'tags', 'a.md')).toEqual(['a', 'b']);
  });

  test('names the file and field when the type is wrong', () => {
    expect(() => asString(['x'], 'title', 'a.md')).toThrow(
      'a.md: "title" must be a string',
    );
    expect(() => asStringArray([1], 'tags', 'a.md')).toThrow(
      'a.md: "tags" must be a list of strings',
    );
  });
});
