const ctx1 = document.getElementById('accessChart').getContext('2d');
const accessChart = new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: ['Math Tutoring', 'Science Clubs', 'Arts Programs', 'Sports Teams', 'Mentorship'],
    datasets: [{
      label: 'Access (%)',
      data: [80, 65, 50, 70, 40],
      backgroundColor: '#4a90e2'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Student Access to Opportunities' }
    },
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  }
});

const ctx2 = document.getElementById('participationChart').getContext('2d');
const participationChart = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['Math Tutoring', 'Science Clubs', 'Arts Programs', 'Sports Teams', 'Mentorship'],
    datasets: [{
      label: 'Participation (%)',
      data: [50, 40, 30, 55, 25],
      backgroundColor: '#50e3c2'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Student Participation in Opportunities' }
    },
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  }
});
