import {
  Achievement,
  Personal,
  allAchievements as contentAchievements,
  allProfessionalExperiences as contentProfessionalExperiences,
  personal as contentPersonal,
} from '@content';
import fs from 'node:fs';
import path from 'node:path';

interface ProfessionalTitleData {
  title: string;
  startDate: string;
  endDate?: string;
}

interface ProfessionalExperienceData {
  _id: string;
  organization: string;
  titles: ProfessionalTitleData[];
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
  personal: Personal;
  allProfessionalExperiences: ProfessionalExperienceData[];
  allAchievements: Achievement[];
  allCourses: CourseData[];
  coursesByTopic: CoursesByTopic;
  allProjects: ProjectData[];
  projectsByTag: ProjectsByTag;
  preferredStack: PreferredStackItem[];
}

// frontmatter dates are written as `2024/07`; render them like the web page
// does, but with the full month name (e.g. "July 2024")
function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export async function loadContent(): Promise<ContentData> {
  // The website and the PDF share the Contentlayer documents, so Markdown
  // (links, nested and numbered lists) and CRLF frontmatter render alike.
  const allProfessionalExperiences = contentProfessionalExperiences
    .map(({ _id, organization, titles, body }) => ({
      _id,
      organization,
      titles: titles.map((title) => ({
        title: title.title,
        startDate: formatDate(title.startDate),
        endDate: title.endDate ? formatDate(title.endDate) : undefined,
      })),
      body,
    }))
    .toSorted((a, b) => a._id.localeCompare(b._id));

  const allAchievements = contentAchievements.toSorted(
    (a, b) => b.completionYear - a.completionYear,
  );

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
    const coursesData = JSON.parse(fs.readFileSync(coursesJsonPath, 'utf8'));
    coursesByTopic = coursesData.coursesByTopic || {};
    allCourses =
      coursesData.courses?.map(
        (course: Omit<CourseData, '_id'> & { id: string }) => ({
          _id: course.id,
          title: course.title,
          teacher: course.teacher,
          description: course.description,
          duration: course.duration,
          level: course.level,
          category: course.category,
        }),
      ) || [];
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
    const projectsData = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf8'));
    projectsByTag = projectsData.projectsByTag || {};
    allProjects =
      projectsData.projects?.map(
        (project: Omit<ProjectData, '_id'> & { id: string }) => ({
          _id: project.id,
          title: project.title,
          description: project.description,
          liveLink: project.liveLink,
          tags: project.tags,
        }),
      ) || [];
  }

  // Load preferred stack from preferredStack.json
  const preferredStackJsonPath = path.join(
    process.cwd(),
    'edit-me',
    'config',
    'preferredStack.json',
  );
  let preferredStack: PreferredStackItem[] = [];

  if (fs.existsSync(preferredStackJsonPath)) {
    const preferredStackData = JSON.parse(
      fs.readFileSync(preferredStackJsonPath, 'utf8'),
    );
    preferredStack = preferredStackData.preferredStack || [];
  }

  return {
    personal: contentPersonal,
    allProfessionalExperiences,
    allAchievements,
    allCourses,
    coursesByTopic,
    allProjects,
    projectsByTag,
    preferredStack,
  };
}
