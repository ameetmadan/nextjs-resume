import { describe, expect, test } from 'bun:test';
import { resolveOrigin } from './environment';

describe('resolveOrigin', () => {
  test('adds the default protocol to a bare host', () => {
    expect(resolveOrigin('example.net', 'https')?.origin).toBe(
      'https://example.net',
    );
  });

  test('keeps the scheme of a complete URL', () => {
    expect(resolveOrigin('https://example.net', 'https')?.origin).toBe(
      'https://example.net',
    );
    expect(resolveOrigin('http://example.net', 'https')?.origin).toBe(
      'http://example.net',
    );
  });

  test('drops any path and trailing slash', () => {
    expect(resolveOrigin('https://example.net/resume/', 'https')?.origin).toBe(
      'https://example.net',
    );
  });

  test('keeps a port on a bare host', () => {
    expect(resolveOrigin('localhost:3000', 'http')?.origin).toBe(
      'http://localhost:3000',
    );
  });

  test('returns undefined when nothing is configured', () => {
    expect(resolveOrigin(undefined, 'https')).toBeUndefined();
    expect(resolveOrigin('  ', 'https')).toBeUndefined();
  });

  test('throws on a value that cannot form a URL', () => {
    expect(() => resolveOrigin('http://', 'https')).toThrow(
      'Invalid deploy URL',
    );
  });
});
