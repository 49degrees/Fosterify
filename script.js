// Awareness Chart
new Chart(document.getElementById('awarenessChart'), {
  type: 'pie',
  data: {
    labels: ['Aware', 'Somewhat', 'Not Aware'],
    datasets: [{
      data: [8, 4, 5],
      backgroundColor: ['#4a90e2', '#f5a623', '#d0021b']
    }]
  }
});

// Access Chart
new Chart(document.getElementById('accessChart'), {
  type: 'bar',
  data: {
    labels: ['Tutoring', 'Clubs', 'Competitions', 'Sports', 'Mentorship'],
    datasets: [{
      label: 'Access (%)',
      data: [60, 70, 75, 75, 45],
      backgroundColor: '#4a90e2'
    }]
  },
  options: {
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  }
});

// Participation Chart
new Chart(document.getElementById('participationChart'), {
  type: 'bar',
  data: {
    labels: ['Tutoring', 'Clubs', 'Competitions', 'Sports', 'Mentorship'],
    datasets: [{
      label: 'Participation (%)',
      data: [35, 50, 55, 60, 30],
      backgroundColor: '#50e3c2'
    }]
  },
  options: {
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  }
});
