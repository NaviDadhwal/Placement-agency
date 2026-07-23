import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGODB_URI: z
    .string()
    .default(
      'mongodb+srv://Navi:cuA3BhRZqqthxkwA@makemyaim.hgaexfh.mongodb.net/makemyaim?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true'
    ),
  JWT_ACCESS_SECRET: z
    .string()
    .default('ea7c7456b2866f774654a15dc4fb10d8e0c29917e3a65b533221839c4e9560a7'),
  JWT_REFRESH_SECRET: z
    .string()
    .default('c8b1175297d11df6eb48e986b230982e51d5985d055436823d9b50f1c208f5a2'),
  FRONTEND_URL: z.string().default('https://placement-agency-alpha.vercel.app'),
  NOTIFICATION_EMAIL: z.string().email().optional().default('recruitment@nextstepplacements.com'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  WHATSAPP_WEBHOOK_URL: z.string().optional(),
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
});

const parseEnv = () => {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.warn('⚠️ Invalid environment variables, using Vercel defaults:', result.error.format());
    return {
      PORT: process.env.PORT || '5000',
      NODE_ENV: (process.env.NODE_ENV as any) || 'production',
      MONGODB_URI:
        process.env.MONGODB_URI ||
        'mongodb+srv://Navi:cuA3BhRZqqthxkwA@makemyaim.hgaexfh.mongodb.net/makemyaim?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true',
      JWT_ACCESS_SECRET:
        process.env.JWT_ACCESS_SECRET ||
        'ea7c7456b2866f774654a15dc4fb10d8e0c29917e3a65b533221839c4e9560a7',
      JWT_REFRESH_SECRET:
        process.env.JWT_REFRESH_SECRET ||
        'c8b1175297d11df6eb48e986b230982e51d5985d055436823d9b50f1c208f5a2',
      FRONTEND_URL: process.env.FRONTEND_URL || 'https://placement-agency-alpha.vercel.app',
      NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL || 'recruitment@nextstepplacements.com',
    } as any;
  }
  return result.data;
};

export const env = parseEnv();
