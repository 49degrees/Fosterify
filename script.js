// EXPLORE PATHS
function generatePath() {
  const interest = document.getElementById("interest").value;

  let suggestions = [];

  if (interest === "academic") {
    suggestions = ["Join competitions", "Get tutoring", "Find a mentor"];
  } 
  else if (interest === "sports") {
    suggestions = ["Join a team", "Get coaching", "Practice regularly"];
  } 
  else if (interest === "creative") {
    suggestions = ["Join a club", "Start a project", "Collaborate"];
  } 
  else if (interest === "people") {
    suggestions = ["Leadership clubs", "Mentorship roles", "Group activities"];
  } 
  else {
    suggestions = ["Try something new", "Join beginner activities", "Talk to a mentor"];
  }

  document.getElementById("results").innerHTML =
    "<h3>Suggestions:</h3><ul>" +
    suggestions.map(item => `<li>${item}</li>`).join("") +
    "</ul>";
}


// FORM SUBMISSION (TEMP)
document.getElementById("supportForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Request submitted!");
  this.reset();
});

document.getElementById("volunteerForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thanks for offering help!");
  this.reset();
});
