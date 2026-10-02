import { describe, expect, test } from 'bun:test';
import { render, screen } from '@src/test-utilities';
import PDFDownloadButton from './pdf-download-button';

describe('<PDFDownloadButton />', () => {
  test('Renders a link with the given text and href', () => {
    render(<PDFDownloadButton link="/api/pdf/frontend" text="Download CV" />);

    const link = screen.getByRole('link', { name: /download cv/i });
    expect(link.getAttribute('href')).toBe('/api/pdf/frontend');
  });
});
