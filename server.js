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
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';

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

  const { pathname, searchParams } = new URL(req.url, 'http://localhost');
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

    // --- helper: admin auth ---
    const isAdmin = () => {
      const auth = req.headers['authorization'] || '';
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
      return ADMIN_TOKEN && token === ADMIN_TOKEN;
    };

    // --- business routes ---
    if (req.method === 'GET' && path === '/doctors') {
      const rows = await sql`SELECT * FROM doctors WHERE is_active = true`;
      return send(res, 200, rows);
    }

    if (req.method === 'POST' && path === '/doctors') {
      if (!isAdmin()) return send(res, 403, { error: 'Forbidden' });
      let body = '';
      for await (const chunk of req) body += chunk;
      let d = {};
      try { d = JSON.parse(body || '{}'); } catch { return send(res, 400, { error: 'Invalid JSON' }); }
      const rows = await sql`
        INSERT INTO doctors (full_name, title, specialty_id, bio, education, experience_years, image_url, email, phone, is_active)
        VALUES (${d.full_name}, ${d.title}, ${d.specialty_id ?? null}, ${d.bio}, ${d.education}, ${d.experience_years}, ${d.image_url}, ${d.email}, ${d.phone}, ${d.is_active ?? true})
        RETURNING *`;
      return send(res, 200, rows[0] ?? {});
    }

    if (req.method === 'PUT' && path.startsWith('/doctors/')) {
      if (!isAdmin()) return send(res, 403, { error: 'Forbidden' });
      const id = path.split('/')[2];
      let body = '';
      for await (const chunk of req) body += chunk;
      let d = {};
      try { d = JSON.parse(body || '{}'); } catch { return send(res, 400, { error: 'Invalid JSON' }); }
      const rows = await sql`
        UPDATE doctors SET
          full_name = COALESCE(${d.full_name}, full_name),
          title = COALESCE(${d.title}, title),
          specialty_id = COALESCE(${d.specialty_id}, specialty_id),
          bio = COALESCE(${d.bio}, bio),
          education = COALESCE(${d.education}, education),
          experience_years = COALESCE(${d.experience_years}, experience_years),
          image_url = COALESCE(${d.image_url}, image_url),
          email = COALESCE(${d.email}, email),
          phone = COALESCE(${d.phone}, phone),
          is_active = COALESCE(${d.is_active}, is_active),
          updated_at = now()
        WHERE id = ${id}
        RETURNING *`;
      return send(res, 200, rows[0] ?? {});
    }

    if (req.method === 'DELETE' && path.startsWith('/doctors/')) {
      if (!isAdmin()) return send(res, 403, { error: 'Forbidden' });
      const id = path.split('/')[2];
      await sql`DELETE FROM doctors WHERE id = ${id}`;
      return send(res, 200, { ok: true });
    }

    if (req.method === 'GET' && path === '/services') {
      const rows = await sql`SELECT * FROM services WHERE is_active = true`;
      return send(res, 200, rows);
    }

    if (req.method === 'POST' && path === '/services') {
      if (!isAdmin()) return send(res, 403, { error: 'Forbidden' });
      let body = '';
      for await (const chunk of req) body += chunk;
      let s = {};
      try { s = JSON.parse(body || '{}'); } catch { return send(res, 400, { error: 'Invalid JSON' }); }
      const rows = await sql`
        INSERT INTO services (name, description, duration_minutes, price_range, specialty_id, is_active)
        VALUES (${s.name}, ${s.description}, ${s.duration_minutes}, ${s.price_range}, ${s.specialty_id ?? null}, ${s.is_active ?? true})
        RETURNING *`;
      return send(res, 200, rows[0] ?? {});
    }

    if (req.method === 'PUT' && path.startsWith('/services/')) {
      if (!isAdmin()) return send(res, 403, { error: 'Forbidden' });
      const id = path.split('/')[2];
      let body = '';
      for await (const chunk of req) body += chunk;
      let s = {};
      try { s = JSON.parse(body || '{}'); } catch { return send(res, 400, { error: 'Invalid JSON' }); }
      const rows = await sql`
        UPDATE services SET
          name = COALESCE(${s.name}, name),
          description = COALESCE(${s.description}, description),
          duration_minutes = COALESCE(${s.duration_minutes}, duration_minutes),
          price_range = COALESCE(${s.price_range}, price_range),
          specialty_id = COALESCE(${s.specialty_id}, specialty_id),
          is_active = COALESCE(${s.is_active}, is_active)
        WHERE id = ${id}
        RETURNING *`;
      return send(res, 200, rows[0] ?? {});
    }

    if (req.method === 'DELETE' && path.startsWith('/services/')) {
      if (!isAdmin()) return send(res, 403, { error: 'Forbidden' });
      const id = path.split('/')[2];
      await sql`DELETE FROM services WHERE id = ${id}`;
      return send(res, 200, { ok: true });
    }

    if (req.method === 'GET' && path === '/testimonials') {
      const limitParam = parseInt(searchParams.get('limit') || '6', 10);
      const safeLimit = Number.isFinite(limitParam) && limitParam > 0 && limitParam <= 100 ? limitParam : 6;
      const rows = await sql`
        SELECT * FROM testimonials
        WHERE is_approved = true
        ORDER BY created_at DESC
        LIMIT ${safeLimit}
      `;
      return send(res, 200, rows);
    }

    if (req.method === 'PUT' && path.startsWith('/testimonials/approve/')) {
      if (!isAdmin()) return send(res, 403, { error: 'Forbidden' });
      const id = path.split('/')[3];
      const rows = await sql`UPDATE testimonials SET is_approved = true WHERE id = ${id} RETURNING *`;
      return send(res, 200, rows[0] ?? {});
    }

    if (path === '/appointments' && req.method === 'GET') {
      const rows = await sql`SELECT * FROM appointments ORDER BY created_at DESC`;
      return send(res, 200, rows);
    }

    if (path === '/appointments' && req.method === 'POST') {
      let body = '';
      for await (const chunk of req) body += chunk;

      let a;
      try {
        a = JSON.parse(body || '{}');
      } catch {
        return send(res, 400, { error: 'Invalid JSON' });
      }

      // Basic validation
      const errors = [];
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRe = /^[0-9+()\-\s]{7,}$/;
      if (!a.patient_name || String(a.patient_name).trim().length < 2) errors.push('patient_name');
      if (!a.patient_email || !emailRe.test(String(a.patient_email))) errors.push('patient_email');
      if (!a.patient_phone || !phoneRe.test(String(a.patient_phone))) errors.push('patient_phone');
      if (!a.preferred_date) errors.push('preferred_date');
      if (!a.preferred_time) errors.push('preferred_time');
      // doctor_id/service_id can be null for "Any"
      const doctorId = a.doctor_id === '' ? null : a.doctor_id ?? null;
      const serviceId = a.service_id === '' ? null : a.service_id ?? null;

      if (errors.length) {
        return send(res, 400, { error: 'Validation failed', fields: errors });
      }

      const rows = await sql`
        INSERT INTO appointments
          (patient_name, patient_email, patient_phone, doctor_id, service_id,
           preferred_date, preferred_time, notes, status)
        VALUES
          (${a.patient_name}, ${a.patient_email}, ${a.patient_phone},
           ${doctorId}, ${serviceId},
           ${a.preferred_date}, ${a.preferred_time},
           ${a.notes ?? ''}, ${a.status ?? 'pending'})
        RETURNING *
      `;
      return send(res, 200, rows[0] ?? {});
    }

    if (path.startsWith('/appointments/') && req.method === 'PUT') {
      if (!isAdmin()) return send(res, 403, { error: 'Forbidden' });
      const id = path.split('/')[2];
      let body = '';
      for await (const chunk of req) body += chunk;
      let a = {};
      try { a = JSON.parse(body || '{}'); } catch { return send(res, 400, { error: 'Invalid JSON' }); }
      const rows = await sql`
        UPDATE appointments SET
          status = COALESCE(${a.status}, status),
          notes = COALESCE(${a.notes}, notes)
        WHERE id = ${id}
        RETURNING *`;
      return send(res, 200, rows[0] ?? {});
    }

    if (path.startsWith('/appointments/') && req.method === 'DELETE') {
      if (!isAdmin()) return send(res, 403, { error: 'Forbidden' });
      const id = path.split('/')[2];
      await sql`DELETE FROM appointments WHERE id = ${id}`;
      return send(res, 200, { ok: true });
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