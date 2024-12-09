# 🎯 QuizMapper.js - Advanced React Quiz System

<div align="center">


A sophisticated quiz system built with React, featuring intelligent result mapping, stunning animations, and seamless form integration.

[View Demo](https://webpixelle3.netlify.app/quiz-select) • [Tutorial](https://aliceleiserblog.netlify.app/blog/building-interactive-quiz-system-react)

![QuizMapper Demo](https://raw.githubusercontent.com/username/quizmapper/main/demo.gif)

</div>

## ✨ Features

- 🎨 **Beautiful UI Components** - Pre-built, customizable components with Framer Motion animations
- 🧠 **Intelligent Result Mapping** - Advanced algorithm for accurate quiz result analysis
- 📱 **Responsive Design** - Seamless experience across all devices
- 🔄 **Progress Tracking** - Built-in progress indicators and section navigation
- 🎯 **Customizable Scoring** - Flexible scoring system with weightings and indicators
- 📋 **Form Integration** - Seamless integration with contact/lead forms
- 🌈 **Theme Customization** - Easy styling with Tailwind CSS
- 🔌 **Plugin System** - Extensible architecture for custom functionality

## 📦 Installation


```bash
git clone https://github.com/AliKelDev/QuizMapperJS
cd quiz-mapper
```

### 2. Install Dependencies
First, install the required dependencies in your React project:

```bash
npm install react-router-dom framer-motion lucide-react
# or
yarn add react-router-dom framer-motion lucide-react
# or
pnpm add react-router-dom framer-motion lucide-react
```

### 3. Copy Required Files
Copy the following files from the repository to your project:

```plaintext
src/
├── components/
│   ├── QuizSystem/
│   │   ├── DetailedQuizPage.jsx
│   │   └── ContactPage.jsx
├── utils/
│   └── quiz/
│       └── QuizMapperSystem.js
```

### 4. Setup Required Routes
In your `App.jsx` or routing configuration:

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DetailedQuizPage } from './components/QuizSystem/DetailedQuizPage';
import { ContactPage } from './components/QuizSystem/ContactPage';

function App() {
  return (
    
      
        } />
        } />
      
    
  );
}
```

### 5. Set Up Contact Form Integration

Create a contact form component (`ContactPage.jsx`):

```jsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ContactForm } from 'quizmapper';

export function ContactPage() {
  const location = useLocation();
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    if (location.state?.quizResult) {
      setQuizData(location.state.quizResult);
    }
  }, [location.state]);

  return (
    <ContactForm
      quizData={quizData}
      onSubmit={handleSubmit}
      fields={[
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        // Add more fields...
      ]}
    />
  );
}
```

## 🎨 Customization

### Theme Customization

Create a custom theme file (`theme.js`):

```javascript
export const customTheme = {
  colors: {
    primary: {
      50: '#f0f9ff',
      500: '#0ea5e9',
      900: '#0c4a6e'
    },
    // Add more color values...
  },
  fonts: {
    heading: '"Cal Sans", sans-serif',
    body: '"Inter", sans-serif'
  },
  animations: {
    transition: 'all 0.3s ease-in-out',
    hover: 'transform 0.2s ease'
  }
};
```

Apply the custom theme:

```jsx
<QuizSystem
  theme={customTheme}
  // ... other props
/>
```

### Styling Components

You can style individual components using Tailwind CSS classes:

```jsx
<QuizSystem
  className="my-custom-quiz"
  containerClass="max-w-4xl mx-auto"
  questionClass="bg-slate-900 p-6 rounded-xl"
  optionClass="hover:bg-blue-500"
/>
```

## 🔧 Advanced Configuration

### Custom Scoring Logic

Create a custom scoring function:

```javascript
function customScoringLogic(answers, weights) {
  // Your custom scoring implementation
  return {
    scores: calculatedScores,
    indicators: detectedIndicators
  };
}

<QuizSystem
  scoringLogic={customScoringLogic}
  // ... other props
/>
```

### Progress Persistence

Enable progress saving:

```jsx
<QuizSystem
  persistProgress={true}
  storageKey="quiz_progress"
  // ... other props
/>
```

### Custom Result Processing

Create custom result processors for specific business logic:

```javascript
const resultProcessor = {
  process: (rawResults) => {
    const { scores, indicators } = rawResults;
    
    // Custom processing logic
    const processedResults = {
      recommendedPackage: scores.business > 0.7 ? 'enterprise' : 'starter',
      estimatedTimeframe: calculateTimeframe(scores),
      suggestedFeatures: getSuggestedFeatures(indicators)
    };
    
    return processedResults;
  }
};

<QuizSystem
  resultProcessor={resultProcessor}
  // ... other props
/>
```

## 📚 API Reference

### Core Components

#### `<QuizSystem>`

Main quiz component that orchestrates the entire quiz experience.

```typescript
interface QuizSystemProps {
  sections: QuizSection[];
  settings?: QuizSettings;
  resultMapping?: ResultMapping;
  theme?: ThemeConfig;
  onComplete?: (results: QuizResults) => void;
  onSectionComplete?: (sectionIndex: number, answers: Answer[]) => void;
  className?: string;
  persistProgress?: boolean;
  storageKey?: string;
  scoringLogic?: ScoringFunction;
  resultProcessor?: ResultProcessor;
  isSubmitting?: boolean;
}
```

#### `<QuizSection>`

Individual section component with its questions and options.

```typescript
interface QuizSectionProps {
  title: string;
  icon?: React.ComponentType;
  description?: string;
  questions: Question[];
  onComplete?: (answers: Answer[]) => void;
  className?: string;
}
```

#### `<ContactForm>`

Pre-built contact form component with quiz result integration.

```typescript
interface ContactFormProps {
  quizData?: QuizResults;
  fields: FormField[];
  onSubmit: (data: FormData) => void;
  className?: string;
  theme?: ThemeConfig;
  validationRules?: ValidationRules;
}
```

### Type Definitions

```typescript
interface QuizSection {
  title: string;
  icon?: React.ComponentType;
  description?: string;
  questions: Question[];
}

interface Question {
  text: string;
  options: QuizOption[];
  type?: 'single' | 'multiple' | 'scale';
  required?: boolean;
}

interface QuizOption {
  text: string;
  value: string;
  indicators?: string[];
  scores?: Record<string, number>;
}

interface QuizResults {
  scores: Record<string, number>;
  indicators: string[];
  resultType: string;
  confidence: number;
  recommendations?: any;
}

interface ResultMapping {
  weights: Record<string, number>;
  resultTypes: Record<string, ResultType>;
}

interface ResultType {
  title: string;
  description: string;
  thresholds: Record<string, number>;
  indicators: string[];
}
```

## 🔍 Advanced Usage Examples

### Implementing Custom Question Types

```jsx
function CustomScaleQuestion({ value, onChange }) {
  return (
    <div className="flex flex-col space-y-4">
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
      <div className="flex justify-between">
        <span>Not Important</span>
        <span>Very Important</span>
      </div>
    </div>
  );
}

const quizSections = [
  {
    title: "Priorities",
    questions: [
      {
        text: "How important is mobile responsiveness?",
        type: "scale",
        component: CustomScaleQuestion
      }
    ]
  }
];
```

### Implementing Analytics

```jsx
function QuizWithAnalytics() {
  const trackSection = (sectionIndex) => {
    analytics.track('Section Completed', {
      sectionIndex,
      timestamp: new Date()
    });
  };

  const trackCompletion = (results) => {
    analytics.track('Quiz Completed', {
      resultType: results.resultType,
      scores: results.scores,
      timestamp: new Date()
    });
  };

  return (
    <QuizSystem
      sections={quizSections}
      onSectionComplete={trackSection}
      onComplete={trackCompletion}
    />
  );
}
```

## 🚧 Troubleshooting

### Common Issues and Solutions

1. **Quiz results not persisting in contact form:**
   ```javascript
   // Make sure you're using React Router v6 and passing state correctly
   navigate('/contact', {
     state: { quizResult: results },
     replace: true // Use replace to ensure state persistence
   });
   ```

2. **Custom themes not applying:**
   ```javascript
   // Ensure your theme follows the correct structure
   const theme = {
     colors: { /* colors */ },
     fonts: { /* fonts */ },
     // Include all required properties
   };
   ```

3. **Animations not working:**
   ```jsx
   // Check Framer Motion installation and import
   import { motion } from 'framer-motion';
   
   // Ensure animations are enabled in settings
   const settings = {
     enableAnimations: true,
     // ... other settings
   };
   ```

## 📱 Mobile Responsiveness

The quiz system is built with a mobile-first approach. Here are some tips for ensuring optimal mobile experience:

```jsx
// Customize mobile breakpoints
const mobileSettings = {
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px'
  },
  mobileNavigation: 'swipe', // 'swipe' or 'buttons'
  mobileAnimations: 'minimal' // 'minimal' or 'full'
};

<QuizSystem
  settings={{ ...settings, ...mobileSettings }}
  className="px-4 md:px-0" // Add responsive padding
/>
```

## 🔒 Security Considerations

1. **Data Sanitization:**
```javascript
// Implement input sanitization
const sanitizeInput = (input) => {
  // Your sanitization logic
  return sanitizedInput;
};

<QuizSystem
  inputProcessor={sanitizeInput}
/>
```

2. **Rate Limiting:**
```javascript
// Implement submission throttling
const throttleSubmissions = {
  maxAttempts: 3,
  windowMs: 60000 // 1 minute
};

<QuizSystem
  submissionLimits={throttleSubmissions}
/>
```


### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/quizmapper.git

# Install dependencies
cd quizmapper
npm install

# Start development server
npm run dev

# Run tests
npm test
```


## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 📬 Support

Need help? Contact us:

- 💬 Twitter: [@AliLeisR](https://x.com/AliLeisR)
