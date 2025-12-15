#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
 * Parse frontmatter from MDX content
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return {};
  }

  const frontmatterStr = match[1];
  const data = {};
  const lines = frontmatterStr.split('\n');
  let currentKey = null;
  let arrayValues = [];

  lines.forEach((line) => {
    // Check if this is an array item (starts with "  - ")
    if (line.match(/^\s{2}-\s/)) {
      const value = line.replace(/^\s{2}-\s/, '').trim();
      arrayValues.push(value);
    } else if (line.includes(':')) {
      // Save previous array if exists
      if (currentKey && arrayValues.length > 0) {
        data[currentKey] = arrayValues;
        arrayValues = [];
      }

      const colonIndex = line.indexOf(':');
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();

      currentKey = key;

      // If there's a value on the same line, it's not an array
      if (value) {
        data[key] = value.replace(/^['"]|['"]$/g, '');
        currentKey = null;
      }
    }
  });

  // Save last array if exists
  if (currentKey && arrayValues.length > 0) {
    data[currentKey] = arrayValues;
  }

  return data;
}

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
      title: frontmatter.title || '',
      teacher: frontmatter.teacher || '',
      description: frontmatter.description || '',
      duration: frontmatter.duration || '',
      level: frontmatter.level || '',
      category: Array.isArray(frontmatter.category)
        ? frontmatter.category
        : frontmatter.category
          ? frontmatter.category.split(',').map((c) => c.trim())
          : [],
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
