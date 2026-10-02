import { personal } from '@content';
import { describe, expect, test } from 'bun:test';
import { fullName } from '@src/helpers/utilities';
import { render, screen } from '@src/test-utilities';
import Header from './header';

describe('<Header />', () => {
  test('Renders headings and PDF buttons', () => {
    render(<Header />);

    expect(
      screen.getByRole('heading', { level: 1, name: fullName }),
    ).toBeDefined();
    expect(
      screen.getByRole('heading', { level: 2, name: personal.title }),
    ).toBeDefined();
    expect(
      screen.getByRole('link', { name: /download fullstack cv/i }),
    ).toBeDefined();
    expect(
      screen.getByRole('link', { name: /download frontend cv/i }),
    ).toBeDefined();
  });

  test('Snapshot', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment).toMatchSnapshot();
  });
});
