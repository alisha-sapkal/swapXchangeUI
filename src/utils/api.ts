const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchUserById = async (userId: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_URL}/auth/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const fetchUserFromMongoDB = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/public/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user from MongoDB:', error);
    throw error;
  }
}; 