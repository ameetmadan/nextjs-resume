import { resumeConfig } from '@config/resume-config';
import { Path, Svg } from '@react-pdf/renderer';
import { ReactNode } from 'react';
import { PdfIconProperties } from '@src/components/pdf/icons/pdf-icon';
import { getNeutralColor } from '@src/helpers/colors';

const theme = resumeConfig.pdfTheme;
const neutralColor = getNeutralColor(12, theme);

export default function Hammer({ size }: PdfIconProperties): ReactNode {
  return (
    <Svg style={{ height: size, width: size }} viewBox="0 0 512 512">
      <Path
        fill={neutralColor}
        d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM356.8 206.2c-5.4 1-11.2-.7-15.4-4.9l-25.4-25.4c-7.1-7.1-10.9-16.5-10.9-26.2v-8.1l-48.5-26.5c-1-.6-1.7-1.7-1.6-2.8c0-1.2 .8-2.2 1.8-2.7l28.8-12.8c5.1-2.3 10.5-3.4 16-3.4h11c7.1 0 13.9 2.7 19.1 7.5l27.2 25.6c4.7 4.4 6.4 10.8 5.1 16.6l6.5 6.5 4.9-4.9c1.8-1.8 4.7-1.8 6.5 0l14.6 14.6c1.8 1.8 1.8 4.7 0 6.5l-53.7 53.7c-1.8 1.8-4.7 1.8-6.5 0l-14.6-14.6c-1.8-1.8-1.8-4.7 0-6.5l4.9-4.9-10.7-10.7zM178.4 303.5L281.1 200.8c.7 1 1.4 1.9 2.3 2.7l25.4 25.4c1.2 1.2 2.4 2.2 3.7 3l-102.7 102.7c-2.8 3.3-7 5.3-11.3 5.3c-8.3 0-15.1-6.7-15.1-15.1c0-4.4 1.9-8.5 5.1-11.3z"
      />
    </Svg>
  );
}
