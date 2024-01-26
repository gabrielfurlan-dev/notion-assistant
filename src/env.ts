//* Libraries imports
import z from "zod";

const envSchema = z.object({
  OPENAI_API_KEY: z.string(),
  NOTION_API_KEY: z.string(),
});

export type EnvType = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);