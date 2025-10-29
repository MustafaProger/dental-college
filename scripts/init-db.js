// Minimal DB initializer: applies schema.sql then seed.sql to DATABASE_URL
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '..', '..', '.env') });

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not set in .env');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function run() {
  try {
    const schema = readFileSync(resolve(__dirname, '..', 'sql', 'schema.sql'), 'utf8');
    const seed = readFileSync(resolve(__dirname, '..', 'sql', 'seed.sql'), 'utf8');
    console.log('⏳ Applying schema.sql ...');
    await sql(schema);
    console.log('✅ Schema applied.');
    console.log('⏳ Applying seed.sql ...');
    await sql(seed);
    console.log('✅ Seed applied.');
    process.exit(0);
  } catch (e) {
    console.error('❌ Init DB failed:', e);
    process.exit(1);
  }
}

run();


