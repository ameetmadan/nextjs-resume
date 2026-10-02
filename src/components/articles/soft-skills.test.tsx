import { allSoftSkills } from '@content';
import { describe, expect, test } from 'bun:test';
import { render, screen } from '@src/test-utilities';
import SoftSkills from './soft-skills';

describe('<SoftSkills />', () => {
  test('Renders soft skills section heading', () => {
    render(<SoftSkills />);

    expect(
      screen.getByRole('heading', { level: 3, name: /soft skills/i }),
    ).toBeDefined();
  });

  test('Renders one block per soft skill from content', () => {
    const { container } = render(<SoftSkills />);

    const grid = container.querySelector('article > div');
    expect(allSoftSkills.length).toBeGreaterThan(0);
    expect(grid?.children.length).toBe(allSoftSkills.length);
  });
});
