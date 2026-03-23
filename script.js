const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQXnFoGrns0ZYmUWSBRnYDmX7uLDvKYZwefu2Lr6DMHB4-qP6vxErMZ8hMPoxNVbLL-msRC0RzV-KYP/pub?output=csv";

Papa.parse(SHEET_CSV_URL, {
  download: true,
  header: true,
  complete: function(results) {
    const data = results.data;

    let awareCount = { Yes: 0, Somewhat: 0, No: 0 };
    let total = 0;

    const accessCounts = {
      Tutoring: 0,
      Clubs: 0,
      Competitions: 0,
      Sports: 0,
      Mentorship: 0
    };

    const participationCounts = {
      Tutoring: 0,
      Clubs: 0,
      Competitions: 0,
      Sports: 0,
      Mentorship: 0
    };

    data.forEach(row => {
      if (!row["Are you aware of most academic/extracurricular opportunities at your school?"]) return;
      total++;

      // Awareness
      const aware = row["Are you aware of most academic/extracurricular opportunities at your school?"];
      awareCount[aware] = (awareCount[aware] || 0) + 1;

      // Access
      if (row["Do you have access to the following? [Tutoring]"] === "Yes") accessCounts.Tutoring++;
      if (row["Do you have access to the following? [Clubs]"] === "Yes") accessCounts.Clubs++;
      if (row["Do you have access to the following? [Competitions]"] === "Yes") accessCounts.Competitions++;
      if (row["Do you have access to the following? [Sports Teams]"] === "Yes") accessCounts.Sports++;
      if (row["Do you have access to the following? [Mentorship]"] === "Yes") accessCounts.Mentorship++;

      // Participation
      const participates = row["Which of these do you actually participate in?"];
      if (!participates) return;
      if (participates.includes("Tutoring")) participationCounts.Tutoring++;
      if (participates.includes("Clubs")) participationCounts.Clubs++;
      if (participates.includes("Competitions")) participationCounts.Competitions++;
      if (participates.includes("Sports")) participationCounts.Sports++;
      if (participates.includes("Mentorship")) participationCounts.Mentorship++;
    });

    // Convert counts to percentages
    const toPercent = count => total ? Math.round((count / total) * 100) : 0;

    // Charts
    new Chart(document.getElementById("awarenessChart"), {
      type: "pie",
      data: {
        labels: ["Yes", "Somewhat", "No"],
        datasets: [{
          label: "Awareness",
          data: [awareCount.Yes, awareCount.Somewhat, awareCount.No],
          backgroundColor: ["#4a90e2","#50e3c2","#f5a623"]
        }]
      }
    });

    new Chart(document.getElementById("accessChart"), {
      type: "bar",
      data: {
        labels: ["Tutoring", "Clubs", "Competitions", "Sports", "Mentorship"],
        datasets: [{
          label: "Access (%)",
          data: [
            toPercent(accessCounts.Tutoring),
            toPercent(accessCounts.Clubs),
            toPercent(accessCounts.Competitions),
            toPercent(accessCounts.Sports),
            toPercent(accessCounts.Mentorship)
          ],
          backgroundColor: "#4a90e2"
        }]
      },
      options: { scales: { y: { beginAtZero: true, max: 100 } } }
    });

    new Chart(document.getElementById("participationChart"), {
      type: "bar",
      data: {
        labels: ["Tutoring", "Clubs", "Competitions", "Sports", "Mentorship"],
        datasets: [{
          label: "Participation (%)",
          data: [
            toPercent(participationCounts.Tutoring),
            toPercent(participationCounts.Clubs),
            toPercent(participationCounts.Competitions),
            toPercent(participationCounts.Sports),
            toPercent(participationCounts.Mentorship)
          ],
          backgroundColor: "#50e3c2"
        }]
      },
      options: { scales: { y: { beginAtZero: true, max: 100 } } }
    });
  }
});
