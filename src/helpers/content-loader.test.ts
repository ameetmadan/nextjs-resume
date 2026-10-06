import { describe, expect, test } from 'bun:test';
import { loadContent } from './content-loader';

const monthYear = /^[A-Z][a-z]+ \d{4}$/;

describe('loadContent', () => {
  test('Loads personal information', async () => {
    const { personal } = await loadContent();

    expect(personal.givenName).toBeTruthy();
    expect(personal.familyName).toBeTruthy();
    expect(personal.title).toBeTruthy();
  });

  test('Parses nested YAML titles and formats their dates', async () => {
    const { allProfessionalExperiences } = await loadContent();

    expect(allProfessionalExperiences.length).toBeGreaterThan(0);
    for (const experience of allProfessionalExperiences) {
      expect(experience.organization).toBeTruthy();
      expect(experience.titles.length).toBeGreaterThan(0);
      for (const title of experience.titles) {
        expect(title.title).toBeTruthy();
        expect(title.startDate).toMatch(monthYear);
        // a missing end date means the role is current
        if (title.endDate !== undefined) {
          expect(title.endDate).toMatch(monthYear);
        }
      }
    }
  });

  test('Sorts achievements by completion year, newest first', async () => {
    const { allAchievements } = await loadContent();
    const years = allAchievements.map(
      (achievement) => achievement.completionYear,
    );

    expect(years.every((year) => Number.isInteger(year))).toBe(true);
    expect(years).toEqual(years.toSorted((a, b) => b - a));
  });

  test('Renders markdown bodies to HTML', async () => {
    const { allProfessionalExperiences } = await loadContent();

    for (const experience of allProfessionalExperiences) {
      expect(experience.body.html).toContain('<');
    }
  });
});
