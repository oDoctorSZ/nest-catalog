import { z } from "zod";

export const envSchema = z.object({
  POSTGRE_HOST: z.string(),
  POSTGRE_PORT: z.coerce.number(),
  POSTGRE_URL: z.string(),
  POSTGRE_DATABASE: z.string(),
  POSTGRE_USERNAME: z.string(),
  POSTGRE_PASSWORD: z.string(),
  POSTGRE_SYNCHRONIZE: z.coerce.boolean(),

  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),

  PORT: z.coerce.number().optional().default(3333)
})

export type Env = z.infer<typeof envSchema>