import { resumeConfig } from '@config/resume-config';
import { Path, Svg } from '@react-pdf/renderer';
import { ReactNode } from 'react';
import { PdfIconProperties } from '@src/components/pdf/icons/pdf-icon';
import { getNeutralColor } from '@src/helpers/colors';

const theme = resumeConfig.pdfTheme;
const neutralColor = getNeutralColor(12, theme);

export default function Sparkles({ size }: PdfIconProperties): ReactNode {
  return (
    <Svg style={{ height: size, width: size }} viewBox="0 0 512 512">
      <Path
        fill={neutralColor}
        d="M208.8584,144a15.85626,15.85626,0,0,1-10.46778,15.01367l-52.16015,19.2168-19.2168,52.16015a16.00075,16.00075,0,0,1-30.02734,0l-19.2168-52.16015-52.16015-19.2168a16.00075,16.00075,0,0,1,0-30.02734l52.16015-19.2168,19.2168-52.16015a16.00075,16.00075,0,0,1,30.02734,0l19.2168,52.16015,52.16015,19.2168A15.85626,15.85626,0,0,1,208.8584,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z"
      />
    </Svg>
  );
}
