// ===== FOSTERIFY – Main Script =====

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initPillGroups();
  initExplorePaths();
  initSupportForm();
  initVolunteerForm();
  initOpportunities();
  initFeedback();
});

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  // Scroll shadow
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });

  // Mobile menu toggle
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// ===== PILL GROUP SELECTION =====
function initPillGroups() {
  document.querySelectorAll('.pill-group').forEach(group => {
    group.querySelectorAll('.pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        // Toggle selection within group (single select)
        const wasActive = pill.classList.contains('active');
        group.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        if (!wasActive) pill.classList.add('active');
      });
    });
  });
}

function getSelectedValue(groupId) {
  const group = document.getElementById(groupId);
  const active = group.querySelector('.pill.active');
  return active ? active.dataset.value : null;
}

// ===== EXPLORE PATHS =====
const suggestionData = {
  academic: {
    competitive: [
      { icon: '🧮', title: 'Math Olympiad', desc: 'Test your problem-solving skills in competitive math.' },
      { icon: '🔬', title: 'Science Bowl', desc: 'Compete in fast-paced science trivia with a team.' },
      { icon: '🗣️', title: 'Debate Team', desc: 'Sharpen your argumentation and public speaking.' },
      { icon: '🏅', title: 'Academic Decathlon', desc: 'Challenge yourself across multiple subjects.' }
    ],
    casual: [
      { icon: '📖', title: 'Study Group', desc: 'Learn together with peers in a relaxed setting.' },
      { icon: '📚', title: 'Book Club', desc: 'Read and discuss interesting books with others.' },
      { icon: '🔭', title: 'Science Club', desc: 'Explore experiments and discoveries at your pace.' },
      { icon: '✏️', title: 'Homework Help', desc: 'Drop in for help with assignments and projects.' }
    ],
    'one-on-one': [
      { icon: '🎓', title: 'Find a Tutor', desc: 'Get matched with a peer tutor in your subject.' },
      { icon: '🧭', title: 'Academic Mentor', desc: 'Connect with someone who can guide your studies.' },
      { icon: '👥', title: 'Study Partner', desc: 'Pair up with a classmate for mutual support.' },
      { icon: '📝', title: 'Writing Coach', desc: 'Get one-on-one help improving your essays.' }
    ]
  },
  sports: {
    competitive: [
      { icon: '⚽', title: 'Varsity Sports', desc: 'Try out for your school\'s competitive teams.' },
      { icon: '🏃', title: 'Track & Field', desc: 'Compete in running, jumping, and throwing events.' },
      { icon: '🏊', title: 'Swimming Meets', desc: 'Race in organized swim competitions.' },
      { icon: '🏆', title: 'Tournament Play', desc: 'Join tournaments in your favorite sport.' }
    ],
    casual: [
      { icon: '🏀', title: 'Intramural Sports', desc: 'Play for fun with other students — no pressure.' },
      { icon: '🚴', title: 'Outdoor Club', desc: 'Hiking, biking, and exploring the outdoors.' },
      { icon: '🧘', title: 'Yoga & Wellness', desc: 'Stay active with low-key movement and mindfulness.' },
      { icon: '🎾', title: 'Pickup Games', desc: 'Join casual games happening around campus.' }
    ],
    'one-on-one': [
      { icon: '🏋️', title: 'Personal Coaching', desc: 'Get guidance from an experienced athlete or coach.' },
      { icon: '🤸', title: 'Training Partner', desc: 'Find someone to train with regularly.' },
      { icon: '📋', title: 'Sports Mentor', desc: 'Learn strategy, nutrition, and mental toughness.' },
      { icon: '🎯', title: 'Skills Training', desc: 'Focus on specific skills with guided practice.' }
    ]
  },
  creative: {
    competitive: [
      { icon: '🎨', title: 'Art Contests', desc: 'Showcase your art in local or national competitions.' },
      { icon: '🎬', title: 'Film Festivals', desc: 'Create short films and submit to festivals.' },
      { icon: '✍️', title: 'Writing Competitions', desc: 'Enter poetry, fiction, or essay contests.' },
      { icon: '💻', title: 'Hackathons', desc: 'Build creative tech projects in a weekend.' }
    ],
    casual: [
      { icon: '🎭', title: 'Drama Club', desc: 'Act, direct, or work backstage — all welcome.' },
      { icon: '📷', title: 'Photography Walks', desc: 'Explore and capture your surroundings with others.' },
      { icon: '🎵', title: 'Music Jam Sessions', desc: 'Play music together — any skill level.' },
      { icon: '🖌️', title: 'Art Club', desc: 'Create, experiment, and share your art.' }
    ],
    'one-on-one': [
      { icon: '🎨', title: 'Art Mentor', desc: 'Get guidance on your creative journey.' },
      { icon: '🎹', title: 'Music Lessons', desc: 'Learn an instrument with a peer teacher.' },
      { icon: '📂', title: 'Portfolio Review', desc: 'Get feedback on your creative portfolio.' },
      { icon: '✏️', title: 'Creative Coach', desc: 'Work with someone to develop your artistic voice.' }
    ]
  },
  people: {
    competitive: [
      { icon: '🌍', title: 'Model UN', desc: 'Debate global issues and practice diplomacy.' },
      { icon: '🏛️', title: 'Student Government', desc: 'Run for office and lead school initiatives.' },
      { icon: '🎤', title: 'Public Speaking', desc: 'Compete in speech and presentation events.' },
      { icon: '🤝', title: 'Leadership Awards', desc: 'Apply for leadership recognition programs.' }
    ],
    casual: [
      { icon: '💚', title: 'Volunteer Groups', desc: 'Give back to your community with a team.' },
      { icon: '🌐', title: 'Cultural Clubs', desc: 'Celebrate diversity and learn about cultures.' },
      { icon: '🫂', title: 'Peer Support', desc: 'Help other students navigate challenges.' },
      { icon: '📢', title: 'Advocacy Groups', desc: 'Organize around causes you care about.' }
    ],
    'one-on-one': [
      { icon: '🧭', title: 'Leadership Mentoring', desc: 'Learn from experienced student leaders.' },
      { icon: '💼', title: 'Career Guidance', desc: 'Explore careers with a mentor\'s help.' },
      { icon: '🗣️', title: 'Peer Counseling', desc: 'Support and be supported by fellow students.' },
      { icon: '🌟', title: 'Life Coaching', desc: 'Set goals and build confidence one-on-one.' }
    ]
  },
  unsure: {
    competitive: [
      { icon: '🌱', title: 'Try a Sampler Event', desc: 'Attend a multi-activity day and see what clicks.' },
      { icon: '🎯', title: 'Skills Challenge', desc: 'A low-stakes competition to discover your strengths.' },
      { icon: '🧩', title: 'Trivia Night', desc: 'Join a fun, social competition with no pressure.' },
      { icon: '🤔', title: 'Interest Quiz', desc: 'Take a short quiz to find what fits you.' }
    ],
    casual: [
      { icon: '👋', title: 'Intro Workshop', desc: 'Drop in to a beginner session — no commitment.' },
      { icon: '☕', title: 'Student Mixer', desc: 'Meet other students and explore options together.' },
      { icon: '🗺️', title: 'Club Fair', desc: 'Browse all available clubs and activities.' },
      { icon: '📝', title: 'Journaling Workshop', desc: 'Reflect on your interests through guided writing.' }
    ],
    'one-on-one': [
      { icon: '🧭', title: 'Talk to a Mentor', desc: 'Chat with someone who can help you figure things out.' },
      { icon: '📊', title: 'Strengths Assessment', desc: 'Discover your strengths with a guided assessment.' },
      { icon: '💡', title: 'Exploration Session', desc: 'One-on-one brainstorming about what excites you.' },
      { icon: '🎯', title: 'Goal Setting', desc: 'Work with a peer to set small, achievable goals.' }
    ]
  }
};

const beginnerSuggestions = [
  { icon: '👋', title: 'Attend an Intro Workshop', desc: 'Low-commitment, no experience needed — just show up!' },
  { icon: '☕', title: 'Join a Student Mixer', desc: 'Meet other students and explore what\'s available.' },
  { icon: '🧭', title: 'Talk to a Peer Mentor', desc: 'Get guidance from someone who\'s been there.' },
  { icon: '🗺️', title: 'Browse the Club Fair', desc: 'Walk around and see what catches your eye.' },
  { icon: '📝', title: 'Take an Interest Quiz', desc: 'Answer a few questions to find starting points.' },
  { icon: '🌱', title: 'Try One New Thing', desc: 'Pick any activity and give it one try — that\'s it!' }
];

function initExplorePaths() {
  const showBtn = document.getElementById('showSuggestions');
  const unsureBtn = document.getElementById('unsureBtn');
  const resultsDiv = document.getElementById('suggestionsResult');

  showBtn.addEventListener('click', () => {
    const interest = getSelectedValue('interestGroup');
    const style = getSelectedValue('styleGroup');

    if (!interest || !style) {
      resultsDiv.classList.remove('hidden');
      resultsDiv.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Please select both an interest and engagement style above.</p>';
      return;
    }

    const suggestions = suggestionData[interest][style];
    renderSuggestions(resultsDiv, suggestions, 'Based on your choices:');
  });

  unsureBtn.addEventListener('click', () => {
    // Auto-select "Not Sure" and "Casual"
    document.querySelectorAll('#interestGroup .pill').forEach(p => p.classList.remove('active'));
    document.querySelector('#interestGroup .pill[data-value="unsure"]').classList.add('active');
    document.querySelectorAll('#styleGroup .pill').forEach(p => p.classList.remove('active'));
    document.querySelector('#styleGroup .pill[data-value="casual"]').classList.add('active');

    const resultsDiv = document.getElementById('suggestionsResult');
    renderSuggestions(resultsDiv, beginnerSuggestions, 'Easy ways to get started:');

    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

function renderSuggestions(container, suggestions, title) {
  container.classList.remove('hidden');
  container.innerHTML = `
    <h3 style="font-size: 1.05rem; margin-bottom: 4px;">${title}</h3>
    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 12px;">Click any suggestion to learn more or take action.</p>
    <div class="suggestion-grid">
      ${suggestions.map(s => `
        <div class="suggestion-card">
          <span class="s-icon">${s.icon}</span>
          <div class="s-title">${s.title}</div>
          <div class="s-desc">${s.desc}</div>
        </div>
      `).join('')}
    </div>
  `;
  container.classList.add('fade-in');
}

// ===== SUPPORT FORM =====
function initSupportForm() {
  const form = document.getElementById('supportForm');
  const confirmation = document.getElementById('supportConfirmation');
  const anotherBtn = document.getElementById('supportAnother');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      name: form.querySelector('[name="name"]').value,
      school: form.querySelector('[name="school"]').value,
      type: getSelectedValue('supportTypeGroup') || 'general',
      subject: form.querySelector('[name="subject"]').value,
      urgency: getSelectedValue('urgencyGroup') || 'low',
      availability: form.querySelector('[name="availability"]').value,
      timestamp: new Date().toISOString()
    };

    // Store for matching system
    saveRequest('supportRequests', formData);

    // Show confirmation
    form.classList.add('hidden');
    confirmation.classList.remove('hidden');
  });

  anotherBtn.addEventListener('click', () => {
    form.reset();
    // Reset pill selections
    document.querySelectorAll('#supportTypeGroup .pill, #urgencyGroup .pill').forEach(p => p.classList.remove('active'));
    confirmation.classList.add('hidden');
    form.classList.remove('hidden');
  });
}

// ===== VOLUNTEER FORM =====
function initVolunteerForm() {
  const form = document.getElementById('volunteerForm');
  const confirmation = document.getElementById('volunteerConfirmation');
  const anotherBtn = document.getElementById('volunteerAnother');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      name: form.querySelector('[name="name"]').value,
      school: form.querySelector('[name="school"]').value,
      skills: form.querySelector('[name="skills"]').value,
      helpType: getSelectedValue('helpTypeGroup') || 'general',
      timestamp: new Date().toISOString()
    };

    // Store for matching system
    saveRequest('volunteerSignups', formData);

    // Show confirmation
    form.classList.add('hidden');
    confirmation.classList.remove('hidden');
  });

  anotherBtn.addEventListener('click', () => {
    form.reset();
    document.querySelectorAll('#helpTypeGroup .pill').forEach(p => p.classList.remove('active'));
    confirmation.classList.add('hidden');
    form.classList.remove('hidden');
  });
}

// ===== MATCHING SYSTEM (localStorage) =====
function saveRequest(key, data) {
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  existing.push(data);
  localStorage.setItem(key, JSON.stringify(existing));
}

// ===== OPPORTUNITIES =====
const opportunities = [
  { title: 'Math Olympiad', desc: 'Compete in regional and national math competitions. Build problem-solving skills and meet like-minded students.', category: 'academic', difficulty: 'intermediate', icon: '🧮' },
  { title: 'Community Service Club', desc: 'Organize volunteer events and give back to your local community with a team of students.', category: 'leadership', difficulty: 'beginner', icon: '💚' },
  { title: 'Creative Writing Workshop', desc: 'Explore fiction, poetry, and personal essays in a supportive, beginner-friendly environment.', category: 'academic', difficulty: 'beginner', icon: '✍️' },
  { title: 'Varsity Soccer', desc: 'Compete at the highest level of school athletics. Requires tryouts and regular practice.', category: 'sports', difficulty: 'advanced', icon: '⚽' },
  { title: 'Coding Bootcamp', desc: 'Learn programming fundamentals in a hands-on, project-based format. No prior experience needed.', category: 'academic', difficulty: 'beginner', icon: '💻' },
  { title: 'Student Government', desc: 'Represent your peers, plan events, and develop leadership skills in school government.', category: 'leadership', difficulty: 'intermediate', icon: '🏛️' },
  { title: 'Art Exhibition', desc: 'Showcase your visual art in the school gallery. Open to all skill levels and mediums.', category: 'academic', difficulty: 'beginner', icon: '🎨' },
  { title: 'Debate Tournament', desc: 'Sharpen your critical thinking and public speaking in competitive debate events.', category: 'academic', difficulty: 'intermediate', icon: '🗣️' },
  { title: 'Youth Mentorship Program', desc: 'Mentor younger students or be mentored by upperclassmen. Build confidence and connections.', category: 'leadership', difficulty: 'beginner', icon: '🤝' },
  { title: 'Track & Field', desc: 'Train and compete in running, jumping, and throwing events at all skill levels.', category: 'sports', difficulty: 'beginner', icon: '🏃' },
  { title: 'Science Fair', desc: 'Design and present a research project. Great for exploring topics you\'re curious about.', category: 'academic', difficulty: 'intermediate', icon: '🔬' },
  { title: 'Photography Club', desc: 'Learn photography basics, go on photo walks, and share your work. All experience levels welcome.', category: 'academic', difficulty: 'beginner', icon: '📷' }
];

function initOpportunities() {
  const grid = document.getElementById('oppGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  renderOpportunities(grid, opportunities);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let filtered;

      if (filter === 'all') {
        filtered = opportunities;
      } else if (filter === 'beginner') {
        filtered = opportunities.filter(o => o.difficulty === 'beginner');
      } else {
        filtered = opportunities.filter(o => o.category === filter);
      }

      renderOpportunities(grid, filtered);
    });
  });
}

function renderOpportunities(container, items) {
  if (items.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--text-muted); grid-column: 1 / -1; padding: 40px;">No opportunities found in this category.</p>';
    return;
  }

  container.innerHTML = items.map(opp => {
    const categoryClass = `tag-${opp.category}`;
    const difficultyClass = `tag-${opp.difficulty}`;
    const categoryLabel = opp.category.charAt(0).toUpperCase() + opp.category.slice(1);
    const diffLabel = opp.difficulty.charAt(0).toUpperCase() + opp.difficulty.slice(1);

    return `
      <div class="opp-card fade-in">
        <span class="opp-icon">${opp.icon}</span>
        <div class="opp-title">${opp.title}</div>
        <div class="opp-desc">${opp.desc}</div>
        <div class="opp-tags">
          <span class="opp-tag ${categoryClass}">${categoryLabel}</span>
          <span class="opp-tag ${difficultyClass}">${diffLabel}</span>
        </div>
      </div>
    `;
  }).join('');
}

// ===== FEEDBACK =====
function initFeedback() {
  const feedbackBtns = document.querySelectorAll('.feedback-btn');
  const prompt = document.getElementById('feedbackPrompt');
  const followUp = document.getElementById('feedbackFollowUp');
  const feedbackMsg = document.getElementById('feedbackMessage');
  const feedbackTextArea = document.getElementById('feedbackTextArea');
  const submitBtn = document.getElementById('submitFeedback');
  const done = document.getElementById('feedbackDone');

  feedbackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.dataset.value;
      prompt.classList.add('hidden');
      followUp.classList.remove('hidden');

      if (value === 'yes') {
        feedbackMsg.textContent = 'Glad to hear it! Want to tell us more about your experience?';
      } else {
        feedbackMsg.textContent = 'We\'re sorry to hear that. Your feedback helps us improve.';
      }
      feedbackTextArea.classList.remove('hidden');

      // Save initial feedback
      saveFeedback({ helpful: value, timestamp: new Date().toISOString() });
    });
  });

  submitBtn.addEventListener('click', () => {
    const text = document.getElementById('feedbackText').value;
    if (text.trim()) {
      saveFeedback({ comment: text, timestamp: new Date().toISOString() });
    }
    followUp.classList.add('hidden');
    done.classList.remove('hidden');
  });
}

function saveFeedback(data) {
  const existing = JSON.parse(localStorage.getItem('feedback') || '[]');
  existing.push(data);
  localStorage.setItem('feedback', JSON.stringify(existing));
}
