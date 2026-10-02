import { resumeConfig } from '@config/resume-config';
import { AccentBrightColor } from '@strum/colors';

const brightColors: string[] = Object.values(AccentBrightColor);

// text colour that stays legible on top of the configured accent colour
export const contrastColor = brightColors.includes(resumeConfig.accentColor)
  ? '#000'
  : '#fff';
