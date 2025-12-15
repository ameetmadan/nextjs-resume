#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the astro-portfolio projects directory
const PROJECTS_SOURCE_DIR = path.join(
  process.env.HOME || '',
  'Documents/Workspace/astro-portfolio-mdx/src/content/projects',
);

// Output path for projects.json
const PROJECTS_OUTPUT_PATH = path.join(
  __dirname,
  '..',
  'edit-me',
  'config',
  'projects.json',
);

/**
 * Parse frontmatter from MD content
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
        // Convert boolean strings to actual booleans
        if (value === 'true') {
          data[key] = true;
        } else if (value === 'false') {
          data[key] = false;
        } else {
          data[key] = value.replace(/^['"]|['"]$/g, '');
        }
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
 * Main function to refresh projects
 */
function refreshProjects() {
  console.log('🔄 Refreshing projects data...\n');

  // Check if source directory exists
  if (!fs.existsSync(PROJECTS_SOURCE_DIR)) {
    console.error(
      `❌ Error: Source directory not found: ${PROJECTS_SOURCE_DIR}`,
    );
    process.exit(1);
  }

  // Read all .md files from projects directory
  const projectFiles = fs
    .readdirSync(PROJECTS_SOURCE_DIR)
    .filter((f) => f.endsWith('.md'));

  console.log(`📁 Found ${projectFiles.length} project files\n`);

  const projects = [];
  const projectsByTag = {};

  // Parse each project file
  projectFiles.forEach((file) => {
    const filePath = path.join(PROJECTS_SOURCE_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const frontmatter = parseFrontmatter(fileContent);

    // Skip hidden projects
    if (frontmatter.hidden === true) {
      console.log(`  ⊘ ${frontmatter.title || file} (hidden)`);
      return;
    }

    const project = {
      id: file.replace('.md', ''),
      title: frontmatter.title || '',
      description: frontmatter.description || '',
      liveLink: frontmatter.liveLink || '',
      tags: Array.isArray(frontmatter.tags)
        ? frontmatter.tags
        : frontmatter.tags
          ? frontmatter.tags.split(',').map((t) => t.trim())
          : [],
    };

    projects.push(project);

    // Group by tags
    project.tags.forEach((tag) => {
      if (!projectsByTag[tag]) {
        projectsByTag[tag] = [];
      }
      projectsByTag[tag].push(project.title);
    });

    console.log(`  ✓ ${project.title}`);
  });

  // Sort projects alphabetically
  projects.sort((a, b) => a.title.localeCompare(b.title));

  // Create output directory if it doesn't exist
  const outputDir = path.dirname(PROJECTS_OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to projects.json
  const output = {
    lastUpdated: new Date().toISOString(),
    totalProjects: projects.length,
    projects,
    projectsByTag,
  };

  fs.writeFileSync(PROJECTS_OUTPUT_PATH, JSON.stringify(output, null, 2));

  console.log(`\n✅ Successfully refreshed projects!`);
  console.log(`📝 Output written to: ${PROJECTS_OUTPUT_PATH}`);
  console.log(`📊 Total projects: ${projects.length}`);
  console.log(`🏷️  Tags: ${Object.keys(projectsByTag).join(', ')}\n`);
}

// Run the script
try {
  refreshProjects();
} catch (error) {
  console.error('❌ Error refreshing projects:', error.message);
  process.exit(1);
}
