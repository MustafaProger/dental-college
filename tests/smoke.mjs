const BASE = process.env.BASE_URL || 'http://localhost:3001';

async function run() {
  const r1 = await fetch(`${BASE}/health`).then(r => r.json());
  console.log('health', r1);
  const doctors = await fetch(`${BASE}/doctors`).then(r => r.json());
  console.log('doctors', doctors.length);
  const services = await fetch(`${BASE}/services`).then(r => r.json());
  console.log('services', services.length);
  const testimonials = await fetch(`${BASE}/testimonials?limit=3`).then(r => r.json());
  console.log('testimonials', testimonials.length);
  const appts = await fetch(`${BASE}/appointments`).then(r => r.json());
  console.log('appointments', appts.length);
}

run().catch(e => { console.error(e); process.exit(1); });




