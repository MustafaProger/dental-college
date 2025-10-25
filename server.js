// Simple Node.js server to proxy Neon requests
// Run with: node server.js

const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 3001;

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const server = http.createServer((req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    res.end();
    return;
  }

  // Set CORS headers
  Object.keys(corsHeaders).forEach(key => {
    res.setHeader(key, corsHeaders[key]);
  });

  // Parse URL
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  // Route requests
  if (path === '/doctors') {
    handleDoctorsRequest(req, res);
  } else if (path === '/services') {
    handleServicesRequest(req, res);
  } else if (path === '/testimonials') {
    handleTestimonialsRequest(req, res);
  } else if (path === '/appointments') {
    handleAppointmentsRequest(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

// Neon configuration
const NEON_PROJECT_ID = 'steep-meadow-a4i1lp38';
const NEON_API_KEY = 'napi_i45xay6hzrxii1fthgb87h1pwezt1284uua0c7ncloc7da7nko006xtbxg13mwpj';

function makeNeonRequest(query, callback) {
  const postData = JSON.stringify({ query });
  
  const options = {
    hostname: 'console.neon.tech',
    port: 443,
    path: `/api/v2/projects/${NEON_PROJECT_ID}/sql`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${NEON_API_KEY}`,
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const result = JSON.parse(data);
        callback(null, result);
      } catch (error) {
        callback(error, null);
      }
    });
  });

  req.on('error', (error) => {
    callback(error, null);
  });

  req.write(postData);
  req.end();
}

function handleDoctorsRequest(req, res) {
  const query = "SELECT * FROM doctors WHERE is_active = true";
  
  makeNeonRequest(query, (error, result) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result.rows || []));
    }
  });
}

function handleServicesRequest(req, res) {
  const query = "SELECT * FROM services WHERE is_active = true";
  
  makeNeonRequest(query, (error, result) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result.rows || []));
    }
  });
}

function handleTestimonialsRequest(req, res) {
  const query = "SELECT * FROM testimonials WHERE is_approved = true ORDER BY created_at DESC LIMIT 6";
  
  makeNeonRequest(query, (error, result) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result.rows || []));
    }
  });
}

function handleAppointmentsRequest(req, res) {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const appointment = JSON.parse(body);
        const query = `INSERT INTO appointments (patient_name, patient_email, patient_phone, doctor_id, service_id, preferred_date, preferred_time, notes, status) VALUES ('${appointment.patient_name}', '${appointment.patient_email}', '${appointment.patient_phone}', ${appointment.doctor_id}, ${appointment.service_id}, '${appointment.preferred_date}', '${appointment.preferred_time}', '${appointment.notes}', 'pending') RETURNING *`;
        
        makeNeonRequest(query, (error, result) => {
          if (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result.rows[0] || {}));
          }
        });
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    const query = "SELECT * FROM appointments ORDER BY created_at DESC";
    
    makeNeonRequest(query, (error, result) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result.rows || []));
      }
    });
  }
}

server.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
  console.log(`📊 Connecting to Neon PostgreSQL`);
  console.log(`🔗 Project ID: ${NEON_PROJECT_ID}`);
});
