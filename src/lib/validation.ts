import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Valid email is required"),
  projectType: z.string().min(1, "Project type is required"),
  budget: z.string().optional(),
  message: z.string().min(10, "Tell us a little more (10+ characters)"),
  whiteLabel: z.boolean().default(false),
});

export type Inquiry = z.infer<typeof inquirySchema>;
