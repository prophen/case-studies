import { z } from 'zod';

export const httpUrl = z.string().url().refine(value => ['https:', 'http:'].includes(new URL(value).protocol), 'Use an http or https URL');
export const caseStudySchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase, hyphen-separated slug'),
  project: z.string().trim().min(1),
  title: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  draft: z.boolean(),
  featured: z.boolean().default(false),
  order: z.number().int().nonnegative().default(0),
  role: z.string().trim().min(1).optional(),
  stack: z.array(z.string().trim().min(1)).optional(),
  timeline: z.string().trim().min(1).optional(),
  projectStatus: z.string().trim().min(1).optional(),
  scope: z.string().trim().min(1).optional(),
  cover: z.string().optional(),
  coverAlt: z.string().trim().min(1).optional(),
  coverCaption: z.string().trim().min(1).optional(),
  coverWidth: z.number().int().positive().optional(),
  coverHeight: z.number().int().positive().optional(),
  evidenceReviewed: z.boolean().default(false),
  links: z.object({ live: httpUrl.optional(), source: httpUrl.optional(), demo: httpUrl.optional(), writeup: httpUrl.optional() }).strict().optional(),
}).strict().superRefine((value, ctx) => {
  if (value.cover && (!value.coverAlt || !value.coverWidth || !value.coverHeight)) ctx.addIssue({ code: 'custom', message: 'A cover requires coverAlt, coverWidth, and coverHeight' });
  if (!value.draft && (!value.evidenceReviewed || !value.cover)) ctx.addIssue({ code: 'custom', message: 'Publishing requires a real cover and evidenceReviewed: true after owner review' });
});
export type StudyMetadata = z.infer<typeof caseStudySchema>;
export const componentNames = ['Callout', 'Decision', 'WorkflowSteps', 'Step', 'ProductImage', 'ImageGallery', 'ArchitectureDiagram', 'Verification', 'Evidence', 'ResultsOrLearnings', 'DemoEmbed'] as const;
