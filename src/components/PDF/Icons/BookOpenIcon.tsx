import { Path, Svg } from '@react-pdf/renderer';
import React from 'react';
import resumeConfig from '../../../../edit-me/config/resumeConfig';
import { getNeutralColor } from '../../../helpers/colors';

const theme = resumeConfig.pdfTheme;
const neutralColor = getNeutralColor(12, theme);

export const BookOpenIcon: React.FC<PdfIconProps> = ({ size }) => {
  return (
    <Svg style={{ height: size, width: size }} viewBox="0 0 512 512">
      <Path
        fill={neutralColor}
        d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM160 389.8c-1.5-20.7-1.5-41.8 0-62.8H192v-32H162.7c5.3-20.8 13.5-41 24.7-59.6l20.8 20.8L230.6 234 209.9 213.3c18.6-11.2 38.8-19.5 59.6-24.7V224h32V188.5c20.8 5.3 41 13.5 59.6 24.7L340.3 234l22.6 22.6 20.8-20.8c11.2 18.6 19.5 38.8 24.7 59.6H384v32h31.4c1.5 20.9 1.5 42 0 62.8c-25 1.4-50.2 6.3-74.2 14.9c-24.9 8.9-49.7 21.8-73.2 38.7c-23.5-16.9-48.3-29.8-73.2-38.7c-24-8.6-49.2-13.5-74.2-14.9z"
      />
    </Svg>
  );
};
