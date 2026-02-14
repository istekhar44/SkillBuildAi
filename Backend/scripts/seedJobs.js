import axios from 'axios';

// Function to seed jobs
async function seedJobs() {
  try {
    const response = await axios.post('http://localhost:5011/api/job/seed', {}, {
      withCredentials: true
    });
    console.log('Jobs seeded successfully:', response.data);
  } catch (error) {
    console.error('Error seeding jobs:', error.response?.data || error.message);
  }
}

// Call the function
seedJobs();