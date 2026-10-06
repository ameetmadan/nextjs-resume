import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer2/source-files';

export const Personal = defineDocumentType(() => ({
  name: 'Personal',
  filePathPattern: 'personal.md',
  isSingleton: true,
  fields: {
    givenName: {
      type: 'string',
      description: 'Your first name or given name',
      required: true,
    },
    familyName: {
      type: 'string',
      description: 'Your last name or family name',
      required: true,
    },
    title: {
      type: 'string',
      description: 'Your current job title or a short description of your goal',
      required: true,
    },
    location: {
      type: 'string',
      description:
        'Your general location of residence, not your personal address',
      required: true,
    },
    githubUrl: {
      type: 'string',
      description: 'URL for your GitHub profile',
    },
    linkedInUrl: {
      type: 'string',
      description: 'URL for your LinkedIn profile',
    },
    phoneNumber: {
      type: 'string',
      description: 'Your phone number',
      required: false,
    },
    birthday: {
      type: 'string',
      description: 'Your date of birth',
      required: false,
    },
    address: {
      type: 'string',
      description: 'Your address',
      required: false,
    },
    email: {
      type: 'string',
      description: 'Your email address',
      required: false,
    },
    hobbies: {
      type: 'string',
      description: 'Your hobbies',
      required: false,
    },
    languages: {
      type: 'string',
      description: 'Languages you speak',
      required: false,
    },
    nationality: {
      type: 'string',
      description: 'Your nationality',
      required: false,
    },
    civilStatus: {
      type: 'string',
      description: 'Your civil status',
      required: false,
    },
  },
}));

export const Skill = defineDocumentType(() => ({
  name: 'Skill',
  filePathPattern: 'skills/*.md',
  fields: {
    title: {
      type: 'string',
      description: 'A name for the category of skills',
      required: true,
    },
  },
}));

export const SoftSkill = defineDocumentType(() => ({
  name: 'SoftSkill',
  filePathPattern: 'soft-skills/*.md',
  fields: {
    title: {
      type: 'string',
      description: 'A name for the category of soft skills',
      required: true,
    },
  },
}));

export const ProfessionalTitle = defineNestedType(() => ({
  name: 'ProfessionalTitle',
  fields: {
    title: {
      type: 'string',
      description: 'A title at this organization',
      required: true,
    },
    startDate: {
      type: 'date',
      description: 'A parsable date for when you started the role',
      required: true,
    },
    endDate: {
      type: 'date',
      description:
        'A parsable date for when you ended the role, or empty if it is your current role',
      required: false,
    },
    description: {
      type: 'string',
      description:
        'A description of the work you did under this role, or your accomplishments that led to a promotion',
      required: false,
    },
  },
}));

export const ProfessionalExperience = defineDocumentType(() => ({
  name: 'ProfessionalExperience',
  filePathPattern: 'professional-experiences/*.md',
  fields: {
    organization: {
      type: 'string',
      description: 'The name of the company or organization you worked with',
      required: true,
    },
    titles: {
      type: 'list',
      of: ProfessionalTitle,
      required: true,
    },
  },
}));

export const Achievement = defineDocumentType(() => ({
  name: 'Achievement',
  filePathPattern: 'achievements/*.md',
  fields: {
    achievement: {
      type: 'string',
      description:
        'The name of the degree or certification of your achievement',
      required: true,
    },
    organization: {
      type: 'string',
      description:
        'The name of the school, organization, or program you earned your achievement from',
      required: true,
    },
    completionYear: {
      type: 'number',
      description: 'The year you earned your achievement',
      required: true,
    },
  },
}));

export const PrivateField = defineDocumentType(() => ({
  name: 'PrivateField',
  filePathPattern: 'private-fields/*.md',
  fields: {
    label: {
      type: 'string',
      description: 'A label to describe the private field',
      required: true,
    },
  },
}));

export const Salary = defineDocumentType(() => ({
  name: 'Salary',
  filePathPattern: 'salary.md',
  isSingleton: true,
  fields: {
    currentSalary: {
      type: 'string',
      description: 'Your current salary (only visible in private mode)',
    },
    desiredSalary: {
      type: 'string',
      description: 'Your desired salary (only visible in private mode)',
    },
  },
}));

export const Letter = defineDocumentType(() => ({
  name: 'Letter',
  filePathPattern: 'letter.md',
  isSingleton: true,
  fields: {
    companyName: {
      type: 'string',
      description: 'The name of the company you are applying to',
      required: true,
    },
    recipientName: {
      type: 'string',
      description: 'The name of the person you are writing to',
      required: true,
    },
    recipientTitle: {
      type: 'string',
      description: 'The job title of the recipient',
      required: true,
    },
    companyAddress: {
      type: 'string',
      description: 'Street address of the company',
      required: true,
    },
    companyCity: {
      type: 'string',
      description: 'City of the company',
      required: true,
    },
    companyPostalCode: {
      type: 'string',
      description: 'Postal code of the company',
      required: true,
    },
    companyCountry: {
      type: 'string',
      description: 'Country of the company',
      required: true,
    },
    positionTitle: {
      type: 'string',
      description: 'The position you are applying for',
      required: true,
    },
    positionReference: {
      type: 'string',
      description: 'Job reference number (optional)',
      required: false,
    },
    subject: {
      type: 'string',
      description: 'Subject line of the letter',
      required: true,
    },
    date: {
      type: 'string',
      description: 'Date of the letter (leave empty to use current date)',
      required: false,
    },
  },
}));

export default makeSource({
  contentDirPath: 'edit-me/content',
  documentTypes: [
    Personal,
    Skill,
    SoftSkill,
    ProfessionalExperience,
    Achievement,
    PrivateField,
    Salary,
    Letter,
  ],
});
