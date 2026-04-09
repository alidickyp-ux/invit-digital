import { defineConfig } from '@prisma/config';
import 'dotenv/config'; // Tambahkan baris ini untuk membaca file .env

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // Pastikan nama variabelnya persis dengan yang ada di file .env Anda
    url: process.env.DATABASE_URL,
  },
});