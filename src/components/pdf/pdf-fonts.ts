import { Font } from '@react-pdf/renderer';
import path from 'node:path';

// Vendored in public/fonts (Latin subsets) rather than reusing src/fonts:
// the full-family files there have different vertical metrics, which makes
// the PDF header text overlap. Shared by pdf-dynamic.tsx and letter.tsx so
// the same family isn't registered twice.
const fontPath = (file: string): string =>
  path.join(process.cwd(), 'public/fonts', file);

export const registerAlbertSans = (): void => {
  Font.register({
    family: 'Albert Sans',
    fonts: [
      {
        fontStyle: 'normal',
        fontWeight: 400,
        src: fontPath('albert-sans/AlbertSans-Regular.ttf'),
      },
      {
        fontStyle: 'italic',
        fontWeight: 400,
        src: fontPath('albert-sans/AlbertSans-Italic.ttf'),
      },
      {
        fontStyle: 'normal',
        fontWeight: 700,
        src: fontPath('albert-sans/AlbertSans-Bold.ttf'),
      },
      {
        fontStyle: 'italic',
        fontWeight: 700,
        src: fontPath('albert-sans/AlbertSans-BoldItalic.ttf'),
      },
    ],
  });
};

export const registerJetBrainsMono = (): void => {
  Font.register({
    family: 'JetBrains Mono',
    fonts: [
      {
        fontStyle: 'normal',
        fontWeight: 500,
        src: fontPath('jetbrains-mono/JetBrainsMono-Medium.ttf'),
      },
    ],
  });
};
