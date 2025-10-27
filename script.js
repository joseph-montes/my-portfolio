const projectsData = [
  // New Capstone Project
  { id: 5, title: 'School Connect (Capstone)', tags: ['PHP', 'Laravel', 'MySQL', 'API'], description: 'A comprehensive management system for school administrative tasks, grades, and student-teacher communication.', icon: 'graduation-cap' },
  // New Hackathon Project
  { id: 6, title: 'AI Health Hackathon', tags: ['Python', 'TensorFlow', 'Flask'], description: 'Developed a prototype machine learning model for predicting health risks based on user-inputted biometric data.', icon: 'brain' },
  // Existing Projects
  { id: 1, title: 'E-Commerce Platform', tags: ['React', 'CSS', 'Node.js'], description: 'A fully responsive front-end and back-end overhaul for a modern online store.', icon: 'shopping-cart' },
  { id: 2, title: 'Task Management API', tags: ['Java', 'Spring Boot', 'MySQL'], description: 'Built a RESTful API for task scheduling and user authentication.', icon: 'server' },
  { id: 3, title: 'Personal Finance Tracker', tags: ['JavaScript', 'HTML5', 'LocalStorage'], description: 'A simple, local application to help users manage daily expenses and budgets.', icon: 'banknote' },
  // New Featured Project (ID 7)
  { id: 7, title: 'Real-Time Weather App', tags: ['JavaScript', 'REST API', 'Tailwind CSS'], description: 'A dynamic weather application using the OpenWeather API to display current conditions and forecasts for any city.', icon: 'cloud-sun' },
  
  // Remaining Existing Project
  { id: 4, title: 'Real-Time Chat App', tags: ['React', 'Firebase', 'Context API'], description: 'Developed a real-time messaging application with user authentication and presence status.', icon: 'message-circle-code' },
];

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');
const submitButton = document.getElementById('submitContact');
const loadingIcon = document.getElementById('loadingIcon');
const sendIcon = document.getElementById('sendIcon');
const mobileMenu = document.getElementById('mobileMenu');

const createProjectCard = (project) => {
  const { title, tags, description, icon } = project;
  const tagHtml = tags.map(tag => `<span class="tag-item">${tag}</span>`).join('');
  
  return `
    <div class="project-card group">
      <div class="project-header">
        <i data-lucide="${icon}" style="width: 2rem; height: 2rem;"></i>
        <h3>${title}</h3>
      </div>
      <p>${description}</p>
      <div class="tag-list">
        ${tagHtml}
      </div>
      <a href="#">
        View Details <i data-lucide="arrow-right" style="width: 1rem; height: 1rem; margin-left: 0.25rem;"></i>
      </a>
    </div>
  `;
};

const initProjectsGrid = () => {
  const container = document.getElementById('projects-container');
  
  // Select the top 6 projects from the data array.
  // Since the key projects (5, 6, 1, 2, 3, 7) are now the first 6 entries,
  // we can use slice(0, 6) for simplicity.
  const featuredProjects = projectsData.slice(0, 6); 
  
  container.innerHTML = featuredProjects.map(createProjectCard).join('');
  lucide.createIcons();
};

const handleContactForm = async (event) => {
  event.preventDefault();
  
  submitButton.disabled = true;
  loadingIcon.classList.remove('hidden');
  sendIcon.classList.add('hidden');
  formMessage.textContent = 'Sending message...';
  formMessage.style.color = 'yellow';

  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');

    formMessage.textContent = `Thank you, ${name}! Your message has been sent successfully. I will be in touch soon.`;
    formMessage.style.color = 'var(--color-secondary)';
    contactForm.reset();

  } catch (error) {
    console.error("Form Submission Error:", error);
    formMessage.textContent = 'Oops! Something went wrong. Please try again.';
    formMessage.style.color = '#ef4444';
  } finally {
    submitButton.disabled = false;
    loadingIcon.classList.add('hidden');
    sendIcon.classList.remove('hidden');
  }
};

const openMobileMenu = () => {
    mobileMenu.classList.remove('hidden');
    requestAnimationFrame(() => {
        mobileMenu.classList.add('is-open');
    });
};

const closeMobileMenu = () => {
    mobileMenu.classList.remove('is-open');
    setTimeout(() => {
        mobileMenu.classList.add('hidden');
    }, 300);
};

const setupEventListeners = () => {
  initProjectsGrid();

  contactForm.addEventListener('submit', handleContactForm);

  // Mobile Menu Listeners 
  document.getElementById('openMobileMenu').addEventListener('click', openMobileMenu);
  document.getElementById('closeMobileMenu').addEventListener('click', closeMobileMenu);
  
  // Auto-close mobile menu on desktop resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileMenu.classList.contains('is-open')) {
        closeMobileMenu();
    }
  });
};

window.addEventListener('DOMContentLoaded', setupEventListeners);
