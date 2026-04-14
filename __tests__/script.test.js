/**
 * Unit tests for script.js
 *
 * Covers:
 *  - generatePath() — all five interest branches + DOM output
 *  - supportForm submit handler — preventDefault, alert, reset
 *  - volunteerForm submit handler — preventDefault, alert, reset
 */

/* ---------- helpers ---------- */

function buildDOM() {
  document.body.innerHTML = `
    <select id="interest">
      <option value="academic">Academics</option>
      <option value="sports">Sports</option>
      <option value="creative">Creativity</option>
      <option value="people">People</option>
      <option value="unsure">Not Sure</option>
    </select>
    <select id="style">
      <option value="competitive">Competitive</option>
    </select>
    <div id="results"></div>
    <form id="supportForm">
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
    <form id="volunteerForm">
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  `;
}

/* ---------- setup / teardown ---------- */

let generatePath;

beforeEach(() => {
  buildDOM();
  jest.spyOn(window, "alert").mockImplementation(() => {});
  // Re-require script.js so event listeners are attached to the fresh DOM
  jest.resetModules();
  ({ generatePath } = require("../script"));
});

afterEach(() => {
  jest.restoreAllMocks();
});

/* ========================================================
   generatePath()
   ======================================================== */

describe("generatePath", () => {
  test('returns academic suggestions when interest is "academic"', () => {
    document.getElementById("interest").value = "academic";
    generatePath();

    const html = document.getElementById("results").innerHTML;
    expect(html).toContain("Join competitions");
    expect(html).toContain("Get tutoring");
    expect(html).toContain("Find a mentor");
  });

  test('returns sports suggestions when interest is "sports"', () => {
    document.getElementById("interest").value = "sports";
    generatePath();

    const html = document.getElementById("results").innerHTML;
    expect(html).toContain("Join a team");
    expect(html).toContain("Get coaching");
    expect(html).toContain("Practice regularly");
  });

  test('returns creative suggestions when interest is "creative"', () => {
    document.getElementById("interest").value = "creative";
    generatePath();

    const html = document.getElementById("results").innerHTML;
    expect(html).toContain("Join a club");
    expect(html).toContain("Start a project");
    expect(html).toContain("Collaborate");
  });

  test('returns people suggestions when interest is "people"', () => {
    document.getElementById("interest").value = "people";
    generatePath();

    const html = document.getElementById("results").innerHTML;
    expect(html).toContain("Leadership clubs");
    expect(html).toContain("Mentorship roles");
    expect(html).toContain("Group activities");
  });

  test('returns default suggestions when interest is "unsure"', () => {
    document.getElementById("interest").value = "unsure";
    generatePath();

    const html = document.getElementById("results").innerHTML;
    expect(html).toContain("Try something new");
    expect(html).toContain("Join beginner activities");
    expect(html).toContain("Talk to a mentor");
  });

  test("renders suggestions inside an unordered list", () => {
    document.getElementById("interest").value = "academic";
    generatePath();

    const results = document.getElementById("results");
    expect(results.querySelector("ul")).not.toBeNull();
    expect(results.querySelectorAll("li").length).toBe(3);
  });

  test("renders an <h3> heading with text 'Suggestions:'", () => {
    document.getElementById("interest").value = "sports";
    generatePath();

    const heading = document.getElementById("results").querySelector("h3");
    expect(heading).not.toBeNull();
    expect(heading.textContent).toBe("Suggestions:");
  });
});

/* ========================================================
   supportForm submit handler
   ======================================================== */

describe("supportForm submit handler", () => {
  test("calls preventDefault on submit", () => {
    const form = document.getElementById("supportForm");
    const event = new Event("submit", { bubbles: true, cancelable: true });
    jest.spyOn(event, "preventDefault");

    form.dispatchEvent(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  test('shows alert with "Request submitted!"', () => {
    const form = document.getElementById("supportForm");
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    expect(window.alert).toHaveBeenCalledWith("Request submitted!");
  });

  test("resets the form after submission", () => {
    const form = document.getElementById("supportForm");
    jest.spyOn(form, "reset");

    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    expect(form.reset).toHaveBeenCalled();
  });
});

/* ========================================================
   volunteerForm submit handler
   ======================================================== */

describe("volunteerForm submit handler", () => {
  test("calls preventDefault on submit", () => {
    const form = document.getElementById("volunteerForm");
    const event = new Event("submit", { bubbles: true, cancelable: true });
    jest.spyOn(event, "preventDefault");

    form.dispatchEvent(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  test('shows alert with "Thanks for offering help!"', () => {
    const form = document.getElementById("volunteerForm");
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    expect(window.alert).toHaveBeenCalledWith("Thanks for offering help!");
  });

  test("resets the form after submission", () => {
    const form = document.getElementById("volunteerForm");
    jest.spyOn(form, "reset");

    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    expect(form.reset).toHaveBeenCalled();
  });
});
