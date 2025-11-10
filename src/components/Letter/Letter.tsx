import { letter, personal } from '@content';
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { HtmlProps } from 'node_modules/react-pdf-html/dist/types/Html';
import React from 'react';
import Html from 'react-pdf-html';
import { htmlRenderers } from 'src/components/PDF/htmlRenderers';
import resumeConfig from '../../../edit-me/config/resumeConfig';
import { Theme } from '../../../edit-me/types/Config';
import { contrastColor } from '../../helpers/colorContrast';
import { getAccentColor, getNeutralColor } from '../../helpers/colors';
import { fullName } from '../../helpers/utils';

const theme = resumeConfig.pdfTheme;
const albertSrc = 'https://fonts.gstatic.com/s/albertsans/v1';

Font.register({
  family: 'Albert Sans',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 400,
      src: `${albertSrc}/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHq5P_rI32TxAj1g.ttf`,
    },
    {
      fontStyle: 'italic',
      fontWeight: 400,
      src: `${albertSrc}/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9AX74fybRUz1r5t.ttf`,
    },
    {
      fontStyle: 'normal',
      fontWeight: 700,
      src: `${albertSrc}/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHTJT_rI32TxAj1g.ttf`,
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: `${albertSrc}/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9Dw6IfybRUz1r5t.ttf`,
    },
  ],
});

const hyphenationCallback = (word: string) => {
  // don't hyphenate
  return [word];
};

Font.registerHyphenationCallback(hyphenationCallback);

const fontSizes = {
  xl: 20,
  l: 16,
  m: 14,
  s: 12,
  xs: 11,
  xxs: 10,
};

const spacers = {
  1: '6px',
  2: '8px',
  3: '10px',
  4: '12px',
  5: '14px',
  6: '16px',
  7: '20px',
  8: '24px',
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: getNeutralColor(1, theme),
    color: getNeutralColor(12, theme),
    fontFamily: 'Albert Sans',
    fontSize: fontSizes.s,
    lineHeight: 1.5,
    padding: '40px 50px',
  },
  header: {
    backgroundColor:
      theme === Theme.Dark
        ? getNeutralColor(2, theme)
        : getAccentColor(9, theme),
    color: contrastColor,
    padding: spacers[6],
    marginBottom: spacers[7],
    textAlign: 'center',
  },
  headerName: {
    fontSize: fontSizes.xl,
    fontWeight: 700,
    marginBottom: spacers[2],
  },
  headerTitle: {
    fontSize: fontSizes.m,
    fontWeight: 400,
  },
  contactInfo: {
    marginTop: spacers[3],
    fontSize: fontSizes.xs,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacers[2],
    flexWrap: 'wrap',
  },
  contactItem: {
    marginHorizontal: spacers[2],
  },
  recipientAddress: {
    marginBottom: spacers[6],
  },
  bold: {
    fontWeight: 700,
  },
  date: {
    marginBottom: spacers[6],
    fontSize: fontSizes.s,
  },
  subject: {
    fontWeight: 700,
    fontSize: fontSizes.m,
    marginBottom: spacers[6],
  },
  paragraph: {
    marginBottom: spacers[5],
    textAlign: 'justify',
  },
  signature: {
    marginTop: spacers[8],
  },
  signatureName: {
    fontWeight: 700,
  },
  sectionParagraph: {
    fontWeight: 400,
    margin: 0,
  },
  a: {
    color: getAccentColor(11, theme),
    textDecoration: 'underline',
  },
});

const htmlProps: Omit<HtmlProps, 'children'> = {
  renderers: htmlRenderers,
  style: { fontSize: fontSizes.s, textAlign: 'justify' },
  stylesheet: {
    a: styles.a,
    p: styles.sectionParagraph,
  },
};

const Letter: React.FC = () => {
  const currentDate =
    letter.date ||
    new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  // Split the letter body into paragraphs
  const bodyParagraphs = letter.body.html
    .split('</p>')
    .filter((p) => p.trim())
    .map((p) => p.replace(/<p>/g, '').trim());

  return (
    // @ts-ignore
    <Document
      author={fullName}
      title={`Cover Letter - ${letter.positionTitle} at ${letter.companyName}`}
    >
      {/* @ts-ignore */}
      <Page size="LETTER" style={styles.page}>
        {/* Header with sender information */}
        <View style={styles.header}>
          <Text style={styles.headerName}>{fullName}</Text>
          <Text style={styles.headerTitle}>{personal.title}</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>{personal.location}</Text>
            <Text style={styles.contactItem}>{personal.phoneNumber}</Text>
            <Text style={styles.contactItem}>{personal.email}</Text>
          </View>
        </View>

        {/* Date */}
        <View style={styles.date}>
          <Text>{currentDate}</Text>
        </View>

        {/* Recipient address */}
        <View style={styles.recipientAddress}>
          <Text style={styles.bold}>{letter.recipientName}</Text>
          <Text>{letter.recipientTitle}</Text>
          <Text style={styles.bold}>{letter.companyName}</Text>
          <Text>{letter.companyAddress}</Text>
          <Text>
            {letter.companyPostalCode} {letter.companyCity}
          </Text>
          <Text>{letter.companyCountry}</Text>
        </View>

        {/* Subject line */}
        <View style={styles.subject}>
          <Text>
            Re: {letter.subject}
            {letter.positionReference && ` (${letter.positionReference})`}
          </Text>
        </View>

        {/* Salutation */}
        <View style={styles.paragraph}>
          <Text>Dear {letter.recipientName},</Text>
        </View>

        {/* Body paragraphs using HTML renderer */}
        {bodyParagraphs.map((paragraph, index) => (
          <View key={index} style={styles.paragraph}>
            <Html {...htmlProps}>{`<p>${paragraph}</p>`}</Html>
          </View>
        ))}

        {/* Signature */}
        <View style={styles.signature}>
          <Text>Sincerely,</Text>
          <Text style={styles.signatureName}>{fullName}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Letter;
