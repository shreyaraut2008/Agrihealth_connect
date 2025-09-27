# AgriHealth Connect

An AI-powered crop and soil health assistant designed to help farmers make informed decisions about their agricultural practices. The platform provides instant crop disease diagnosis, soil health analysis, and a community platform for knowledge sharing.

## Features

### 🌱 Crop Doctor
- **Image-based Disease Detection**: Upload crop photos to get AI-powered disease diagnosis
- **Treatment Recommendations**: Receive specific treatment and prevention advice
- **Confidence Scoring**: Get reliability scores for diagnoses

### 🌍 Soil Health Analysis
- **Multi-parameter Analysis**: Analyze soil pH, moisture levels, and fertility
- **Crop Recommendations**: Get suggestions for suitable crops based on soil conditions
- **Location-based Insights**: Tailored advice based on geographical location

### 👥 Community Platform
- **Knowledge Sharing**: Connect with fellow farmers and agricultural experts
- **Q&A Forum**: Ask questions and get answers from the community
- **Category-based Organization**: Questions organized by crops, soil, pests, weather, and general topics

### 🔔 Smart Alerts
- **Weather Updates**: Real-time weather alerts and forecasts
- **Scheme Notifications**: Updates about government agricultural schemes
- **Farming Reminders**: Scheduled notifications for farming activities

### 🌐 Multilingual Support
- **Multiple Languages**: Available in English, Hindi (हिं), and Marathi (मर)
- **Cultural Adaptation**: Content adapted for regional farming practices

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: CSS Grid, Flexbox, CSS Animations
- **File Handling**: FileReader API for image processing
- **Responsive Design**: Mobile-first approach with media queries
- **Data Storage**: Client-side JavaScript objects (localStorage not used due to platform limitations)

## Project Structure

```
AgriHealth-Connect/
│
├── index.html          # Main HTML file with all pages
├── styles.css          # Complete styling and responsive design
├── script.js           # JavaScript functionality and logic
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/agrihealth-connect.git
   cd agrihealth-connect
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your preferred browser
   # Or use a local server for better development experience
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Start using the application**
   - No build process required
   - All functionality works offline

## Usage

### Crop Disease Diagnosis

1. Navigate to the Dashboard
2. Click on the Crop Doctor section
3. Upload an image of the affected crop by:
   - Clicking the upload area
   - Dragging and dropping an image file
4. Click "Diagnose Crop" to get AI-powered analysis
5. Review the diagnosis, treatment recommendations, and prevention tips

### Soil Health Analysis

1. Go to the Soil Health Analysis section
2. Enter the required parameters:
   - Soil pH (0-14 scale)
   - Moisture level (percentage)
   - Fertility level (Low/Medium/High)
   - Location information
3. Click "Analyze Soil"
4. Review the analysis and crop recommendations

### Community Participation

1. Visit the Community page
2. Browse existing questions or ask a new one
3. Fill in the question form with:
   - Question title
   - Detailed description
   - Relevant category
4. Submit to share with the community

## Features in Detail

### AI-Powered Diagnosis
- Simulated AI analysis with realistic disease identification
- Confidence scoring for diagnosis reliability
- Treatment and prevention recommendations

### Responsive Design
- Mobile-first approach
- Optimized for tablets and desktop
- Touch-friendly interface elements

### User Experience
- Smooth animations and transitions
- Intuitive drag-and-drop file upload
- Loading states and user feedback
- Error handling and validation

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatible
- High contrast design elements

## Browser Compatibility

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

## Development

### Code Structure

**HTML (index.html)**
- Single-page application with multiple sections
- Semantic HTML5 structure
- Accessibility-friendly markup

**CSS (styles.css)**
- Modern CSS with Grid and Flexbox
- CSS custom properties for theming
- Responsive design patterns
- Smooth animations and transitions

**JavaScript (script.js)**
- Vanilla JavaScript (no frameworks)
- Modular function organization
- Event-driven architecture
- Local state management

### Key Functions

```javascript
// Core functionality
showPage(pageId)           // Navigation between pages
setLanguage(lang)          // Language switching
diagnoseCrop()             // Crop disease analysis
analyzeSoil()              // Soil health analysis
postQuestion()             // Community interaction
```

### Styling Approach

- **CSS Grid**: Layout structure
- **Flexbox**: Component alignment
- **CSS Variables**: Consistent theming
- **Media Queries**: Responsive breakpoints
- **Animations**: Enhanced user experience

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

### Development Guidelines

- Follow semantic HTML practices
- Maintain responsive design principles
- Ensure cross-browser compatibility
- Write clean, commented JavaScript
- Test on multiple devices and browsers

## Future Enhancements

### Planned Features
- **Real AI Integration**: Connect with actual machine learning APIs
- **User Authentication**: Google OAuth and profile management
- **Data Persistence**: Backend database integration
- **Advanced Analytics**: Detailed farming insights and reports
- **Weather API Integration**: Real-time weather data
- **Mobile App**: Native iOS and Android applications
- **Offline Functionality**: Progressive Web App capabilities

### Technical Improvements
- **Backend Development**: Node.js/Python backend
- **Database Integration**: MongoDB/PostgreSQL for data storage
- **API Development**: RESTful APIs for data management
- **Testing Framework**: Unit and integration tests
- **CI/CD Pipeline**: Automated deployment process

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@agrihealth-connect.com or join our community forum.

## Acknowledgments

- Inspired by the need to support small-scale farmers
- Built with modern web technologies
- Designed for accessibility and usability
- Community-driven development approach

---

**Note**: This is a prototype/demo application. The AI diagnosis features are simulated and should not replace professional agricultural advice for production use.



