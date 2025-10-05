
// Application State
        const app = {
            currentUser: null,
            currentCourse: null,
            courses: [
                {
                    id: 1,
                    title: 'Web Development Fundamentals',
                    description: 'Learn HTML, CSS, and JavaScript basics to build modern websites.',
                    icon: '🌐',
                    lessons: [
                        { id: 1, title: 'Introduction to HTML', duration: '30 min' },
                        { id: 2, title: 'CSS Styling Basics', duration: '45 min' },
                        { id: 3, title: 'JavaScript Fundamentals', duration: '60 min' },
                        { id: 4, title: 'Responsive Design', duration: '50 min' },
                        { id: 5, title: 'Building Your First Website', duration: '90 min' }
                    ]
                },
                {
                    id: 2,
                    title: 'Python Programming',
                    description: 'Master Python from scratch with hands-on projects and exercises.',
                    icon: '🐍',
                    lessons: [
                        { id: 1, title: 'Python Basics', duration: '40 min' },
                        { id: 2, title: 'Data Types and Variables', duration: '35 min' },
                        { id: 3, title: 'Control Flow', duration: '45 min' },
                        { id: 4, title: 'Functions and Modules', duration: '55 min' },
                        { id: 5, title: 'Object-Oriented Programming', duration: '70 min' }
                    ]
                },
                {
                    id: 3,
                    title: 'Data Science Essentials',
                    description: 'Explore data analysis, visualization, and machine learning basics.',
                    icon: '📊',
                    lessons: [
                        { id: 1, title: 'Introduction to Data Science', duration: '30 min' },
                        { id: 2, title: 'Working with Pandas', duration: '60 min' },
                        { id: 3, title: 'Data Visualization', duration: '50 min' },
                        { id: 4, title: 'Statistical Analysis', duration: '65 min' }
                    ]
                },
                {
                    id: 4,
                    title: 'UI/UX Design Principles',
                    description: 'Learn to create beautiful and user-friendly interfaces.',
                    icon: '🎨',
                    lessons: [
                        { id: 1, title: 'Design Thinking', duration: '40 min' },
                        { id: 2, title: 'Color Theory', duration: '35 min' },
                        { id: 3, title: 'Typography', duration: '30 min' },
                        { id: 4, title: 'User Research', duration: '50 min' },
                        { id: 5, title: 'Prototyping', duration: '60 min' },
                        { id: 6, title: 'Usability Testing', duration: '45 min' }
                    ]
                },
                {
                    id: 5,
                    title: 'Digital Marketing',
                    description: 'Master SEO, social media, and content marketing strategies.',
                    icon: '📱',
                    lessons: [
                        { id: 1, title: 'Marketing Fundamentals', duration: '35 min' },
                        { id: 2, title: 'SEO Basics', duration: '50 min' },
                        { id: 3, title: 'Social Media Strategy', duration: '45 min' },
                        { id: 4, title: 'Content Marketing', duration: '40 min' }
                    ]
                },
                {
                    id: 6,
                    title: 'Mobile App Development',
                    description: 'Build cross-platform mobile applications with modern frameworks.',
                    icon: '📲',
                    lessons: [
                        { id: 1, title: 'Mobile Development Overview', duration: '30 min' },
                        { id: 2, title: 'React Native Basics', duration: '60 min' },
                        { id: 3, title: 'Navigation and Routing', duration: '45 min' },
                        { id: 4, title: 'State Management', duration: '55 min' },
                        { id: 5, title: 'API Integration', duration: '50 min' }
                    ]
                }
            ],
            userProgress: {},

            // Initialize the app
            init() {
                this.loadFromLocalStorage();
                this.renderCourses();
                this.setupEventListeners();
                this.updateAuthUI();
            },

            // Load data from localStorage
            loadFromLocalStorage() {
                const savedUser = localStorage.getItem('currentUser');
                const savedProgress = localStorage.getItem('userProgress');
                
                if (savedUser) {
                    this.currentUser = JSON.parse(savedUser);
                }
                
                if (savedProgress) {
                    this.userProgress = JSON.parse(savedProgress);
                } else {
                    // Initialize progress for all courses
                    this.courses.forEach(course => {
                        this.userProgress[course.id] = {
                            completedLessons: [],
                            courseCompleted: false
                        };
                    });
                }
            },

            // Save data to localStorage
            saveToLocalStorage() {
                if (this.currentUser) {
                    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                }
                localStorage.setItem('userProgress', JSON.stringify(this.userProgress));
            },

            // Setup event listeners
            setupEventListeners() {
                // Login form
                document.getElementById('loginForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleLogin();
                });

                // Signup form
                document.getElementById('signupForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleSignup();
                });

                // Close modals when clicking outside
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.addEventListener('click', (e) => {
                        if (e.target === modal) {
                            this.closeModals();
                        }
                    });
                });
            },

            // Render courses on home page
            renderCourses() {
                const grid = document.getElementById('coursesGrid');
                grid.innerHTML = '';

                this.courses.forEach(course => {
                    const courseCard = document.createElement('div');
                    courseCard.className = 'course-card';
                    courseCard.onclick = () => this.showCourseDetail(course.id);

                    const progress = this.userProgress[course.id];
                    const completedCount = progress.completedLessons.length;
                    const totalLessons = course.lessons.length;
                    const isCompleted = progress.courseCompleted;

                    courseCard.innerHTML = `
                        <div class="course-image">${course.icon}</div>
                        <div class="course-content">
                            <h3 class="course-title">${course.title}</h3>
                            <p class="course-description">${course.description}</p>
                            <p style="margin-top: 1rem; color: #3498db; font-weight: 500;">
                                ${completedCount} of ${totalLessons} lessons completed
                                ${isCompleted ? '<span style="color: #2ecc71;">✓ Completed</span>' : ''}
                            </p>
                        </div>
                    `;

                    grid.appendChild(courseCard);
                });
            },

            // Show course detail page
            showCourseDetail(courseId) {
                this.currentCourse = this.courses.find(c => c.id === courseId);
                if (!this.currentCourse) return;

                const progress = this.userProgress[courseId];
                const completedCount = progress.completedLessons.length;
                const totalLessons = this.currentCourse.lessons.length;
                const percentage = (completedCount / totalLessons) * 100;

                // Render course header
                const header = document.getElementById('courseHeader');
                header.innerHTML = `
                    <h1>
                        ${this.currentCourse.title}
                        ${progress.courseCompleted ? '<span class="course-completed-badge">✓ Course Completed</span>' : ''}
                    </h1>
                    <p style="color: #7f8c8d; font-size: 1.1rem;">${this.currentCourse.description}</p>
                    <div class="progress-bar-container">
                        <div class="progress-label">
                            <span>Course Progress</span>
                            <span><strong>${completedCount}</strong> of <strong>${totalLessons}</strong> lessons completed</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                `;

                // Render lessons
                const container = document.getElementById('lessonsContainer');
                container.innerHTML = '<h2 style="margin-bottom: 1.5rem;">Lessons</h2>';

                this.currentCourse.lessons.forEach(lesson => {
                    const isCompleted = progress.completedLessons.includes(lesson.id);
                    
                    const lessonDiv = document.createElement('div');
                    lessonDiv.className = `lesson-item ${isCompleted ? 'completed' : ''}`;
                    lessonDiv.innerHTML = `
                        <div class="lesson-info">
                            <h3>${isCompleted ? '✓ ' : ''}${lesson.title}</h3>
                            <p>Duration: ${lesson.duration}</p>
                        </div>
                        <button class="btn-complete ${isCompleted ? 'completed' : ''}" 
                                onclick="app.toggleLesson(${this.currentCourse.id}, ${lesson.id})">
                            ${isCompleted ? 'Completed' : 'Mark Complete'}
                        </button>
                    `;
                    container.appendChild(lessonDiv);
                });

                // Add complete course button
                const allCompleted = completedCount === totalLessons;
                const completeBtn = document.createElement('button');
                completeBtn.className = 'btn-complete-course';
                completeBtn.disabled = !allCompleted || progress.courseCompleted;
                completeBtn.textContent = progress.courseCompleted ? 
                    '✓ Course Completed!' : 
                    (allCompleted ? 'Mark Course as Completed' : 'Complete All Lessons First');
                completeBtn.onclick = () => this.completeCourse(courseId);
                container.appendChild(completeBtn);

                this.showPage('courseDetail');
            },

            // Toggle lesson completion
            toggleLesson(courseId, lessonId) {
                const progress = this.userProgress[courseId];
                const index = progress.completedLessons.indexOf(lessonId);

                if (index > -1) {
                    progress.completedLessons.splice(index, 1);
                } else {
                    progress.completedLessons.push(lessonId);
                }

                this.saveToLocalStorage();
                this.showCourseDetail(courseId);
            },

            // Complete entire course
            completeCourse(courseId) {
                this.userProgress[courseId].courseCompleted = true;
                this.saveToLocalStorage();
                this.showCourseDetail(courseId);
                alert('🎉 Congratulations! You have completed this course!');
            },

            // Handle login
            handleLogin() {
                const username = document.getElementById('loginUsername').value.trim();
                const password = document.getElementById('loginPassword').value;

                // Clear previous errors
                document.getElementById('loginUsernameError').textContent = '';
                document.getElementById('loginPasswordError').textContent = '';

                // Basic validation
                if (!username) {
                    document.getElementById('loginUsernameError').textContent = 'Username is required';
                    return;
                }
                if (!password) {
                    document.getElementById('loginPasswordError').textContent = 'Password is required';
                    return;
                }

                // Simulate login (in real app, would validate against backend)
                this.currentUser = { username };
                this.saveToLocalStorage();
                this.updateAuthUI();
                this.closeModals();
                alert(`Welcome back, ${username}!`);
            },

            // Handle signup
            handleSignup() {
                const username = document.getElementById('signupUsername').value.trim();
                const email = document.getElementById('signupEmail').value.trim();
                const password = document.getElementById('signupPassword').value;

                // Clear previous errors
                document.getElementById('signupUsernameError').textContent = '';
                document.getElementById('signupEmailError').textContent = '';
                document.getElementById('signupPasswordError').textContent = '';

                // Validation
                let hasError = false;

                if (!username || username.length < 3) {
                    document.getElementById('signupUsernameError').textContent = 'Username must be at least 3 characters';
                    hasError = true;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email || !emailRegex.test(email)) {
                    document.getElementById('signupEmailError').textContent = 'Please enter a valid email address';
                    hasError = true;
                }

                if (!password || password.length < 6) {
                    document.getElementById('signupPasswordError').textContent = 'Password must be at least 6 characters';
                    hasError = true;
                }

                if (hasError) return;

                // Simulate signup (in real app, would send to backend)
                this.currentUser = { username, email };
                this.saveToLocalStorage();
                this.updateAuthUI();
                this.closeModals();
                alert(`Welcome to LearnHub, ${username}!`);
            },

            // Logout
            logout() {
                this.currentUser = null;
                localStorage.removeItem('currentUser');
                this.updateAuthUI();
                this.showPage('home');
                alert('You have been logged out successfully.');
            },

            // Update authentication UI
            updateAuthUI() {
                const loginBtn = document.getElementById('btnLogin');
                const signupBtn = document.getElementById('btnSignup');
                const logoutBtn = document.getElementById('btnLogout');
                const welcomeMsg = document.getElementById('userWelcome');

                if (this.currentUser) {
                    loginBtn.style.display = 'none';
                    signupBtn.style.display = 'none';
                    logoutBtn.style.display = 'inline-block';
                    welcomeMsg.style.display = 'inline';
                    welcomeMsg.textContent = `Welcome, ${this.currentUser.username}`;
                } else {
                    loginBtn.style.display = 'inline-block';
                    signupBtn.style.display = 'inline-block';
                    logoutBtn.style.display = 'none';
                    welcomeMsg.style.display = 'none';
                }
            },

            // Show/hide pages
            showPage(pageName) {
                document.querySelectorAll('.page').forEach(page => {
                    page.classList.remove('active');
                });

                if (pageName === 'home') {
                    document.getElementById('homePage').classList.add('active');
                    this.renderCourses();
                } else if (pageName === 'courseDetail') {
                    document.getElementById('courseDetailPage').classList.add('active');
                }

                // Close mobile menu if open
                document.getElementById('nav').classList.remove('active');
            },

            // Show modal
            showModal(modalType) {
                this.closeModals();
                
                if (modalType === 'login') {
                    document.getElementById('loginModal').classList.add('active');
                    document.getElementById('loginUsername').focus();
                } else if (modalType === 'signup') {
                    document.getElementById('signupModal').classList.add('active');
                    document.getElementById('signupUsername').focus();
                }

                // Clear form fields and errors
                document.querySelectorAll('input').forEach(input => input.value = '');
                document.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');
            },

            // Close all modals
            closeModals() {
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.classList.remove('active');
                });
            },

            // Toggle mobile menu
            toggleMenu() {
                document.getElementById('nav').classList.toggle('active');
            }
        };

        // Initialize app when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            app.init();
        });