import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Github, Twitter, BookOpen, Lightbulb } from 'lucide-react';
import DetailedQuizPage from './pages/DetailedQuizPage';
import ContactPage from './pages/ContactPage';

function LandingPage() {
  const socialLinks = [
    {
      href: "https://x.com/AliLeisR",
      icon: <Twitter className="w-5 h-5" />,
      label: "Follow on Twitter",
      color: "from-blue-600 to-blue-700"
    },
    {
      href: "https://aliceleiserblog.netlify.app/",
      icon: <BookOpen className="w-5 h-5" />,
      label: "Read My Blog",
      color: "from-green-600 to-green-700"
    },
    {
      href: "https://webpixelle3.netlify.app/quiz-select",
      icon: <Lightbulb className="w-5 h-5" />,
      label: "Original Inspiration",
      color: "from-yellow-600 to-yellow-700"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="relative overflow-hidden">
        {/* Animated Grid Background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent"
          animate={{
            backgroundPosition: ["0px 0px", "25px 25px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(transparent 1px, #000 1px), linear-gradient(90deg, transparent 1px, #000 1px)',
              backgroundSize: '25px 25px',
              opacity: 0.5,
              maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)'
            }}
          />
        </motion.div>

        {/* Floating Particles */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={false}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-500/20 rounded-full"
              animate={{
                y: [-20, window.innerHeight + 20],
                x: Math.random() * window.innerWidth,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>

        <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 max-w-4xl"
          >
            <motion.h1 
              className="text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text mb-6"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              QuizMapperJS
            </motion.h1>
            
            <motion.p 
              className="text-2xl text-purple-200 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              A flexible React library for building interactive quizzes with sophisticated result mapping
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Main Action Buttons */}
              <div className="flex gap-4 flex-wrap justify-center">
                <a href="https://github.com/AliKelDev/QuizMapperJS" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg font-mono text-xl text-white overflow-hidden transition-all hover:shadow-2xl hover:shadow-gray-500/20"
                  >
                    <Github className="w-6 h-6" />
                    <span className="relative z-10">View on GitHub</span>
                  </motion.button>
                </a>
                
                <Link to="/quiz">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg font-mono text-xl text-white overflow-hidden transition-all hover:shadow-2xl hover:shadow-purple-500/20"
                  >
                    <span className="relative z-10">Try Demo</span>
                    <ChevronRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-6 flex-wrap justify-center">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${link.color} rounded-lg text-white text-sm hover:shadow-lg transition-all`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mt-24"
          >
            {[
              {
                title: "Flexible Architecture",
                description: "Build custom quizzes with a powerful and extensible component system",
                emoji: "🏗️"
              },
              {
                title: "Smart Result Mapping",
                description: "Map quiz responses to outcomes using configurable algorithms",
                emoji: "🎯"
              },
              {
                title: "Beautiful UI",
                description: "Polished, animated interface powered by Framer Motion",
                emoji: "✨"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all"
              >
                <motion.div 
                  className="text-4xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {feature.emoji}
                </motion.div>
                <h3 className="text-xl font-bold text-purple-100 mb-2">{feature.title}</h3>
                <p className="text-purple-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-purple-300 text-lg mt-12 max-w-2xl text-center"
          >
            Check out our documentation on GitHub for installation instructions and detailed usage examples.
          </motion.p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<DetailedQuizPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;