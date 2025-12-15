import fs from 'fs';
import path from 'path';

export type ContentVersion = 'frontend' | 'fullstack';

interface PersonalData {
  givenName: string;
  familyName: string;
  title: string;
  location: string;
  phoneNumber?: string;
  email?: string;
  birthday?: string;
  hobbies?: string;
  languages?: string;
  nationality?: string;
  civilStatus?: string;
  body: { html: string };
}

interface SkillData {
  _id: string;
  title: string;
  body: { html: string };
}

interface SoftSkillData {
  _id: string;
  title: string;
  body: { html: string };
}

interface ProfessionalExperienceData {
  _id: string;
  title: string;
  organization: string;
  startDate: string;
  endDate?: string;
  body: { html: string };
}

interface AchievementData {
  _id: string;
  achievement: string;
  organization: string;
  completionYear: number;
  body: { html: string };
}

export interface CourseData {
  _id: string;
  title: string;
  teacher: string;
  description: string;
  duration: string;
  level: string;
  category: string[];
}

interface CoursesByTopic {
  [topic: string]: string[];
}

interface ProjectData {
  _id: string;
  title: string;
  description: string;
  liveLink: string;
  tags: string[];
}

interface ProjectsByTag {
  [tag: string]: string[];
}

interface PreferredStackItem {
  name: string;
  category: string;
}

export interface ContentData {
  personal: PersonalData;
  allSkills: SkillData[];
  allSoftSkills: SoftSkillData[];
  allProfessionalExperiences: ProfessionalExperienceData[];
  allAchievements: AchievementData[];
  allCourses: CourseData[];
  coursesByTopic: CoursesByTopic;
  allProjects: ProjectData[];
  projectsByTag: ProjectsByTag;
  preferredStack: PreferredStackItem[];
}

function getContentDir(version: ContentVersion): string {
  const baseDir = process.cwd();
  return version === 'frontend'
    ? path.join(baseDir, 'edit-me', 'content')
    : path.join(baseDir, 'edit-me-fullstack', 'content');
}

function parseFrontmatter(content: string): {
  data: Record<string, any>;
  body: string;
} {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: content };
  }

  const [, frontmatterStr, body] = match;
  const data: Record<string, any> = {};

  frontmatterStr.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      data[key] = value.replace(/^['"]|['"]$/g, '');
    }
  });

  return { data, body };
}

function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .split('\n\n')
    .map((para) => {
      if (para.startsWith('- ')) {
        const items = para
          .split('\n')
          .filter((line) => line.startsWith('- '))
          .map((line) => `<li>${line.slice(2)}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${para}</p>`;
    })
    .join('');
}

export async function loadContent(
  version: ContentVersion,
): Promise<ContentData> {
  const contentDir = getContentDir(version);

  // Load personal info
  const personalPath = path.join(contentDir, 'personal.md');
  const personalFile = fs.readFileSync(personalPath, 'utf-8');
  const personalParsed = parseFrontmatter(personalFile);
  const personal: PersonalData = {
    givenName: personalParsed.data.givenName,
    familyName: personalParsed.data.familyName,
    title: personalParsed.data.title,
    location: personalParsed.data.location,
    phoneNumber: personalParsed.data.phoneNumber,
    email: personalParsed.data.email,
    birthday: personalParsed.data.birthday,
    hobbies: personalParsed.data.hobbies,
    languages: personalParsed.data.languages,
    nationality: personalParsed.data.nationality,
    civilStatus: personalParsed.data.civilStatus,
    body: { html: markdownToHtml(personalParsed.body) },
  };

  // Load skills
  const skillsDir = path.join(contentDir, 'skills');
  const skillFiles = fs.readdirSync(skillsDir).filter((f) => f.endsWith('.md'));
  const allSkills: SkillData[] = skillFiles
    .map((file) => {
      const filePath = path.join(skillsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = parseFrontmatter(fileContent);
      return {
        _id: file,
        title: parsed.data.title,
        body: { html: markdownToHtml(parsed.body) },
      };
    })
    .sort((a, b) => a._id.localeCompare(b._id));

  // Load soft skills
  const softSkillsDir = path.join(contentDir, 'softSkills');
  const softSkillFiles = fs
    .readdirSync(softSkillsDir)
    .filter((f) => f.endsWith('.md'));
  const allSoftSkills: SoftSkillData[] = softSkillFiles
    .map((file) => {
      const filePath = path.join(softSkillsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = parseFrontmatter(fileContent);
      return {
        _id: file,
        title: parsed.data.title,
        body: { html: markdownToHtml(parsed.body) },
      };
    })
    .sort((a, b) => a._id.localeCompare(b._id));

  // Load professional experiences
  const profExpDir = path.join(contentDir, 'professionalExperiences');
  const profExpFiles = fs
    .readdirSync(profExpDir)
    .filter((f) => f.endsWith('.md'));
  const allProfessionalExperiences: ProfessionalExperienceData[] = profExpFiles
    .map((file) => {
      const filePath = path.join(profExpDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = parseFrontmatter(fileContent);
      return {
        _id: file,
        title: parsed.data.title,
        organization: parsed.data.organization,
        startDate: parsed.data.startDate,
        endDate: parsed.data.endDate,
        body: { html: markdownToHtml(parsed.body) },
      };
    })
    .sort((a, b) => a._id.localeCompare(b._id));

  // Load achievements
  const achievementsDir = path.join(contentDir, 'achievements');
  const achievementFiles = fs
    .readdirSync(achievementsDir)
    .filter((f) => f.endsWith('.md'));
  const allAchievements: AchievementData[] = achievementFiles
    .map((file) => {
      const filePath = path.join(achievementsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = parseFrontmatter(fileContent);
      return {
        _id: file,
        achievement: parsed.data.achievement,
        organization: parsed.data.organization,
        completionYear: parseInt(parsed.data.completionYear, 10),
        body: { html: markdownToHtml(parsed.body) },
      };
    })
    .sort((a, b) => b.completionYear - a.completionYear);

  // Load courses from courses.json
  const coursesJsonPath = path.join(
    process.cwd(),
    'edit-me',
    'config',
    'courses.json',
  );
  let allCourses: CourseData[] = [];
  let coursesByTopic: CoursesByTopic = {};

  if (fs.existsSync(coursesJsonPath)) {
    const coursesData = JSON.parse(fs.readFileSync(coursesJsonPath, 'utf-8'));
    coursesByTopic = coursesData.coursesByTopic || {};
    allCourses =
      coursesData.courses?.map((course: any) => ({
        _id: course.id,
        title: course.title,
        teacher: course.teacher,
        description: course.description,
        duration: course.duration,
        level: course.level,
        category: course.category,
      })) || [];
  }

  // Load projects from projects.json
  const projectsJsonPath = path.join(
    process.cwd(),
    'edit-me',
    'config',
    'projects.json',
  );
  let allProjects: ProjectData[] = [];
  let projectsByTag: ProjectsByTag = {};

  if (fs.existsSync(projectsJsonPath)) {
    const projectsData = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf-8'));
    projectsByTag = projectsData.projectsByTag || {};
    allProjects =
      projectsData.projects?.map((project: any) => ({
        _id: project.id,
        title: project.title,
        description: project.description,
        liveLink: project.liveLink,
        tags: project.tags,
      })) || [];
  }

  // Load preferred stack from preferredStack.json
  const preferredStackJsonPath =
    version === 'frontend'
      ? path.join(process.cwd(), 'edit-me', 'config', 'preferredStack.json')
      : path.join(
          process.cwd(),
          'edit-me-fullstack',
          'config',
          'preferredStack.json',
        );
  let preferredStack: PreferredStackItem[] = [];

  if (fs.existsSync(preferredStackJsonPath)) {
    const preferredStackData = JSON.parse(
      fs.readFileSync(preferredStackJsonPath, 'utf-8'),
    );
    preferredStack = preferredStackData.preferredStack || [];
  }

  return {
    personal,
    allSkills,
    allSoftSkills,
    allProfessionalExperiences,
    allAchievements,
    allCourses,
    coursesByTopic,
    allProjects,
    projectsByTag,
    preferredStack,
  };
}
