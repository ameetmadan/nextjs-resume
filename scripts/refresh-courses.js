#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { asString, asStringArray, parseFrontmatter } from './frontmatter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the astro-portfolio courses directory
const COURSES_SOURCE_DIR = path.join(
  process.env.HOME || '',
  'Documents/Workspace/astro-portfolio-mdx/src/content/courses',
);

// Output path for courses.json
const COURSES_OUTPUT_PATH = path.join(
  __dirname,
  '..',
  'edit-me',
  'config',
  'courses.json',
);

/**
 * Map category to topic group
 */
function getTopicForCategory(category) {
  const topicMap = {
    javascript: 'JavaScript & Web Development',
    typescript: 'TypeScript',
    frontend: 'Frontend Engineering',
    'data-structures': 'Computer Science Fundamentals',
    algorithms: 'Computer Science Fundamentals',
  };
  return topicMap[category] || 'Other';
}

/**
 * Main function to refresh courses
 */
function refreshCourses() {
  console.log('🔄 Refreshing courses data...\n');

  // Check if source directory exists
  if (!fs.existsSync(COURSES_SOURCE_DIR)) {
    console.error(
      `❌ Error: Source directory not found: ${COURSES_SOURCE_DIR}`,
    );
    process.exit(1);
  }

  // Read all .mdx files from courses directory
  const courseFiles = fs
    .readdirSync(COURSES_SOURCE_DIR)
    .filter((f) => f.endsWith('.mdx'));

  console.log(`📚 Found ${courseFiles.length} course files\n`);

  const courses = [];
  const coursesByTopic = {};

  // Parse each course file
  courseFiles.forEach((file) => {
    const filePath = path.join(COURSES_SOURCE_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const frontmatter = parseFrontmatter(fileContent);

    const course = {
      id: file.replace('.mdx', ''),
      title: asString(frontmatter.title, 'title', file),
      teacher: asString(frontmatter.teacher, 'teacher', file),
      description: asString(frontmatter.description, 'description', file),
      duration: asString(frontmatter.duration, 'duration', file),
      level: asString(frontmatter.level, 'level', file),
      category: asStringArray(frontmatter.category, 'category', file),
    };

    courses.push(course);

    // Group by topic
    const primaryCategory = course.category[0] || 'other';
    const topic = getTopicForCategory(primaryCategory);

    if (!coursesByTopic[topic]) {
      coursesByTopic[topic] = [];
    }
    coursesByTopic[topic].push(course.title);

    console.log(`  ✓ ${course.title}`);
  });

  // Sort courses alphabetically
  courses.sort((a, b) => a.title.localeCompare(b.title));

  // Create output directory if it doesn't exist
  const outputDir = path.dirname(COURSES_OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to courses.json
  const output = {
    lastUpdated: new Date().toISOString(),
    totalCourses: courses.length,
    courses,
    coursesByTopic,
  };

  fs.writeFileSync(COURSES_OUTPUT_PATH, JSON.stringify(output, null, 2));

  console.log(`\n✅ Successfully refreshed courses!`);
  console.log(`📝 Output written to: ${COURSES_OUTPUT_PATH}`);
  console.log(`📊 Total courses: ${courses.length}`);
  console.log(`📂 Topics: ${Object.keys(coursesByTopic).join(', ')}\n`);
}

// Run the script
try {
  refreshCourses();
} catch (error) {
  console.error('❌ Error refreshing courses:', error.message);
  process.exit(1);
}
