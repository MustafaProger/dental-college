import React, { useState, useEffect } from 'react';
import { neonClient } from '../lib/neon';

interface DatabaseStatus {
  isConnected: boolean;
  error?: string;
  dataCounts?: {
    doctors: number;
    services: number;
    testimonials: number;
    appointments: number;
  };
}

export const DatabaseStatus: React.FC = () => {
  const [status, setStatus] = useState<DatabaseStatus>({ isConnected: false });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkDatabaseConnection();
  }, []);

  const checkDatabaseConnection = async () => {
    setIsLoading(true);
    
    try {
      if (!neonClient) {
        setStatus({
          isConnected: false,
          error: 'Neon client not configured. Check your environment variables.'
        });
        return;
      }

      // Test connection by querying each table
      const [doctorsResult, servicesResult, testimonialsResult, appointmentsResult] = await Promise.all([
        neonClient.select('doctors'),
        neonClient.select('services'),
        neonClient.select('testimonials'),
        neonClient.select('appointments')
      ]);

      setStatus({
        isConnected: true,
        dataCounts: {
          doctors: doctorsResult.data.length,
          services: servicesResult.data.length,
          testimonials: testimonialsResult.data.length,
          appointments: appointmentsResult.data.length
        }
      });

    } catch (error) {
      setStatus({
        isConnected: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-blue-800">Checking database connection...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`border rounded-lg p-4 ${
      status.isConnected 
        ? 'bg-green-50 border-green-200' 
        : 'bg-red-50 border-red-200'
    }`}>
      <div className="flex items-center mb-2">
        <div className={`w-3 h-3 rounded-full mr-3 ${
          status.isConnected ? 'bg-green-500' : 'bg-red-500'
        }`}></div>
        <h3 className={`font-semibold ${
          status.isConnected ? 'text-green-800' : 'text-red-800'
        }`}>
          {status.isConnected ? 'Database Connected' : 'Database Connection Failed'}
        </h3>
      </div>

      {status.isConnected && status.dataCounts ? (
        <div className="text-green-700">
          <p className="mb-2">✅ Successfully connected to Neon PostgreSQL</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>👨‍⚕️ Doctors: {status.dataCounts.doctors}</div>
            <div>🦷 Services: {status.dataCounts.services}</div>
            <div>⭐ Testimonials: {status.dataCounts.testimonials}</div>
            <div>📅 Appointments: {status.dataCounts.appointments}</div>
          </div>
        </div>
      ) : (
        <div className="text-red-700">
          <p className="mb-2">❌ Database connection failed</p>
          <p className="text-sm">{status.error}</p>
          <div className="mt-3 text-sm">
            <p className="font-medium">Possible solutions:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Check your environment variables in .env file</li>
              <li>Verify your Neon credentials</li>
              <li>Ensure your database schema is created</li>
              <li>Check Neon service status</li>
            </ul>
          </div>
        </div>
      )}

      <button
        onClick={checkDatabaseConnection}
        className="mt-3 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
      >
        Retry Connection
      </button>
    </div>
  );
};
