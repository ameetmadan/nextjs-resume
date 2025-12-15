/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
  Image,
} from '@react-pdf/renderer';
import { HtmlProps } from 'node_modules/react-pdf-html/dist/types/Html';
import React from 'react';
import Html from 'react-pdf-html';
import { htmlRenderers } from 'src/components/PDF/htmlRenderers';
import resumeConfig from '../../../edit-me/config/resumeConfig';
import { Theme } from '../../../edit-me/types/Config';
import { contrastColor } from '../../helpers/colorContrast';
import { getAccentColor, getNeutralColor } from '../../helpers/colors';
import { ContentData, CourseData } from '../../helpers/contentLoader';
import { BuildingColumns } from './Icons/BuildingColumns';
import { CircleBriefcase } from './Icons/CircleBriefcase';
import { CircleCheck } from './Icons/CircleCheck';
import { CircleGraduationCap } from './Icons/CircleGraduationCap';
import { CircleIdCard } from './Icons/CircleIdCard';
import { CircleUser } from './Icons/CircleUser';
import { Star } from './Icons/Star';
import { BookOpenIcon } from './Icons/BookOpenIcon';
import { Hammer } from './Icons/Hammer';

const theme = resumeConfig.pdfTheme;
const albertSrc = 'https://fonts.gstatic.com/s/albertsans/v1';
const jetbrainsSrc = 'https://fonts.gstatic.com/s/jetbrainsmono/v18';

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

Font.register({
  family: 'JetBrains Mono',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 500,
      src: `${jetbrainsSrc}/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.ttf`,
    },
  ],
});

const hyphenationCallback = (word: string) => {
  // don't hyphenate
  return [word];
};

Font.registerHyphenationCallback(hyphenationCallback);

Font.registerEmojiSource({
  format: 'png',
  url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
});

const fontSizes = {
  xl: 20,
  l: 18,
  m: 14,
  s: 13,
  xs: 12,
  xxs: 10,
};

const spacers = {
  1: '6px',
  2: '8px',
  3: '10px',
  4: '12px',
  5: '14px',
  6: '16px',
};

const styles = StyleSheet.create({
  page: {
    alignItems: 'stretch',
    backgroundColor: getNeutralColor(1, theme),
    color: getNeutralColor(12, theme),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    fontFamily: 'Albert Sans',
    fontSize: fontSizes.xxs,
    justifyContent: 'flex-start',
    lineHeight: 1.3,
  },
  sidebar: {
    alignSelf: 'stretch',
    backgroundColor: getNeutralColor(3, theme),
    display: 'flex',
    color: getNeutralColor(12, theme),
    flexBasis: '30%',
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 1,
  },
  sidebarContent: { padding: spacers[4] },
  header: {
    backgroundColor:
      theme === Theme.Dark
        ? getNeutralColor(2, theme)
        : getAccentColor(9, theme),
    color: contrastColor,
    padding: `${spacers[6]} ${spacers[4]}`,
    textAlign: 'center',
  },
  headerTitle: { fontSize: fontSizes.xl, fontWeight: 700 },
  headerSubtitle: { fontSize: fontSizes.m, fontWeight: 700 },
  main: {
    alignSelf: 'stretch',
    display: 'flex',
    flexBasis: '70%',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    padding: spacers[4],
  },
  section: { marginBottom: spacers[3] },
  sectionHeading: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: fontSizes.m,
    fontWeight: 700,
    gap: spacers[1],
  },
  sectionHeadingMarginBottom: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: fontSizes.m,
    fontWeight: 700,
    gap: spacers[1],
    marginBottom: '5px',
  },
  sectionHeadingNonHTML: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: fontSizes.m,
    fontWeight: 700,
    gap: spacers[1],
    marginBottom: spacers[1],
  },
  sectionHeadingIcon: {
    height: fontSizes.m,
    marginRight: spacers[1],
    width: fontSizes.m,
  },
  sectionHeadingStars: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  sectionParagraph: {
    fontWeight: 400,
    margin: 0,
  },
  itemHeading: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: fontSizes.s,
    fontWeight: 700,
    gap: spacers[1],
    marginBottom: spacers[1],
    marginTop: spacers[2],
  },
  itemSubheadingRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacers[1],
    marginBottom: spacers[1],
  },
  itemSubheadingSubRow: {
    display: 'flex',
    flex: '0 0 100%',
  },
  itemSubheading: {
    fontSize: fontSizes.xxs,
  },
  itemSubheadingItalic: {
    fontSize: fontSizes.xxs,
    fontStyle: 'italic',
  },
  professionalTitle: {
    backgroundColor: getNeutralColor(12, theme),
    borderRadius: '3px',
    color: getNeutralColor(1, theme),
    fontWeight: 700,
    paddingHorizontal: spacers[1],
  },
  bold: { fontWeight: 700 },
  flexColumn: { display: 'flex', flexDirection: 'column' },
  flexRow: { alignItems: 'center', display: 'flex', flexDirection: 'row' },
  flexRowMarginBottom: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '5px',
  },
  flexRowAlignStart: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
  },
  a: {
    color: getAccentColor(11, theme),
    textDecoration: 'underline',
  },
  list: {
    marginTop: spacers[2],
  },
  code: {
    backgroundColor: getNeutralColor(4, theme),
    borderRadius: '3px',
    fontFamily: 'JetBrains Mono',
    fontWeight: 500,
    paddingHorizontal: spacers[2],
  },
});

const htmlProps: Omit<HtmlProps, 'children'> = {
  renderers: htmlRenderers,
  style: { fontSize: fontSizes.xxs },
  stylesheet: {
    a: styles.a,
    p: styles.sectionParagraph,
    ul: styles.list,
    ol: styles.list,
    code: styles.code,
  },
};

interface PDFDynamicProps {
  content: ContentData;
}

const PDFDynamic: React.FC<PDFDynamicProps> = ({ content }) => {
  const {
    personal,
    allSkills,
    allProfessionalExperiences,
    allAchievements,
    allCourses,
    allProjects,
    preferredStack,
  } = content;
  const fullName = `${personal.givenName} ${personal.familyName}`;
  const year = new Date().getFullYear();

  return (
    // @ts-ignore
    <Document author={fullName} title={`Resumé for ${fullName}, ${year}`}>
      {/* @ts-ignore */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.sidebar}>
          <View style={styles.header}>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                marginBottom: 5,
                objectFit: 'cover',
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              src="public/portrait.png"
            />
            <Text style={styles.headerTitle}>{fullName}</Text>
            <Text style={styles.headerSubtitle}>{personal.title}</Text>
          </View>
          <View style={styles.sidebarContent}>
            <View style={styles.section}>
              <View style={styles.sectionHeadingNonHTML}>
                <CircleUser size={fontSizes.m} />
                <Text>About Me</Text>
              </View>
              <Html {...htmlProps}>{personal.body.html}</Html>
            </View>
            <View style={styles.section}>
              <View style={styles.sectionHeadingNonHTML}>
                <CircleUser size={fontSizes.m} />
                <Text>Hobbies and Interests</Text>
              </View>
              <Html {...htmlProps}>{personal.hobbies ?? ''}</Html>
            </View>
            <View style={styles.section}>
              <View style={styles.sectionHeadingNonHTML}>
                <CircleIdCard size={fontSizes.m} />
                <Text>Contact Information</Text>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.bold}>Location:</Text>
                <Text>&nbsp;{personal.location}</Text>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.bold}>Phone number:</Text>
                <Text>&nbsp;{personal.phoneNumber}</Text>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.bold}>Email:</Text>
                <Text>&nbsp;{personal.email}</Text>
              </View>
              {personal.birthday && (
                <View style={styles.flexRow}>
                  <Text style={styles.bold}>Birthday:</Text>
                  <Text>&nbsp;{personal.birthday}</Text>
                </View>
              )}
              {personal.languages && (
                <View style={styles.flexRow}>
                  <Text style={styles.bold}>Languages:</Text>
                  <Text>&nbsp;{personal.languages}</Text>
                </View>
              )}
              {personal.nationality && (
                <View style={styles.flexRow}>
                  <Text style={styles.bold}>Nationality:</Text>
                  <Text>&nbsp;{personal.nationality}</Text>
                </View>
              )}
              {personal.civilStatus && (
                <View style={styles.flexRow}>
                  <Text style={styles.bold}>Civil Status:</Text>
                  <Text>&nbsp;{personal.civilStatus}</Text>
                </View>
              )}
            </View>
            {/*<View style={styles.section}>
              <View style={styles.sectionHeading}>
                <CircleCheck size={fontSizes.m} />
                <Text>Technical Skills</Text>
              </View>
              {allSkills.map((skill, skillIndex) => (
                <View key={skill._id}>
                  <View style={styles.itemHeading}>
                    <View style={styles.sectionHeadingStars}>
                      {Array.from(Array(allSkills.length - skillIndex)).map(
                        (star, starIndex) => (
                          <Star key={starIndex} size={fontSizes.xxs} />
                        ),
                      )}
                    </View>
                    <Text style={styles.bold}>{skill.title}</Text>
                  </View>
                  <Html {...htmlProps}>{skill.body.html}</Html>
                </View>
              ))} 
            </View>*/}
            {preferredStack && preferredStack.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeadingNonHTML}>
                  <CircleCheck size={fontSizes.m} />
                  <Text>Preferred Stack</Text>
                </View>
                {preferredStack.map((item, index) => (
                  <View key={index} style={styles.flexRowMarginBottom}>
                    <Text style={styles.bold}>{item.name}</Text>
                    <Text>&nbsp;• {item.category}</Text>
                  </View>
                ))}
              </View>
            )}
            {/* <View style={styles.section}>
                </View>
                {preferredStack.map((item, index) => (
                  <View key={index} style={styles.flexRowMarginBottom}>
                    <Text style={styles.bold}>{item.name}</Text>
                    <Text>&nbsp;• {item.category}</Text>
                  </View>
                ))}
              </View>
            )}
            {/* <View style={styles.section}>
              <View style={styles.sectionHeadingMarginBottom}>
                <CircleCheck size={fontSizes.m} />
                <Text>Soft Skills</Text>
              </View>
              {allSoftSkills.map((skill) => (
                <View key={skill._id}>
                  <Html {...htmlProps}>{skill.body.html}</Html>
                </View>
              ))}
            </View> */}
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.section}>
            <View style={styles.sectionHeading}>
              <CircleBriefcase size={fontSizes.m} />
              <Text>Professional Experience</Text>
            </View>
            {allProfessionalExperiences.map((professionalExperience) => (
              <View key={professionalExperience._id}>
                <View style={styles.itemHeading}>
                  <Text style={styles.professionalTitle}>
                    {professionalExperience.title}
                  </Text>
                  <Text>&nbsp;at {professionalExperience.organization}</Text>
                </View>
                <View style={styles.itemSubheadingRow}>
                  <Text style={styles.itemSubheading}>
                    {professionalExperience.startDate}-
                    {professionalExperience.endDate
                      ? professionalExperience.endDate
                      : 'Current'}
                  </Text>
                </View>
                <Html {...htmlProps}>{professionalExperience.body.html}</Html>
              </View>
            ))}
          </View>
        </View>
      </Page>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.sidebar}>
          <View style={styles.header}>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                marginBottom: 5,
                objectFit: 'cover',
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              src="public/portrait.png"
            />
            <Text style={styles.headerTitle}>{fullName}</Text>
            <Text style={styles.headerSubtitle}>{personal.title}</Text>
          </View>
          <View style={styles.sidebarContent}>
            <View style={styles.section}>
              <View style={styles.sectionHeadingNonHTML}>
                <CircleUser size={fontSizes.m} />
                <Text>About Me</Text>
              </View>
              <Html {...htmlProps}>{personal.body.html}</Html>
            </View>
            <View style={styles.section}>
              <View style={styles.sectionHeadingNonHTML}>
                <CircleUser size={fontSizes.m} />
                <Text>Hobbies and Interests</Text>
              </View>
              <Html {...htmlProps}>{personal.hobbies ?? ''}</Html>
            </View>
            <View style={styles.section}>
              <View style={styles.sectionHeadingNonHTML}>
                <CircleIdCard size={fontSizes.m} />
                <Text>Contact Information</Text>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.bold}>Location:</Text>
                <Text>&nbsp;{personal.location}</Text>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.bold}>Phone number:</Text>
                <Text>&nbsp;{personal.phoneNumber}</Text>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.bold}>Email:</Text>
                <Text>&nbsp;{personal.email}</Text>
              </View>
              {personal.birthday && (
                <View style={styles.flexRow}>
                  <Text style={styles.bold}>Birthday:</Text>
                  <Text>&nbsp;{personal.birthday}</Text>
                </View>
              )}
              {personal.languages && (
                <View style={styles.flexRow}>
                  <Text style={styles.bold}>Languages:</Text>
                  <Text>&nbsp;{personal.languages}</Text>
                </View>
              )}
              {personal.nationality && (
                <View style={styles.flexRow}>
                  <Text style={styles.bold}>Nationality:</Text>
                  <Text>&nbsp;{personal.nationality}</Text>
                </View>
              )}
              {personal.civilStatus && (
                <View style={styles.flexRow}>
                  <Text style={styles.bold}>Civil Status:</Text>
                  <Text>&nbsp;{personal.civilStatus}</Text>
                </View>
              )}
            </View>
            {/* <View style={styles.section}>
              <View style={styles.sectionHeading}>
                <CircleCheck size={fontSizes.m} />
                <Text>Technical Skills</Text>
              </View>
              {/* {allSkills.map((skill, skillIndex) => (
                <View key={skill._id}>
                  <View style={styles.itemHeading}>
                    <View style={styles.sectionHeadingStars}>
                      {Array.from(Array(allSkills.length - skillIndex)).map(
                        (star, starIndex) => (
                          <Star key={starIndex} size={fontSizes.xxs} />
                        ),
                      )}
                    </View>
                    <Text style={styles.bold}>{skill.title}</Text>
                  </View>
                  <Html {...htmlProps}>{skill.body.html}</Html>
                </View>
              ))} 
            </View> */}
            {preferredStack && preferredStack.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeadingNonHTML}>
                  <CircleCheck size={fontSizes.m} />
                  <Text>Preferred Stack</Text>
                </View>
                {preferredStack.map((item, index) => (
                  <View key={index} style={styles.flexRowMarginBottom}>
                    <Text style={styles.bold}>{item.name}</Text>
                    <Text>&nbsp;• {item.category}</Text>
                  </View>
                ))}
              </View>
            )}
            {/* <View style={styles.section}>
              <View style={styles.sectionHeadingMarginBottom}>
                <CircleCheck size={fontSizes.m} />
                <Text>Soft Skills</Text>
              </View>
              {allSoftSkills.map((skill) => (
                <View key={skill._id}>
                  <Html {...htmlProps}>{skill.body.html}</Html>
                </View>
              ))}
            </View> */}
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.section}>
            <View style={styles.sectionHeading}>
              <CircleGraduationCap size={fontSizes.m} />
              <Text>Education</Text>
            </View>
            {allAchievements.map((achievement) => (
              <View key={achievement._id}>
                <View style={styles.itemHeading}>
                  <Text style={styles.bold}>{achievement.achievement}</Text>
                </View>
                <View style={styles.itemSubheadingRow}>
                  <BuildingColumns size={fontSizes.xxs} />
                  <Text style={styles.itemSubheading}>
                    {achievement.organization}
                  </Text>
                </View>
                <Html {...htmlProps}>{achievement.body.html}</Html>
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeading}>
              {/* <BookOpenIcon size={fontSizes.m} /> */}
              <Text>Professional Development & Courses</Text>
            </View>
            {allCourses.map((course) => (
              <Text key={course._id}>{course.title}</Text>
            ))}
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeading}>
              {/* <Hammer size={fontSizes.m} /> */}
              <Text>Passion projects</Text>
            </View>
            {allProjects.map((project) => (
              <View key={project._id} style={{ marginBottom: spacers[2] }}>
                <View style={styles.itemHeading}>
                  <Text style={styles.bold}>{project.title}</Text>
                </View>
                <Text style={styles.sectionParagraph}>
                  {project.description}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDynamic;
