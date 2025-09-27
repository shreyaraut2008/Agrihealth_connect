// Global variables
let currentLanguage = 'en';
let currentTheme = 'light';
let uploadedCropImage = null;
let questions = [];
let filteredQuestions = [];
let currentFilter = 'all';

// Enhanced Translation data
const translations = {
    en: {
        'hero.badge': 'Smart Agriculture Revolution',
        'hero.title': 'Transform Your Farm with AI Technology',
        'hero.subtitle': 'Revolutionize your farming with instant crop disease diagnosis, soil health analysis, and expert community support - all powered by cutting-edge artificial intelligence.',
        'hero.getStarted': 'Get Started Free',
        'hero.googleLogin': 'Login with Google',
        'stats.farmers': 'Happy Farmers',
        'stats.accuracy': 'AI Accuracy',
        'stats.support': 'Support',
        'features.title': 'Powerful Features for Modern Farmers',
        'features.subtitle': 'Everything you need to optimize your agricultural operations',
        'features.cropDoctor.title': 'AI Crop Doctor',
        'features.cropDoctor.description': 'Upload crop photos and get instant AI-powered disease diagnosis with 95% accuracy',
        'features.soilHealth.title': 'Smart Soil Analysis',
        'features.soilHealth.description': 'Comprehensive soil health analysis with personalized crop recommendations',
        'features.community.title': 'Expert Community',
        'features.community.description': 'Connect with thousands of farmers and agricultural experts worldwide',
        'features.alerts.title': 'Smart Alerts',
        'features.alerts.description': 'Never miss important updates about weather, schemes, and farming schedules',
        'howItWorks.title': 'How It Works',
        'howItWorks.subtitle': 'Get started in just 3 simple steps',
        'steps.upload.title': 'Upload Photos',
        'steps.upload.description': 'Simply take a photo of your crop or enter soil parameters',
        'steps.analyze.title': 'AI Analysis',
        'steps.analyze.description': 'Our advanced AI analyzes your data in real-time',
        'steps.results.title': 'Get Results',
        'steps.results.description': 'Receive detailed insights and actionable recommendations',
        'testimonials.title': 'What Farmers Say',
        'testimonials.subtitle': 'Real stories from real farmers',
        'cta.title': 'Ready to Transform Your Farm?',
        'cta.subtitle': 'Join thousands of farmers who are already using AI to boost their productivity',
        'cta.getStarted': 'Start Your Journey',
        'cta.learnMore': 'Learn More',
        'dashboard.title': 'Farmer Dashboard',
        'dashboard.subtitle': 'Your AI-powered farming command center',
        'dashboard.cropDoctor.title': 'AI Crop Doctor',
        'dashboard.cropDoctor.subtitle': 'Instant disease diagnosis',
        'dashboard.cropDoctor.uploadLabel': 'Upload Crop Photo',
        'dashboard.cropDoctor.uploadText': 'Click or drag to upload crop photo',
        'dashboard.cropDoctor.diagnose': 'Diagnose Crop',
        'dashboard.soilHealth.title': 'Soil Health Analysis',
        'dashboard.soilHealth.subtitle': 'Optimize your soil conditions',
        'dashboard.soilHealth.ph': 'Soil pH',
        'dashboard.soilHealth.moisture': 'Moisture Level (%)',
        'dashboard.soilHealth.fertility': 'Fertility Level',
        'dashboard.soilHealth.fertility.low': 'Low',
        'dashboard.soilHealth.fertility.medium': 'Medium',
        'dashboard.soilHealth.fertility.high': 'High',
        'dashboard.soilHealth.location': 'Location',
        'dashboard.soilHealth.analyze': 'Analyze Soil',
        'dashboard.alerts.title': 'Smart Alerts',
        'dashboard.alerts.subtitle': 'Stay updated with important notifications',
        'community.title': 'Farmer Community',
        'community.description': 'Connect, share knowledge, and grow together',
        'community.askQuestion': 'Ask a Question',
        'community.questionTitle': 'Question Title',
        'community.questionDescription': 'Description',
        'community.category': 'Category',
        'community.categories.crops': 'Crops',
        'community.categories.soil': 'Soil',
        'community.categories.pests': 'Pests & Disease',
        'community.categories.weather': 'Weather',
        'community.categories.general': 'General',
        'community.postQuestion': 'Post Question',
        'community.recentQuestions': 'Recent Questions',
        'about.title': 'About AgriHealth Connect',
        'about.subtitle': 'Empowering farmers with AI-driven agricultural solutions',
        'about.problem.title': 'The Problem',
        'about.problem.description': 'Farmers face numerous challenges including crop diseases, soil health issues, and lack of access to expert knowledge. Traditional methods of diagnosis are often slow, expensive, and not easily accessible to small-scale farmers.',
        'about.solution.title': 'Our Solution',
        'about.solution.description': 'AgriHealth Connect leverages AI and machine learning to provide instant crop disease diagnosis through image recognition, soil health analysis, and connects farmers with a community platform for knowledge sharing.',
        'about.features.title': 'Key Features',
        'about.impact.title': 'Impact',
        'about.impact.description': 'By providing accessible, AI-powered agricultural assistance, we aim to improve crop yields, reduce losses from diseases, and empower farmers with knowledge and community support.'
    },
    hi: {
        'hero.badge': 'स्मार्ट कृषि क्रांति',
        'hero.title': 'AI तकनीक से अपने खेत को बदलें',
        'hero.subtitle': 'अत्याधुनिक कृत्रिम बुद्धिमत्ता द्वारा संचालित तत्काल फसल रोग निदान, मिट्टी स्वास्थ्य विश्लेषण और विशेषज्ञ समुदाय समर्थन के साथ अपनी खेती में क्रांति लाएं।',
        'hero.getStarted': 'मुफ्त शुरू करें',
        'hero.googleLogin': 'Google से लॉगिन करें',
        'stats.farmers': 'खुश किसान',
        'stats.accuracy': 'AI सटीकता',
        'stats.support': 'सहायता',
        'features.title': 'आधुनिक किसानों के लिए शक्तिशाली सुविधाएं',
        'features.subtitle': 'आपके कृषि संचालन को अनुकूलित करने के लिए आवश्यक सब कुछ',
        'features.cropDoctor.title': 'AI फसल डॉक्टर',
        'features.cropDoctor.description': '95% सटीकता के साथ फसल की तस्वीरें अपलोड करें और तुरंत AI-संचालित रोग निदान प्राप्त करें',
        'features.soilHealth.title': 'स्मार्ट मिट्टी विश्लेषण',
        'features.soilHealth.description': 'व्यक्तिगत फसल सिफारिशों के साथ व्यापक मिट्टी स्वास्थ्य विश्लेषण',
        'features.community.title': 'विशेषज्ञ समुदाय',
        'features.community.description': 'दुनिया भर के हजारों किसानों और कृषि विशेषज्ञों से जुड़ें',
        'features.alerts.title': 'स्मार्ट अलर्ट',
        'features.alerts.description': 'मौसम, योजनाओं और खेती के कार्यक्रम के बारे में महत्वपूर्ण अपडेट कभी न चूकें',
        'dashboard.title': 'किसान डैशबोर्ड',
        'dashboard.subtitle': 'आपका AI-संचालित कृषि कमांड सेंटर',
        'community.title': 'किसान समुदाय',
        'community.description': 'जुड़ें, ज्ञान साझा करें और एक साथ बढ़ें'
    },
    mr: {
        'hero.badge': 'स्मार्ट कृषी क्रांती',
        'hero.title': 'AI तंत्रज्ञानाने आपले शेत बदला',
        'hero.subtitle': 'अत्याधुनिक कृत्रिम बुद्धिमत्तेद्वारे चालित तात्काळ पीक रोग निदान, माती आरोग्य विश्लेषण आणि तज्ञ समुदाय समर्थनासह आपल्या शेतीमध्ये क्रांती करा.',
        'hero.getStarted': 'विनामूल्य सुरुवात करा',
        'hero.googleLogin': 'Google ने लॉगिन करा',
        'stats.farmers': 'आनंदी शेतकरी',
        'stats.accuracy': 'AI अचूकता',
        'stats.support': 'समर्थन',
        'features.title': 'आधुनिक शेतकऱ्यांसाठी शक्तिशाली वैशिष्ट्ये',
        'features.subtitle': 'आपल्या कृषी कामकाजाचा अनुकूल करण्यासाठी आवश्यक सर्व काही',
        'dashboard.title': 'शेतकरी डॅशबोर्ड',
        'dashboard.subtitle': 'आपले AI-चालित शेती कमांड सेंटर',
        'community.title': 'शेतकरी समुदाय',
        'community.description': 'जोडा, ज्ञान सामायिक करा आणि एकत्र वाढा'
    }
};

// Enhanced sample data
const sampleQuestions = [
    {
        id: 1,
        title: "White spots on tomato leaves - Need urgent help!",
        description: "I noticed white spots appearing on my tomato plants. The spots are spreading rapidly and I'm worried about losing my entire crop. The plants are about 2 months old and were doing well until last week. What could be the cause and what should I do?",
        category: "pests",
        author: "Ramesh Kumar",
        timestamp: "2 hours ago",
        replies: 8,
        upvotes: 15,
        location: "Maharashtra"
    },
    {
        id: 2,
        title: "Best organic fertilizer for wheat in winter season",
        description: "Looking for recommendations on organic fertilizers for wheat cultivation during winter season. I want to avoid chemical fertilizers this year and go completely organic. My soil pH is 7.2 and the field size is 5 acres.",
        category: "crops",
        author: "Priya Sharma",
        timestamp: "1 day ago",
        replies: 12,
        upvotes: 23,
        location: "Punjab"
    },
    {
        id: 3,
        title: "Soil pH too high (8.5) - Effective solutions needed",
        description: "My soil test shows pH 8.5 which is too alkaline for most vegetables. I've tried adding sulfur but haven't seen much improvement. What are the best and fastest ways to reduce soil pH for vegetable farming? Any organic methods preferred.",
        category: "soil",
        author: "Suresh Patil",
        timestamp: "2 days ago",
        replies: 18,
        upvotes: 31,
        location: "Karnataka"
    },
    {
        id: 4,
        title: "Pest control for cotton crop - Bollworm infestation",
        description: "My cotton crop is affected by bollworm infestation. I've noticed damaged bolls and larvae in several plants. This is my first time dealing with this pest. What's the most effective treatment that won't harm beneficial insects?",
        category: "pests",
        author: "Madhavi Rao",
        timestamp: "3 days ago",
        replies: 6,
        upvotes: 9,
        location: "Telangana"
    },
    {
        id: 5,
        title: "Weather prediction for rice planting",
        description: "Planning to start rice planting next month. Can anyone share insights about the weather patterns and rainfall predictions for the next 2 months? I want to time the planting perfectly for maximum yield.",
        category: "weather",
        author: "Arjun Singh",
        timestamp: "1 week ago",
        replies: 4,
        upvotes: 7,
        location: "West Bengal"
    }
];

const sampleAlerts = [
    {
        type: "weather",
        title: "Heavy Rain Alert - Next 48 Hours",
        message: "Meteorological department predicts heavy rainfall (50-100mm) in the next 48 hours. Protect your crops from waterlogging. Ensure proper drainage in fields.",
        timestamp: "1 hour ago",
        priority: "high"
    },
    {
        type: "scheme",
        title: "PM-KISAN Scheme - New Installment",
        message: "The 15th installment of PM-KISAN scheme (₹2000) will be credited to beneficiary accounts by 15th of this month. Verify your bank details.",
        timestamp: "6 hours ago",
        priority: "medium"
    },
    {
        type: "reminder",
        title: "Pesticide Application Due - Cotton Crop",
        message: "Scheduled pesticide application for cotton crop is due in 2 days. Weather conditions are favorable for spraying. Check equipment and prepare solution.",
        timestamp: "12 hours ago",
        priority: "high"
    },
    {
        type: "scheme",
        title: "Crop Insurance - Last Date Extended",
        message: "The last date for crop insurance enrollment has been extended to 30th of this month. Don't miss this opportunity to protect your investment.",
        timestamp: "1 day ago",
        priority: "medium"
    },
    {
        type: "weather",
        title: "Temperature Drop Expected",
        message: "Temperature is expected to drop by 5-8°C in the coming week. Take necessary precautions for temperature-sensitive crops.",
        timestamp: "2 days ago",
        priority: "low"
    }
];

// Enhanced crop diagnosis database
const cropDiseases = [
    {
        name: "Early Blight",
        confidence: "92%",
        severity: "Moderate",
        treatment: "Apply copper-based fungicide (Copper oxychloride 50% WP @ 2g/L) every 10-14 days. Ensure good air circulation and avoid overhead watering.",
        prevention: "Use resistant varieties, maintain proper plant spacing, and practice crop rotation with non-solanaceous crops.",
        organic: "Use neem oil spray (5ml/L) or baking soda solution (5g/L) as organic alternatives.",
        expectedRecovery: "2-3 weeks with proper treatment"
    },
    {
        name: "Powdery Mildew",
        confidence: "88%",
        severity: "Mild to Moderate",
        treatment: "Apply systemic fungicide like Propiconazole 25% EC @ 1ml/L. Spray during cooler parts of the day.",
        prevention: "Maintain adequate spacing between plants, ensure good air circulation, and avoid high nitrogen fertilization.",
        organic: "Milk spray (1:10 ratio with water) or potassium bicarbonate solution (2g/L) can be effective.",
        expectedRecovery: "1-2 weeks with consistent treatment"
    },
    {
        name: "Nutrient Deficiency (Nitrogen)",
        confidence: "85%",
        severity: "Mild",
        treatment: "Apply balanced NPK fertilizer (19:19:19 @ 2g/L) as foliar spray or soil application. Follow up with urea @ 1g/L after 1 week.",
        prevention: "Regular soil testing, proper fertilization schedule, and organic matter incorporation.",
        organic: "Apply compost, vermicompost, or liquid organic fertilizers like fish emulsion.",
        expectedRecovery: "1-2 weeks, new growth will show improvement first"
    },
    {
        name: "Bacterial Leaf Spot",
        confidence: "90%",
        severity: "Moderate to High",
        treatment: "Apply copper-based bactericide (Copper hydroxide 77% WP @ 2g/L). Remove affected leaves and destroy them. Improve drainage and avoid overhead irrigation.",
        prevention: "Use pathogen-free seeds, maintain proper sanitation, and ensure good air circulation around plants.",
        organic: "Use copper soap or bordeaux mixture as organic treatment options.",
        expectedRecovery: "2-4 weeks, prevention of spread is key"
    },
    {
        name: "Viral Infection (Mosaic)",
        confidence: "87%",
        severity: "High",
        treatment: "No direct cure available. Remove infected plants immediately to prevent spread. Control vector insects (aphids, whiteflies) using insecticides.",
        prevention: "Use virus-free seeds, control insect vectors, and maintain field hygiene.",
        organic: "Use reflective mulch to deter insects and neem-based insecticides for vector control.",
        expectedRecovery: "Prevention focused - infected plants rarely recover"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadQuestions();
    loadAlerts();
    setupEventListeners();
    setupIntersectionObserver();
});

function initializeApp() {
    // Load saved theme
    const savedTheme = localStorage.getItem('agrihealth-theme') || 'light';
    setTheme(savedTheme);
    
    // Load saved language
    const savedLanguage = localStorage.getItem('agrihealth-language') || 'en';
    setLanguage(savedLanguage, false);
    
    // Show home page by default
    showPage('home');
    
    // Add loading animation to body
    document.body.classList.add('fade-in');
    
    // Preload images
    preloadImages();
}

function preloadImages() {
    const images = [
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4=',
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.feature-card, .step-item, .testimonial-card, .stat-card');
    animateElements.forEach(el => observer.observe(el));
}

function setupEventListeners() {
    // Soil form submission
    const soilForm = document.getElementById('soilForm');
    if (soilForm) {
        soilForm.addEventListener('submit', function(e) {
            e.preventDefault();
            analyzeSoil();
        });
    }

    // Question form submission
    const questionForm = document.getElementById('questionForm');
    if (questionForm) {
        questionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            postQuestion();
        });
    }

    // File upload handling
    const fileUpload = document.querySelector('.file-upload');
    if (fileUpload) {
        fileUpload.addEventListener('dragover', handleDragOver);
        fileUpload.addEventListener('dragleave', handleDragLeave);
        fileUpload.addEventListener('drop', handleDrop);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Page visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + D for dashboard
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        showPage('dashboard');
    }
    
    // Ctrl/Cmd + H for home
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        showPage('home');
    }
    
    // Ctrl/Cmd + Shift + T for theme toggle
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
    }
}

function handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
        // Refresh alerts when page becomes visible
        loadAlerts();
    }
}

// Theme Management
function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Save theme preference
    localStorage.setItem('agrihealth-theme', theme);
    
    // Add transition class for smooth theme change
    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 300);
}

// Page navigation with enhanced animations
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page with animation delay
    setTimeout(() => {
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            
            // Update URL without refresh
            window.history.pushState({page: pageId}, '', `#${pageId}`);
            
            // Scroll to top
            window.scrollTo({top: 0, behavior: 'smooth'});
            
            // Update active nav link
            updateActiveNavLink(pageId);
            
            // Page-specific initialization
            initializePage(pageId);
        }
    }, 150);
}

function updateActiveNavLink(pageId) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`.nav-links a[onclick="showPage('${pageId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function initializePage(pageId) {
    switch(pageId) {
        case 'dashboard':
            // Refresh dashboard data
            loadAlerts();
            break;
        case 'community':
            // Refresh questions
            displayQuestions();
            break;
        case 'home':
            // Restart hero animations
            restartHeroAnimations();
            break;
    }
}

function restartHeroAnimations() {
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = `float 6s ease-in-out infinite`;
            card.style.animationDelay = `${-2 * (index + 1)}s`;
        }, 100);
    });
}

// Enhanced language management
function setLanguage(lang, savePreference = true) {
    currentLanguage = lang;
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[onclick="setLanguage('${lang}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Update all translatable elements
    updateTranslations();
    
    // Save language preference
    if (savePreference) {
        localStorage.setItem('agrihealth-language', lang);
    }
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            // Handle different element types
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translations[currentLanguage][key];
            } else if (element.tagName === 'OPTION') {
                element.textContent = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });
}

// Enhanced file handling with validation
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        showMessage('Please upload a valid image file (JPG, PNG, HEIC, WebP)', 'error');
        return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        showMessage('File size too large. Please upload an image smaller than 10MB', 'error');
        return;
    }
    
    uploadedCropImage = file;
    displayImagePreview(file);
    showMessage('Image uploaded successfully!', 'success');
}

function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('dragover');
}

function handleDragLeave(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
}

function handleDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        
        // Create a synthetic event for handleFileSelect
        const syntheticEvent = {
            target: { files: [file] }
        };
        
        handleFileSelect(syntheticEvent);
        
        // Update file input
        const fileInput = document.getElementById('cropPhoto');
        if (fileInput) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInput.files = dataTransfer.files;
        }
    }
}

function displayImagePreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('cropPreview');
        if (preview) {
            preview.innerHTML = `
                <div class="image-preview-container">
                    <img src="${e.target.result}" alt="Crop Preview" class="preview-image">
                    <div class="image-info">
                        <p><strong>File:</strong> ${file.name}</p>
                        <p><strong>Size:</strong> ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        <p><strong>Type:</strong> ${file.type}</p>
                        <button class="btn secondary small" onclick="removeImage()">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `;
            preview.classList.add('bounce-in');
        }
    };
    reader.readAsDataURL(file);
}

function removeImage() {
    uploadedCropImage = null;
    const preview = document.getElementById('cropPreview');
    const fileInput = document.getElementById('cropPhoto');
    
    if (preview) preview.innerHTML = '';
    if (fileInput) fileInput.value = '';
    
    showMessage('Image removed', 'info');
}

// Enhanced crop diagnosis with detailed analysis
function diagnoseCrop() {
    if (!uploadedCropImage) {
        showMessage('Please upload a crop image first.', 'error');
        return;
    }

    const resultDiv = document.getElementById('cropResult');
    const diagnoseBtn = document.querySelector('[onclick="diagnoseCrop()"]');
    
    if (!resultDiv || !diagnoseBtn) return;

    // Show loading state
    diagnoseBtn.disabled = true;
    diagnoseBtn.innerHTML = '<div class="loading"></div> Analyzing image...';
    
    resultDiv.innerHTML = `
        <div class="analysis-progress">
            <div class="progress-header">
                <i class="fas fa-microscope"></i>
                <h4>AI Analysis in Progress</h4>
            </div>
            <div class="progress-steps">
                <div class="progress-step active">
                    <div class="step-icon"><i class="fas fa-upload"></i></div>
                    <span>Image Processing</span>
                </div>
                <div class="progress-step" id="step-features">
                    <div class="step-icon"><i class="fas fa-search"></i></div>
                    <span>Feature Extraction</span>
                </div>
                <div class="progress-step" id="step-analysis">
                    <div class="step-icon"><i class="fas fa-brain"></i></div>
                    <span>Disease Analysis</span>
                </div>
                <div class="progress-step" id="step-results">
                    <div class="step-icon"><i class="fas fa-check"></i></div>
                    <span>Results Ready</span>
                </div>
            </div>
        </div>
    `;
    resultDiv.classList.add('show');

    // Simulate AI processing steps
    setTimeout(() => {
        document.getElementById('step-features').classList.add('active');
    }, 1000);
    
    setTimeout(() => {
        document.getElementById('step-analysis').classList.add('active');
    }, 2000);
    
    setTimeout(() => {
        document.getElementById('step-results').classList.add('active');
        const diagnosis = generateCropDiagnosis();
        displayCropResult(diagnosis);
        
        // Reset button
        diagnoseBtn.disabled = false;
        diagnoseBtn.innerHTML = '<i class="fas fa-search"></i> <span>Diagnose Crop</span>';
    }, 3000);
}

function generateCropDiagnosis() {
    // Select random disease with some intelligence based on common issues
    const randomIndex = Math.floor(Math.random() * cropDiseases.length);
    const baseDiagnosis = cropDiseases[randomIndex];
    
    // Add some environmental factors
    const environmentalFactors = [
        "High humidity detected in image analysis",
        "Optimal temperature conditions for disease development",
        "Possible water stress indicators present",
        "Good overall plant health observed",
        "Some nutrient deficiency signs visible"
    ];
    
    return {
        ...baseDiagnosis,
        environmentalNotes: environmentalFactors[Math.floor(Math.random() * environmentalFactors.length)],
        additionalRecommendations: generateAdditionalRecommendations(),
        riskLevel: calculateRiskLevel(baseDiagnosis.severity),
        followUpActions: generateFollowUpActions()
    };
}

function generateAdditionalRecommendations() {
    const recommendations = [
        "Monitor weather conditions for the next 7 days",
        "Check neighboring plants for similar symptoms",
        "Maintain detailed treatment records",
        "Consider soil testing if problem persists",
        "Consult local agricultural extension officer",
        "Join our community forum for expert advice"
    ];
    
    return recommendations.slice(0, 3);
}

function calculateRiskLevel(severity) {
    const riskMap = {
        "Mild": { level: "Low", color: "#4CAF50", icon: "fas fa-check-circle" },
        "Moderate": { level: "Medium", color: "#ff9800", icon: "fas fa-exclamation-triangle" },
        "High": { level: "High", color: "#f44336", icon: "fas fa-exclamation-circle" },
        "Mild to Moderate": { level: "Medium", color: "#ff9800", icon: "fas fa-exclamation-triangle" },
        "Moderate to High": { level: "High", color: "#f44336", icon: "fas fa-exclamation-circle" }
    };
    
    return riskMap[severity] || riskMap["Medium"];
}

function generateFollowUpActions() {
    return [
        {
            action: "Re-examine crop",
            timeframe: "in 3-5 days",
            priority: "High"
        },
        {
            action: "Monitor treatment effectiveness",
            timeframe: "weekly for 1 month",
            priority: "Medium"
        },
        {
            action: "Preventive measures for next season",
            timeframe: "before next planting",
            priority: "Low"
        }
    ];
}

function displayCropResult(diagnosis) {
    const resultDiv = document.getElementById('cropResult');
    const riskLevel = diagnosis.riskLevel;
    
    resultDiv.innerHTML = `
        <div class="diagnosis-results">
            <div class="result-header">
                <div class="diagnosis-main">
                    <div class="disease-info">
                        <h3><i class="fas fa-microscope"></i> ${diagnosis.name}</h3>
                        <div class="confidence-badge">
                            <span>Confidence: ${diagnosis.confidence}</span>
                        </div>
                    </div>
                    <div class="risk-indicator" style="--risk-color: ${riskLevel.color}">
                        <i class="${riskLevel.icon}"></i>
                        <span>Risk: ${riskLevel.level}</span>
                    </div>
                </div>
                <div class="severity-info">
                    <span class="severity-label">Severity: ${diagnosis.severity}</span>
                    <span class="recovery-time">Recovery: ${diagnosis.expectedRecovery}</span>
                </div>
            </div>
            
            <div class="result-tabs">
                <button class="tab-btn active" onclick="showResultTab('treatment')">
                    <i class="fas fa-medical"></i> Treatment
                </button>
                <button class="tab-btn" onclick="showResultTab('prevention')">
                    <i class="fas fa-shield-alt"></i> Prevention
                </button>
                <button class="tab-btn" onclick="showResultTab('organic')">
                    <i class="fas fa-leaf"></i> Organic
                </button>
                <button class="tab-btn" onclick="showResultTab('followup')">
                    <i class="fas fa-calendar-check"></i> Follow-up
                </button>
            </div>
            
            <div class="tab-content">
                <div id="treatment-tab" class="result-item tab-panel active">
                    <h4><i class="fas fa-prescription-bottle-alt"></i> Recommended Treatment</h4>
                    <p>${diagnosis.treatment}</p>
                    <div class="environmental-note">
                        <i class="fas fa-info-circle"></i>
                        <span>${diagnosis.environmentalNotes}</span>
                    </div>
                </div>
                
                <div id="prevention-tab" class="result-item tab-panel">
                    <h4><i class="fas fa-shield-alt"></i> Prevention Strategies</h4>
                    <p>${diagnosis.prevention}</p>
                    <div class="additional-recommendations">
                        <h5>Additional Recommendations:</h5>
                        <ul>
                            ${diagnosis.additionalRecommendations.map(rec => `<li>${rec}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div id="organic-tab" class="result-item tab-panel">
                    <h4><i class="fas fa-leaf"></i> Organic Treatment Options</h4>
                    <p>${diagnosis.organic}</p>
                    <div class="organic-note">
                        <i class="fas fa-seedling"></i>
                        <span>Organic treatments may take longer but are environmentally friendly</span>
                    </div>
                </div>
                
                <div id="followup-tab" class="result-item tab-panel">
                    <h4><i class="fas fa-calendar-check"></i> Follow-up Actions</h4>
                    <div class="followup-actions">
                        ${diagnosis.followUpActions.map(action => `
                            <div class="followup-item priority-${action.priority.toLowerCase()}">
                                <div class="action-details">
                                    <strong>${action.action}</strong>
                                    <span class="timeframe">${action.timeframe}</span>
                                </div>
                                <span class="priority-badge">${action.priority}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="result-actions">
                <button class="btn primary" onclick="saveDiagnosis()">
                    <i class="fas fa-save"></i> Save Report
                </button>
                <button class="btn secondary" onclick="shareResults()">
                    <i class="fas fa-share-alt"></i> Share with Expert
                </button>
                <button class="btn secondary" onclick="showPage('community')">
                    <i class="fas fa-comments"></i> Ask Community
                </button>
            </div>
        </div>
    `;
    
    // Add animation
    resultDiv.classList.add('bounce-in');
}

function showResultTab(tabName) {
    // Hide all tab panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab panel
    const targetPanel = document.getElementById(`${tabName}-tab`);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
    
    // Add active class to clicked tab button
    event.target.closest('.tab-btn').classList.add('active');
}

function saveDiagnosis() {
    showMessage('Diagnosis report saved to your dashboard!', 'success');
    // In real app, this would save to user's account/local storage
}

function shareResults() {
    showMessage('Results shared with agricultural experts. You will receive feedback within 24 hours.', 'success');
    // In real app, this would share with expert network
}

// Enhanced soil analysis with detailed recommendations
function analyzeSoil() {
    const ph = parseFloat(document.getElementById('soilPH').value);
    const moisture = parseInt(document.getElementById('moisture').value);
    const fertility = document.getElementById('fertility').value;
    const location = document.getElementById('location').value;

    // Enhanced validation
    if (!ph || !moisture || !fertility) {
        showMessage('Please fill in all soil parameters.', 'error');
        return;
    }
    
    if (ph < 0 || ph > 14) {
        showMessage('pH value must be between 0 and 14.', 'error');
        return;
    }
    
    if (moisture < 0 || moisture > 100) {
        showMessage('Moisture level must be between 0 and 100%.', 'error');
        return;
    }

    const resultDiv = document.getElementById('soilResult');
    const analyzeBtn = document.querySelector('#soilForm button[type="submit"]');
    
    if (!resultDiv || !analyzeBtn) return;

    // Show loading state
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<div class="loading"></div> Analyzing soil...';
    
    resultDiv.innerHTML = `
        <div class="soil-analysis-progress">
            <div class="analysis-steps">
                <div class="analysis-step active">
                    <i class="fas fa-vial"></i>
                    <span>Processing Parameters</span>
                </div>
                <div class="analysis-step">
                    <i class="fas fa-calculator"></i>
                    <span>Calculating Recommendations</span>
                </div>
                <div class="analysis-step">
                    <i class="fas fa-seedling"></i>
                    <span>Generating Crop Suggestions</span>
                </div>
            </div>
        </div>
    `;
    resultDiv.classList.add('show');

    setTimeout(() => {
        const analysis = generateEnhancedSoilAnalysis(ph, moisture, fertility, location);
        displaySoilResult(analysis);
        
        // Reset button
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<i class="fas fa-chart-line"></i> <span>Analyze Soil</span>';
    }, 2000);
}

function generateEnhancedSoilAnalysis(ph, moisture, fertility, location) {
    let recommendations = [];
    let suitableCrops = [];
    let fertilizers = [];
    let warnings = [];
    let soilScore = 100;

    // Enhanced pH analysis
    if (ph < 5.5) {
        recommendations.push("Soil is strongly acidic. Apply agricultural lime (CaCO₃) @ 2-3 tons/acre to raise pH.");
        recommendations.push("Consider adding wood ash or bone meal as natural pH buffers.");
        suitableCrops.push("Blueberries", "Cranberries", "Azaleas", "Potatoes");
        fertilizers.push("Use alkaline fertilizers like calcium nitrate");
        warnings.push("Aluminum toxicity may be present - test for aluminum levels");
        soilScore -= 25;
    } else if (ph < 6.0) {
        recommendations.push("Soil is moderately acidic. Light liming @ 1-2 tons/acre recommended.");
        suitableCrops.push("Sweet Potatoes", "Carrots", "Radishes", "Tomatoes");
        soilScore -= 10;
    } else if (ph > 8.5) {
        recommendations.push("Soil is strongly alkaline. Apply sulfur @ 500-1000 kg/acre or organic matter.");
        recommendations.push("Use acidifying fertilizers like ammonium sulfate.");
        suitableCrops.push("Cabbage", "Spinach", "Asparagus", "Sugar Beets");
        fertilizers.push("Ammonium sulfate", "Sulfur-coated urea");
        warnings.push("Iron and zinc deficiency likely - consider chelated micronutrients");
        soilScore -= 20;
    } else if (ph > 7.5) {
        recommendations.push("Soil is moderately alkaline. Add organic compost to buffer pH.");
        suitableCrops.push("Lettuce", "Onions", "Peas", "Beans");
        soilScore -= 5;
    } else {
        recommendations.push("Excellent pH level! Optimal for most crop production.");
        suitableCrops.push("Tomatoes", "Corn", "Wheat", "Rice", "Soybeans", "Cotton");
    }

    // Enhanced moisture analysis
    if (moisture < 20) {
        recommendations.push("Critical moisture deficit. Immediate irrigation required.");
        recommendations.push("Install drip irrigation system for water efficiency.");
        warnings.push("Crop stress imminent - emergency watering needed");
        soilScore -= 30;
    } else if (moisture < 30) {
        recommendations.push("Low soil moisture. Increase irrigation frequency.");
        recommendations.push("Apply mulch to reduce water evaporation.");
        soilScore -= 15;
    } else if (moisture > 80) {
        recommendations.push("Excessive moisture detected. Improve field drainage immediately.");
        recommendations.push("Create drainage channels or install tile drains.");
        warnings.push("Root rot and fungal disease risk is high");
        soilScore -= 25;
    } else if (moisture > 70) {
        recommendations.push("High moisture levels. Monitor for waterlogging issues.");
        recommendations.push("Avoid heavy machinery to prevent soil compaction.");
        soilScore -= 10;
    } else {
        recommendations.push("Optimal moisture levels for healthy plant growth.");
    }

    // Enhanced fertility analysis
    switch(fertility) {
        case 'low':
            recommendations.push("Low fertility requires immediate nutrient supplementation.");
            recommendations.push("Apply 10-10-10 NPK fertilizer @ 200-300 kg/acre.");
            recommendations.push("Incorporate 5-10 tons of organic compost per acre.");
            fertilizers.push("NPK 10:10:10", "Vermicompost", "Cow dung manure");
            soilScore -= 20;
            break;
        case 'medium':
            recommendations.push("Moderate fertility. Maintain with balanced fertilization.");
            recommendations.push("Apply NPK 20:20:20 @ 150-200 kg/acre seasonally.");
            fertilizers.push("NPK 20:20:20", "Organic compost");
            soilScore -= 5;
            break;
        case 'high':
            recommendations.push("Excellent fertility! Focus on maintenance and micronutrients.");
            recommendations.push("Apply micronutrient mix (Zn, B, Fe) @ 25 kg/acre.");
            fertilizers.push("Micronutrient mixture", "Light organic matter");
            break;
    }

    // Location-based recommendations
    if (location) {
        recommendations.push(`Location-specific advice: Consider local climate patterns for ${location}.`);
        recommendations.push("Consult local agricultural extension services for region-specific varieties.");
    }

    return {
        ph: ph,
        moisture: moisture,
        fertility: fertility,
        location: location,
        recommendations: recommendations,
        suitableCrops: suitableCrops,
        fertilizers: fertilizers,
        warnings: warnings,
        soilScore: Math.max(soilScore, 0),
        phCategory: categorizePH(ph),
        moistureCategory: categorizeMoisture(moisture),
        nextSteps: generateSoilNextSteps(),
        seasonalAdvice: generateSeasonalAdvice()
    };
}

function categorizePH(ph) {
    if (ph < 5.5) return { label: "Strongly Acidic", color: "#f44336", icon: "fas fa-exclamation-triangle" };
    if (ph < 6.0) return { label: "Moderately Acidic", color: "#ff9800", icon: "fas fa-minus-circle" };
    if (ph < 6.5) return { label: "Slightly Acidic", color: "#ffc107", icon: "fas fa-info-circle" };
    if (ph <= 7.5) return { label: "Optimal", color: "#4CAF50", icon: "fas fa-check-circle" };
    if (ph <= 8.0) return { label: "Slightly Alkaline", color: "#ffc107", icon: "fas fa-info-circle" };
    if (ph <= 8.5) return { label: "Moderately Alkaline", color: "#ff9800", icon: "fas fa-plus-circle" };
    return { label: "Strongly Alkaline", color: "#f44336", icon: "fas fa-exclamation-triangle" };
}

function categorizeMoisture(moisture) {
    if (moisture < 20) return { label: "Critical Low", color: "#f44336", icon: "fas fa-exclamation-triangle" };
    if (moisture < 30) return { label: "Low", color: "#ff9800", icon: "fas fa-tint-slash" };
    if (moisture < 40) return { label: "Below Optimal", color: "#ffc107", icon: "fas fa-tint" };
    if (moisture <= 60) return { label: "Optimal", color: "#4CAF50", icon: "fas fa-check-circle" };
    if (moisture <= 70) return { label: "Above Optimal", color: "#ffc107", icon: "fas fa-tint" };
    if (moisture <= 80) return { label: "High", color: "#ff9800", icon: "fas fa-water" };
    return { label: "Excessive", color: "#f44336", icon: "fas fa-exclamation-triangle" };
}

function generateSoilNextSteps() {
    return [
        {
            step: "Soil Testing",
            description: "Conduct detailed NPK and micronutrient analysis",
            timeframe: "Within 1 week",
            priority: "High"
        },
        {
            step: "Amendment Application",
            description: "Apply recommended soil amendments",
            timeframe: "Before next planting",
            priority: "High"
        },
        {
            step: "Monitor Progress",
            description: "Re-test soil after amendments",
            timeframe: "After 30 days",
            priority: "Medium"
        }
    ];
}

function generateSeasonalAdvice() {
    const currentMonth = new Date().getMonth();
    const seasons = {
        winter: "Focus on soil preparation and organic matter incorporation. Ideal time for lime application.",
        spring: "Perfect for planting and fertilizer application. Monitor soil temperature.",
        summer: "Maintain adequate moisture. Apply mulch to conserve water.",
        autumn: "Harvest time and soil preparation for next season. Apply compost."
    };
    
    let season = 'spring'; // Default
    if (currentMonth >= 11 || currentMonth <= 1) season = 'winter';
    else if (currentMonth >= 2 && currentMonth <= 4) season = 'spring';
    else if (currentMonth >= 5 && currentMonth <= 8) season = 'summer';
    else season = 'autumn';
    
    return seasons[season];
}

function displaySoilResult(analysis) {
    const resultDiv = document.getElementById('soilResult');
    const phCategory = analysis.phCategory;
    const moistureCategory = analysis.moistureCategory;
    
    resultDiv.innerHTML = `
        <div class="soil-results">
            <div class="soil-score-card">
                <div class="score-circle">
                    <div class="score-number">${analysis.soilScore}</div>
                    <div class="score-label">Soil Health Score</div>
                </div>
                <div class="score-indicators">
                    <div class="indicator">
                        <i class="${phCategory.icon}" style="color: ${phCategory.color}"></i>
                        <span>pH: ${phCategory.label}</span>
                    </div>
                    <div class="indicator">
                        <i class="${moistureCategory.icon}" style="color: ${moistureCategory.color}"></i>
                        <span>Moisture: ${moistureCategory.label}</span>
                    </div>
                    <div class="indicator">
                        <i class="fas fa-seedling" style="color: #4CAF50"></i>
                        <span>Fertility: ${analysis.fertility.charAt(0).toUpperCase() + analysis.fertility.slice(1)}</span>
                    </div>
                </div>
            </div>
            
            <div class="soil-analysis-tabs">
                <button class="tab-btn active" onclick="showSoilTab('overview')">
                    <i class="fas fa-chart-pie"></i> Overview
                </button>
                <button class="tab-btn" onclick="showSoilTab('recommendations')">
                    <i class="fas fa-lightbulb"></i> Recommendations
                </button>
                <button class="tab-btn" onclick="showSoilTab('crops')">
                    <i class="fas fa-seedling"></i> Suitable Crops
                </button>
                <button class="tab-btn" onclick="showSoilTab('fertilizers')">
                    <i class="fas fa-flask"></i> Fertilizers
                </button>
            </div>
            
            <div class="soil-tab-content">
                <div id="overview-tab" class="soil-tab-panel active">
                    <div class="parameter-cards">
                        <div class="parameter-card">
                            <div class="param-header">
                                <i class="fas fa-balance-scale"></i>
                                <h4>pH Level</h4>
                            </div>
                            <div class="param-value">${analysis.ph}</div>
                            <div class="param-status" style="color: ${phCategory.color}">
                                <i class="${phCategory.icon}"></i>
                                ${phCategory.label}
                            </div>
                            <div class="param-range">
                                <span>Optimal Range: 6.0 - 7.5</span>
                            </div>
                        </div>
                        
                        <div class="parameter-card">
                            <div class="param-header">
                                <i class="fas fa-tint"></i>
                                <h4>Moisture</h4>
                            </div>
                            <div class="param-value">${analysis.moisture}%</div>
                            <div class="param-status" style="color: ${moistureCategory.color}">
                                <i class="${moistureCategory.icon}"></i>
                                ${moistureCategory.label}
                            </div>
                            <div class="param-range">
                                <span>Optimal Range: 40% - 60%</span>
                            </div>
                        </div>
                        
                        <div class="parameter-card">
                            <div class="param-header">
                                <i class="fas fa-leaf"></i>
                                <h4>Fertility</h4>
                            </div>
                            <div class="param-value">${analysis.fertility.charAt(0).toUpperCase() + analysis.fertility.slice(1)}</div>
                            <div class="param-status">
                                <i class="fas fa-info-circle"></i>
                                Nutrient Availability
                            </div>
                        </div>
                    </div>
                    
                    ${analysis.warnings.length > 0 ? `
                        <div class="warnings-section">
                            <h4><i class="fas fa-exclamation-triangle"></i> Important Warnings</h4>
                            <ul>
                                ${analysis.warnings.map(warning => `<li>${warning}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    <div class="seasonal-advice">
                        <h4><i class="fas fa-calendar-alt"></i> Seasonal Advice</h4>
                        <p>${analysis.seasonalAdvice}</p>
                    </div>
                </div>
                
                <div id="recommendations-tab" class="soil-tab-panel">
                    <div class="recommendations-list">
                        ${analysis.recommendations.map((rec, index) => `
                            <div class="recommendation-item">
                                <div class="rec-number">${index + 1}</div>
                                <div class="rec-content">
                                    <p>${rec}</p>
                                </div>
                                <div class="rec-priority">
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="next-steps">
                        <h4><i class="fas fa-tasks"></i> Next Steps</h4>
                        <div class="steps-timeline">
                            ${analysis.nextSteps.map(step => `
                                <div class="timeline-item priority-${step.priority.toLowerCase()}">
                                    <div class="timeline-marker"></div>
                                    <div class="timeline-content">
                                        <h5>${step.step}</h5>
                                        <p>${step.description}</p>
                                        <div class="timeline-meta">
                                            <span class="timeframe">${step.timeframe}</span>
                                            <span class="priority-badge">${step.priority}</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div id="crops-tab" class="soil-tab-panel">
                    <h4><i class="fas fa-seedling"></i> Recommended Crops</h4>
                    <div class="crops-grid">
                        ${analysis.suitableCrops.map(crop => `
                            <div class="crop-card">
                                <div class="crop-name">${crop}</div>
                                <div class="crop-suitability">
                                    <div class="suitability-bar">
                                        <div class="suitability-fill" style="width: ${85 + Math.random() * 15}%"></div>
                                    </div>
                                    <span>Highly Suitable</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="crop-calendar">
                        <h4><i class="fas fa-calendar"></i> Planting Calendar</h4>
                        <p>Based on your soil conditions and location, here are the optimal planting times for recommended crops.</p>
                        <div class="calendar-note">
                            <i class="fas fa-info-circle"></i>
                            <span>Consult local agricultural extension for precise timing in your area.</span>
                        </div>
                    </div>
                </div>
                
                <div id="fertilizers-tab" class="soil-tab-panel">
                    <h4><i class="fas fa-flask"></i> Recommended Fertilizers</h4>
                    <div class="fertilizer-recommendations">
                        ${analysis.fertilizers.map(fertilizer => `
                            <div class="fertilizer-item">
                                <div class="fertilizer-icon">
                                    <i class="fas fa-vial"></i>
                                </div>
                                <div class="fertilizer-details">
                                    <h5>${fertilizer}</h5>
                                    <p>Application rate and timing based on soil test results</p>
                                </div>
                                <div class="fertilizer-priority">
                                    <span class="priority-high">Recommended</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="application-tips">
                        <h4><i class="fas fa-tools"></i> Application Tips</h4>
                        <ul>
                            <li>Apply fertilizers during cool morning or evening hours</li>
                            <li>Ensure adequate soil moisture before application</li>
                            <li>Follow manufacturer's recommendations for dosage</li>
                            <li>Consider split applications for better nutrient utilization</li>
                            <li>Test soil every 6 months to monitor progress</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="soil-actions">
                <button class="btn primary" onclick="saveSoilAnalysis()">
                    <i class="fas fa-save"></i> Save Analysis
                </button>
                <button class="btn secondary" onclick="exportSoilReport()">
                    <i class="fas fa-download"></i> Export Report
                </button>
                <button class="btn secondary" onclick="shareWithExpert()">
                    <i class="fas fa-user-tie"></i> Consult Expert
                </button>
            </div>
        </div>
    `;
    
    // Add animation
    resultDiv.classList.add('bounce-in');
}

function showSoilTab(tabName) {
    // Hide all tab panels
    document.querySelectorAll('.soil-tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.soil-analysis-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab panel
    const targetPanel = document.getElementById(`${tabName}-tab`);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
    
    // Add active class to clicked tab button
    event.target.closest('.tab-btn').classList.add('active');
}

function saveSoilAnalysis() {
    showMessage('Soil analysis saved to your dashboard!', 'success');
}

function exportSoilReport() {
    showMessage('Soil analysis report exported successfully!', 'success');
}

function shareWithExpert() {
    showMessage('Analysis shared with soil health experts. You will receive feedback within 24 hours.', 'success');
}

// Enhanced community functions
function loadQuestions() {
    questions = [...sampleQuestions];
    filteredQuestions = [...questions];
    displayQuestions();
}

function displayQuestions() {
    const questionsContainer = document.getElementById('questionsList');
    if (!questionsContainer) return;

    if (filteredQuestions.length === 0) {
        questionsContainer.innerHTML = `
            <div class="no-questions">
                <i class="fas fa-comment-slash"></i>
                <h3>No questions found</h3>
                <p>Be the first to ask a question in this category!</p>
                <button class="btn primary" onclick="document.getElementById('questionTitle').focus()">
                    <i class="fas fa-plus"></i> Ask Question
                </button>
            </div>
        `;
        return;
    }

    questionsContainer.innerHTML = filteredQuestions.map(question => `
        <div class="question-item" data-category="${question.category}">
            <div class="question-header">
                <div class="question-title">${question.title}</div>
                <div class="question-actions">
                    <button class="action-btn" onclick="upvoteQuestion(${question.id})" title="Upvote">
                        <i class="fas fa-arrow-up"></i>
                    </button>
                    <button class="action-btn" onclick="shareQuestion(${question.id})" title="Share">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
            <div class="question-description">${question.description}</div>
            <div class="question-meta">
                <div class="question-info">
                    <span class="category-tag category-${question.category}">${question.category}</span>
                    <span class="author">by ${question.author}</span>
                    <span class="location">${question.location || ''}</span>
                    <span class="timestamp">${question.timestamp}</span>
                </div>
                <div class="question-stats">
                    <span class="stat-item">
                        <i class="fas fa-thumbs-up"></i> ${question.upvotes}
                    </span>
                    <span class="stat-item">
                        <i class="fas fa-comments"></i> ${question.replies}
                    </span>
                    <button class="btn secondary small" onclick="viewQuestion(${question.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add stagger animation
    const questionItems = document.querySelectorAll('.question-item');
    questionItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('slide-up');
        }, index * 100);
    });
}

function filterQuestions(category) {
    currentFilter = category;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter questions
    if (category === 'all') {
        filteredQuestions = [...questions];
    } else {
        filteredQuestions = questions.filter(q => q.category === category);
    }
    
    displayQuestions();
}

function postQuestion() {
    const title = document.getElementById('questionTitle').value;
    const description = document.getElementById('questionDescription').value;
    const category = document.getElementById('questionCategory').value;

    if (!title || !description) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    if (title.length < 10) {
        showMessage('Question title must be at least 10 characters long.', 'error');
        return;
    }

    if (description.length < 20) {
        showMessage('Question description must be at least 20 characters long.', 'error');
        return;
    }

    const newQuestion = {
        id: questions.length + 1,
        title: title,
        description: description,
        category: category,
        author: "You",
        location: "Your Location",
        timestamp: "Just now",
        replies: 0,
        upvotes: 0
    };

    questions.unshift(newQuestion);
    
    // Update filtered questions if current filter matches
    if (currentFilter === 'all' || currentFilter === category) {
        filteredQuestions.unshift(newQuestion);
    }
    
    displayQuestions();
    
    // Clear form with animation
    const form = document.getElementById('questionForm');
    form.classList.add('form-success');
    setTimeout(() => {
        form.reset();
        form.classList.remove('form-success');
    }, 1000);
    
    showMessage('Question posted successfully! Our community will help you soon.', 'success');
    
    // Scroll to questions list
    document.getElementById('questionsList').scrollIntoView({ behavior: 'smooth' });
}

function upvoteQuestion(questionId) {
    const question = questions.find(q => q.id === questionId);
    if (question) {
        question.upvotes += 1;
        displayQuestions();
        showMessage('Question upvoted!', 'success');
    }
}

function shareQuestion(questionId) {
    const question = questions.find(q => q.id === questionId);
    if (question) {
        // In real app, this would open share dialog
        showMessage('Question link copied to clipboard!', 'success');
    }
}

function viewQuestion(questionId) {
    const question = questions.find(q => q.id === questionId);
    if (question) {
        // In real app, this would open detailed question view
        showMessage('Opening detailed question view...', 'info');
    }
}

// Enhanced alerts functions
function loadAlerts() {
    const alertsContainer = document.getElementById('alertsList');
    if (!alertsContainer) return;

    // Sort alerts by priority and recency
    const sortedAlerts = [...sampleAlerts].sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    alertsContainer.innerHTML = sortedAlerts.map(alert => `
        <div class="alert-item ${alert.type} priority-${alert.priority}" data-priority="${alert.priority}">
            <div class="alert-header">
                <div class="alert-icon">
                    <i class="fas ${getAlertIcon(alert.type)}"></i>
                </div>
                <div class="alert-title">
                    <h4>${alert.title}</h4>
                    <span class="priority-indicator priority-${alert.priority}">${alert.priority} priority</span>
                </div>
                <div class="alert-actions">
                    <button class="alert-action-btn" onclick="markAsRead(this)" title="Mark as read">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="alert-action-btn" onclick="dismissAlert(this)" title="Dismiss">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="alert-content">
                <p>${alert.message}</p>
                <div class="alert-meta">
                    <span class="timestamp">
                        <i class="fas fa-clock"></i> ${alert.timestamp}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add notification sound for high priority alerts (in real app)
    const highPriorityAlerts = sortedAlerts.filter(alert => alert.priority === 'high').length;
    if (highPriorityAlerts > 0) {
        // In real app: playNotificationSound();
    }
}

function getAlertIcon(type) {
    const icons = {
        weather: 'fa-cloud-rain',
        scheme: 'fa-bullhorn',
        reminder: 'fa-bell'
    };
    return icons[type] || 'fa-info-circle';
}

function markAsRead(button) {
    const alertItem = button.closest('.alert-item');
    alertItem.classList.add('read');
    showMessage('Alert marked as read', 'success');
}

function dismissAlert(button) {
    const alertItem = button.closest('.alert-item');
    alertItem.style.animation = 'slideOutRight 0.3s ease-forward';
    setTimeout(() => {
        alertItem.remove();
    }, 300);
    showMessage('Alert dismissed', 'info');
}

// Utility functions with enhancements
function showMessage(message, type = 'info', duration = 5000) {
    // Remove existing messages
    document.querySelectorAll('.message-toast').forEach(msg => msg.remove());
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-toast ${type}-message`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fas ${getMessageIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="message-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to body
    document.body.appendChild(messageDiv);
    
    // Animate in
    setTimeout(() => messageDiv.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
        messageDiv.classList.add('hide');
        setTimeout(() => messageDiv.remove(), 300);
    }, duration);
}

function getMessageIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || 'fa-info-circle';
}

function handleGoogleLogin() {
    showMessage('Google login integration coming soon! 🚀', 'info');
    // In real app: implement Google OAuth
}

// Export functions for global access
window.showPage = showPage;
window.setLanguage = setLanguage;
window.toggleTheme = toggleTheme;
window.handleFileSelect = handleFileSelect;
window.handleDrop = handleDrop;
window.handleDragOver = handleDragOver;
window.diagnoseCrop = diagnoseCrop;
window.analyzeSoil = analyzeSoil;
window.postQuestion = postQuestion;
window.filterQuestions = filterQuestions;
window.handleGoogleLogin = handleGoogleLogin;
window.showResultTab = showResultTab;
window.showSoilTab = showSoilTab;
window.upvoteQuestion = upvoteQuestion;
window.shareQuestion = shareQuestion;
window.viewQuestion = viewQuestion;
window.markAsRead = markAsRead;
window.dismissAlert = dismissAlert;
window.saveDiagnosis = saveDiagnosis;
window.shareResults = shareResults;
window.saveSoilAnalysis = saveSoilAnalysis;
window.exportSoilReport = exportSoilReport;
window.shareWithExpert = shareWithExpert;
window.removeImage = removeImage;