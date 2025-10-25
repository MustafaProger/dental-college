// Dental College Backend Server (ESM)
import http from 'node:http';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not set in .env');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const PORT = process.env.PORT || 3001;

// CORS
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const send = (res, code, data) => {
  res.writeHead(code, { 'Content-Type': 'application/json', ...CORS });
  res.end(JSON.stringify(data));
};

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 200, { ok: true });

  const { pathname } = new URL(req.url, 'http://localhost');
  // поддержка /api-префикса и хвостовых слэшей
  const path = (pathname.replace(/\/+$/, '') || '/').replace(/^\/api(?=\/|$)/, '');
  console.log(`${req.method} ${path}`);

  try {
    // --- health ---
    if (req.method === 'GET' && path === '/health') {
      return send(res, 200, { ok: true });
    }

    // --- debug counts ---
    if (req.method === 'GET' && path === '/_debug/counts') {
      const rows = await sql`
        SELECT 'doctors' AS table, COUNT(*)::int AS count FROM doctors
        UNION ALL SELECT 'services', COUNT(*)::int FROM services
        UNION ALL SELECT 'testimonials', COUNT(*)::int FROM testimonials
        UNION ALL SELECT 'appointments', COUNT(*)::int FROM appointments
      `;
      return send(res, 200, rows);
    }

    // --- business routes ---
    if (req.method === 'GET' && path === '/doctors') {
      const rows = await sql`SELECT * FROM doctors WHERE is_active = true`;
      return send(res, 200, rows);
    }

    if (req.method === 'GET' && path === '/services') {
      const rows = await sql`SELECT * FROM services WHERE is_active = true`;
      return send(res, 200, rows);
    }

    if (req.method === 'GET' && path === '/testimonials') {
      const rows = await sql`
        SELECT * FROM testimonials
        WHERE is_approved = true
        ORDER BY created_at DESC
        LIMIT 6
      `;
      return send(res, 200, rows);
    }

    if (path === '/appointments' && req.method === 'GET') {
      const rows = await sql`SELECT * FROM appointments ORDER BY created_at DESC`;
      return send(res, 200, rows);
    }

    if (path === '/appointments' && req.method === 'POST') {
      let body = '';
      for await (const chunk of req) body += chunk;
      const a = JSON.parse(body);

      const rows = await sql`
        INSERT INTO appointments
          (patient_name, patient_email, patient_phone, doctor_id, service_id,
           preferred_date, preferred_time, notes, status)
        VALUES
          (${a.patient_name}, ${a.patient_email}, ${a.patient_phone},
           ${a.doctor_id}, ${a.service_id},
           ${a.preferred_date}, ${a.preferred_time},
           ${a.notes}, 'pending')
        RETURNING *
      `;
      return send(res, 200, rows[0] ?? {});
    }

    return send(res, 404, { error: 'Not found', path });
  } catch (e) {
    console.error('❌ Error:', e);
    return send(res, 500, { error: e.message });
  }
});

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});