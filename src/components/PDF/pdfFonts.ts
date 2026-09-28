import { Font } from '@react-pdf/renderer';

// Vendored locally (public/fonts) instead of fetched from fonts.gstatic.com
// at render time, so PDF generation doesn't depend on an external network
// call. Shared by PDFDynamic.tsx and Letter.tsx to avoid registering the
// same family twice.
const albertSansDir = 'public/fonts/albert-sans';

export const registerAlbertSans = () => {
  Font.register({
    family: 'Albert Sans',
    fonts: [
      {
        fontStyle: 'normal',
        fontWeight: 400,
        src: `${albertSansDir}/AlbertSans-Regular.ttf`,
      },
      {
        fontStyle: 'italic',
        fontWeight: 400,
        src: `${albertSansDir}/AlbertSans-Italic.ttf`,
      },
      {
        fontStyle: 'normal',
        fontWeight: 700,
        src: `${albertSansDir}/AlbertSans-Bold.ttf`,
      },
      {
        fontStyle: 'italic',
        fontWeight: 700,
        src: `${albertSansDir}/AlbertSans-BoldItalic.ttf`,
      },
    ],
  });
};

export const registerJetBrainsMono = () => {
  Font.register({
    family: 'JetBrains Mono',
    fonts: [
      {
        fontStyle: 'normal',
        fontWeight: 500,
        src: 'public/fonts/jetbrains-mono/JetBrainsMono-Medium.ttf',
      },
    ],
  });
};
