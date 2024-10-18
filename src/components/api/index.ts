import fs from 'fs';
import path from 'path';

export const fetchMockData = (selectedDate: string) => {
  const filePath = path.join(__dirname, `mock/${selectedDate}.json`);
  
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading mock data:', error);
    return null;
  }
};
