new Chart(document.getElementById('awarenessChart'), {
  type: 'pie',
  data: {
    labels: ['Aware', 'Somewhat', 'Not Aware'],
    datasets: [{
      data: [8, 4, 5]
    }]
  }
});

new Chart(document.getElementById('accessChart'), {
  type: 'bar',
  data: {
    labels: ['Tutoring', 'Clubs', 'Competitions', 'Sports', 'Mentorship'],
    datasets: [{
      label: 'Access (%)',
      data: [60, 70, 75, 75, 45]
    }]
  }
});

new Chart(document.getElementById('participationChart'), {
  type: 'bar',
  data: {
    labels: ['Tutoring', 'Clubs', 'Competitions', 'Sports', 'Mentorship'],
    datasets: [{
      label: 'Participation (%)',
      data: [35, 50, 55, 60, 30]
    }]
  }
});
