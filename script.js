// HTML-encode a string to prevent XSS when inserted as HTML
function sanitizeInput(str) {
  var div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// EXPLORE PATHS
function generatePath() {
  var interest = document.getElementById("interest").value;

  var suggestions = [];

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

  // Use safe DOM manipulation instead of innerHTML
  var resultsDiv = document.getElementById("results");
  resultsDiv.textContent = "";

  var heading = document.createElement("h3");
  heading.textContent = "Suggestions:";
  resultsDiv.appendChild(heading);

  var ul = document.createElement("ul");
  suggestions.forEach(function(item) {
    var li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
  resultsDiv.appendChild(ul);
}


// Bind Explore Paths button (no inline onclick — CSP blocks inline scripts)
document.getElementById("showSuggestions").addEventListener("click", generatePath);

// Sanitize all text inputs in a form before processing
function sanitizeFormData(form) {
  var inputs = form.querySelectorAll("input[type='text']");
  var isValid = true;
  inputs.forEach(function(input) {
    input.value = sanitizeInput(input.value.trim());
    if (input.value.length === 0) {
      isValid = false;
    }
  });
  return isValid;
}

// FORM SUBMISSION (TEMP)
document.getElementById("supportForm").addEventListener("submit", function(e) {
  e.preventDefault();
  if (!sanitizeFormData(this)) {
    alert("Please fill in all fields with valid input.");
    return;
  }
  alert("Request submitted!");
  this.reset();
});

document.getElementById("volunteerForm").addEventListener("submit", function(e) {
  e.preventDefault();
  if (!sanitizeFormData(this)) {
    alert("Please fill in all fields with valid input.");
    return;
  }
  alert("Thanks for offering help!");
  this.reset();
});
