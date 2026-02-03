'use client';

import axios from 'axios';

export const SetSession = async (idToken: string): Promise<any> => {
  try {
    return axios.post(
        '/api/auth/login', 
        { idToken },
        { 
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }, 
        }
    );
  } catch (error) {
    console.error('Error setting session cookie:', error);
    throw error;
  }
};

export const ClearSession = async (): Promise<any> => {
  try {
    return axios.post('/api/auth/logout', {}, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error clearing session cookie:', error);
    throw error;
  }
};