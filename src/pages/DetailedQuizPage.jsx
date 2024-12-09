import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ArrowLeft, 
  Home,
  Brain, 
  Target, 
  Workflow,
  Dices,
  BookOpen,
  Github,
  ExternalLink
} from 'lucide-react';
import { QuizAnalyzer } from '../utils/quiz/QuizMapperSystem';

/**
 * Quiz configuration for personality/skills assessment
 * Each question includes:
 * - indicators: traits/skills this answer indicates
 * - scores: how this answer affects different aspects
 * - attributes: specific characteristics this answer suggests
 */
const defaultQuizContent = {
  intro: {
    title: "Demo Quiz",
    subtitle: "QuizMapper.js Demo Implementation",
    description: "This is a demo showcasing the basic features of QuizMapper.js. For a full implementation with precise results and contact form integration, check out the library on GitHub. You can also see it in action on my website!",
    start: "Start Demo",
    links: {
      github: "https://github.com/AliKelDev/QuizMapperJS",
      liveExample: "https://webpixelle3.netlify.app/quiz-select"
    }
  },
  sections: [
    {
      title: "Cognitive Style",
      icon: Brain,
      description: "How you process and engage with information",
      questions: [
        {
          text: "When solving complex problems, what's your preferred approach?",
          options: [
            {
              text: "🔍 Break it down systematically",
              value: "analytical",
              indicators: ["analytical", "methodical"],
              scores: { technical: 0.8, creative: 0.2 },
              attributes: { problem_solving: "systematic" }
            },
            {
              text: "💡 Look for creative connections",
              value: "creative",
              indicators: ["creative", "intuitive"],
              scores: { creative: 0.9, technical: 0.3 },
              attributes: { problem_solving: "intuitive" }
            },
            {
              text: "🤝 Discuss with others",
              value: "collaborative",
              indicators: ["collaborative", "social"],
              scores: { social: 0.8, leadership: 0.6 },
              attributes: { problem_solving: "collaborative" }
            }
          ]
        }
      ]
    },
    {
      title: "Learning Style",
      icon: BookOpen,
      description: "Your preferred methods of learning and growth",
      questions: [
        {
          text: "How do you best learn new concepts?",
          options: [
            {
              text: "📚 Reading and research",
              value: "theoretical",
              indicators: ["research", "independent"],
              scores: { academic: 0.8, practical: 0.3 },
              attributes: { learning: "theoretical" }
            },
            {
              text: "🛠️ Hands-on practice",
              value: "practical",
              indicators: ["practical", "experiential"],
              scores: { practical: 0.9, academic: 0.4 },
              attributes: { learning: "practical" }
            },
            {
              text: "🎯 Project-based work",
              value: "project",
              indicators: ["project_focused", "goal_oriented"],
              scores: { practical: 0.7, planning: 0.8 },
              attributes: { learning: "project_based" }
            }
          ]
        }
      ]
    }
  ],
  progress: {
    section: "Section",
    question: "Question",
    of: "of",
    completion: "Completion"
  },
  navigation: {
    next: "Continue",
    back: "Previous",
    finish: "Complete Assessment"
  }
};

// Configure the analyzer with custom settings
const quizAnalyzer = new QuizAnalyzer({
  aspectWeights: {
    technical: 0.3,
    creative: 0.3,
    social: 0.2,
    academic: 0.2
  },
  resultTypes: {
    technical_creative: {
      title: "Technical Creative",
      description: "You blend analytical thinking with creative problem-solving",
      thresholds: {
        technical: 0.6,
        creative: 0.6
      },
      indicators: ['analytical', 'creative', 'innovative']
    },
    practical_leader: {
      title: "Practical Leader",
      description: "You excel at hands-on work and guiding others",
      thresholds: {
        practical: 0.7,
        leadership: 0.6
      },
      indicators: ['practical', 'leadership', 'collaborative']
    }
  }
});

const DetailedQuizPage = ({
  content = defaultQuizContent,
  analyzer = quizAnalyzer,
  className = "",
  resultPath = "/contact"
}) => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Progress calculations
  const totalQuestions = content.sections.reduce(
    (acc, section) => acc + section.questions.length, 0
  );
  const currentTotal = content.sections
    .slice(0, currentSection)
    .reduce((acc, section) => acc + section.questions.length, 0) + currentQuestion + 1;
  const progress = (currentTotal / totalQuestions) * 100;

  const handleStart = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowIntro(false);
      setIsAnimating(false);
    }, 500);
  };

  const completeQuiz = () => {
    const result = analyzer.analyzeResponses(answers);
    navigate(resultPath, { 
      state: { 
        quizResult: {
          result_type: result.result_type,
          description: result.description,
          confidence_score: result.confidence_score,
          attributes: result.attributes,
          recommendations: generateRecommendations(result)
        }
      } 
    });
  };

  const generateRecommendations = (result) => {
    return `Based on your ${result.result_type} profile, we recommend focusing on ${
      Object.keys(result.attributes).join(', ')
    }. Your confidence score of ${(result.confidence_score * 100).toFixed(1)}% suggests this is a strong match.`;
  };

  const handleAnswer = (answer) => {
    setIsAnimating(true);
    
    const newAnswers = [...answers];
    const currentIndex = currentSection * 5 + currentQuestion;
    newAnswers[currentIndex] = answer;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < content.sections[currentSection].questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else if (currentSection < content.sections.length - 1) {
        setCurrentSection(prev => prev + 1);
        setCurrentQuestion(0);
      } else {
        completeQuiz();
      }
      setIsAnimating(false);
    }, 400);
  };

  const handleBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (currentQuestion > 0) {
        setCurrentQuestion(prev => prev - 1);
      } else if (currentSection > 0) {
        setCurrentSection(prev => prev - 1);
        setCurrentQuestion(content.sections[currentSection - 1].questions.length - 1);
      }
      setIsAnimating(false);
    }, 400);
  };

  if (showIntro) {
    return (
      <div className={`min-h-screen bg-black ${className}`}>
        <div className="max-w-4xl mx-auto px-4 py-20">
          {/* Home Button */}
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 bg-purple-900/20 hover:bg-purple-900/40 rounded-lg text-purple-200 hover:text-white transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </motion.button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-8"
          >
            <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
              {content.intro.title}
            </h1>
            <p className="text-2xl text-purple-200">{content.intro.subtitle}</p>
            <div className="text-lg text-purple-300 max-w-2xl mx-auto space-y-4">
              <p>{content.intro.description}</p>
              
              <div className="flex justify-center gap-4 pt-4">
                <a 
                  href={content.intro.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View on GitHub</span>
                </a>
                <a 
                  href={content.intro.links.liveExample}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/20 hover:bg-purple-900/40 rounded-lg text-purple-200 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>See Live Example</span>
                </a>
              </div>
            </div>
            
            <motion.button
              onClick={handleStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-transparent rounded-lg font-mono text-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-pink-500 to-purple-500 blur-xl" />
              <span className="relative text-white">{content.intro.start}</span>
              <ChevronRight className="w-6 h-6 relative group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentSectionData = content.sections[currentSection];
  const currentQuestionData = currentSectionData?.questions[currentQuestion];

  return (
    <div className={`min-h-screen bg-black ${className}`}>
      {/* Home Button */}
      <Link to="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 bg-purple-900/20 hover:bg-purple-900/40 rounded-lg text-purple-200 hover:text-white transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </motion.button>
      </Link>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSection}-${currentQuestion}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-purple-900/10 backdrop-blur-xl p-8 rounded-2xl border border-purple-500/20"
          >
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {currentSectionData?.icon && (
                    <currentSectionData.icon className="w-7 h-7 text-pink-500" />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                      {currentSectionData?.title}
                    </h2>
                    <p className="text-purple-300 text-sm mt-1">
                      {currentSectionData?.description}
                    </p>
                  </div>
                </div>
                <div className="text-purple-200 text-sm">
                  {content.progress.completion}: {progress.toFixed(0)}%
                </div>
              </div>
              
              <div className="h-2 bg-purple-900/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                  initial={{ width: `${((currentTotal - 1) / totalQuestions) * 100}%` }}
                  animate={{ width: `${(currentTotal / totalQuestions) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {currentQuestionData && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl text-purple-200 mb-8">
                  {currentQuestionData.text}
                </h3>

                <div className="space-y-4">
                  {currentQuestionData.options.map((option, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => !isAnimating && handleAnswer(option)}
                      className="w-full p-4 text-left bg-purple-900/20 hover:bg-purple-900/40 border border-purple-500/20 hover:border-pink-500/50 rounded-xl transition-all duration-300 text-white"
                    >
                      {option.text}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {(currentSection > 0 || currentQuestion > 0) && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => !isAnimating && handleBack()}
                className="mt-8 flex items-center gap-2 text-purple-200 hover:text-pink-500 transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                {content.navigation.back}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DetailedQuizPage;