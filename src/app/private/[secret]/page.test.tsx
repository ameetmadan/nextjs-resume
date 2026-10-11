import { allPrivateFields } from '@content';
import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import { ReactElement } from 'react';
import { render } from '@src/test-utilities';
import PublicPage from '../../page';
import PrivatePage from './page';

const KEY = 'test-private-key';
const privateLabel = allPrivateFields[0].label;

const renderPrivate = async (secret?: string) =>
  render(
    (await PrivatePage({
      params: Promise.resolve({ secret }),
      searchParams: Promise.resolve({}),
    })) as ReactElement,
  );

const notFound = { digest: 'NEXT_HTTP_ERROR_FALLBACK;404' };

describe('/private/[secret]', () => {
  const originalKey = process.env.PRIVATE_KEY;

  beforeEach(() => {
    process.env.PRIVATE_KEY = KEY;
  });

  afterEach(() => {
    if (originalKey === undefined) {
      delete process.env.PRIVATE_KEY;
    } else {
      process.env.PRIVATE_KEY = originalKey;
    }
  });

  test('renders private fields for the correct key', async () => {
    const { container } = await renderPrivate(KEY);

    expect(container.textContent).toContain(privateLabel);
  });

  test('responds 404 for an incorrect key', async () => {
    await expect(renderPrivate('wrong-key')).rejects.toMatchObject(notFound);
  });

  test('responds 404 when no key is configured, even for an empty secret', async () => {
    delete process.env.PRIVATE_KEY;

    await expect(renderPrivate(KEY)).rejects.toMatchObject(notFound);
    await expect(renderPrivate('')).rejects.toMatchObject(notFound);
    await expect(renderPrivate()).rejects.toMatchObject(notFound);
  });

  test('keeps the public page free of private fields', () => {
    const { container } = render(<PublicPage />);

    expect(container.textContent).not.toContain(privateLabel);
  });
});
