import { personal } from '@content';
import { describe, expect, test } from 'bun:test';
import { mockData } from '@src/test-factories';
import { render, screen } from '@src/test-utilities';
import ContactInformation from './contact-info';

const mockPrivateFields = [
  mockData.privateFields.email,
  mockData.privateFields.phone,
];

describe('<ContactInformation />', () => {
  test('Renders contact information heading', () => {
    render(<ContactInformation />);

    const heading = screen.getByRole('heading', {
      level: 3,
      name: /contact information/i,
    });

    expect(heading).toBeDefined();
  });

  test('Renders location from personal data', () => {
    render(<ContactInformation />);

    expect(screen.getByText(/location:/i)).toBeDefined();
    expect(screen.getByText(personal.location)).toBeDefined();
  });

  test('Renders phone number as a tel: link when provided', () => {
    render(<ContactInformation />);

    if (personal.phoneNumber) {
      const phoneLink = screen.getByRole('link', {
        name: personal.phoneNumber,
      });
      expect(phoneLink.getAttribute('href')).toBe(
        `tel:${personal.phoneNumber.replaceAll(/\s+/g, '')}`,
      );
    }
  });

  test('Renders email as a mailto: link when provided', () => {
    render(<ContactInformation />);

    if (personal.email) {
      const emailLink = screen.getByRole('link', { name: personal.email });
      expect(emailLink.getAttribute('href')).toBe(`mailto:${personal.email}`);
    }
  });

  test('Renders LinkedIn link when URL is provided', () => {
    render(<ContactInformation />);

    if (personal.linkedInUrl) {
      const linkedInLink = screen.getByRole('link', { name: /linkedin/i });
      expect(linkedInLink).toBeDefined();
      expect(linkedInLink.getAttribute('href')).toBe(personal.linkedInUrl);
    }
  });

  test('Renders GitHub link when URL is provided', () => {
    render(<ContactInformation />);

    if (personal.githubUrl) {
      const githubLink = screen.getByRole('link', { name: /github/i });
      expect(githubLink).toBeDefined();
      expect(githubLink.getAttribute('href')).toBe(personal.githubUrl);
    }
  });

  test('Renders private information when provided', () => {
    render(<ContactInformation privateInformation={mockPrivateFields} />);

    expect(screen.getByText('test@example.com')).toBeDefined();
    expect(screen.getByText('(555) 123-4567')).toBeDefined();
  });

  test('Does not render private information when not provided', () => {
    render(<ContactInformation />);

    expect(screen.queryByText('test@example.com')).toBeNull();
    expect(screen.queryByText('(555) 123-4567')).toBeNull();
  });

  test('Private fields render with dangerouslySetInnerHTML', () => {
    const { container } = render(
      <ContactInformation privateInformation={mockPrivateFields} />,
    );

    const listItems = container.querySelectorAll('li');
    const hasPrivateFieldContent = [...listItems].some(
      (li) =>
        li.textContent?.includes('test@example.com') ||
        li.textContent?.includes('(555) 123-4567'),
    );

    expect(hasPrivateFieldContent).toBe(true);
  });

  test('Social media links have proper styling', () => {
    const { container } = render(<ContactInformation />);

    // phone and email are plain links, only the social links carry an icon
    const socialLinks = container.querySelectorAll('a[href^="https://"]');
    for (const link of socialLinks) {
      expect(link.className).toContain('inline-flex');
      expect(link.className).toContain('items-center');
      expect(link.className).toContain('gap-2');
    }
  });

  test('Snapshot without private information', () => {
    const { asFragment } = render(<ContactInformation />);
    expect(asFragment).toMatchSnapshot();
  });

  test('Snapshot with private information', () => {
    const { asFragment } = render(
      <ContactInformation privateInformation={mockPrivateFields} />,
    );
    expect(asFragment).toMatchSnapshot();
  });
});
