import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, ArrowRight, Brain, Github } from 'lucide-react';

const ContactPage = () => {
  const location = useLocation();
  const form = useRef();
  
  const initialFormData = {
    name: '',
    email: '',
    quiz_result_type: '',
    timeline: '',
    details: '',
    preferences: '',
    comments: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.quizResult) {
      const quizData = location.state.quizResult;
      setFormData(prev => ({
        ...prev,
        quiz_result_type: quizData.result_type || '',
        timeline: quizData.timeline || '',
        details: quizData.description || '',
        preferences: quizData.preferences || ''
      }));
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setShowSuccess(true);
      setFormData(initialFormData);
    } catch (error) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto px-4 py-20"
      >
        {/* GitHub Button */}
        <motion.a
          href="https://github.com/AliKelDev/QuizMapperJS"
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-6 right-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg text-white font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300"
        >
          <Github className="w-5 h-5" />
          <span>View on GitHub</span>
        </motion.a>

        {/* Explanation Section */}
        <motion.div 
          variants={itemVariants}
          className="mb-16 space-y-6 text-purple-200"
        >
          <div className="flex items-center gap-3 mb-8">
            <Brain className="w-8 h-8 text-pink-500" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              Quiz Results Integration
            </h2>
          </div>
          
          <p className="text-lg">
            This form demonstrates advanced quiz result integration using React Router's state management. 
            The pre-filled fields below contain data passed from the quiz completion page via 
            <code className="mx-2 px-2 py-1 bg-purple-900/30 rounded">useLocation().state</code>.
          </p>
          
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-pink-400">How It Works:</h3>
            <ul className="space-y-3 list-disc list-inside">
              <li>Quiz results are passed through React Router's navigation state</li>
              <li>The <code className="px-2 py-0.5 bg-purple-900/30 rounded">useLocation</code> hook captures state data on component mount</li>
              <li>Form fields are automatically populated using the <code className="px-2 py-0.5 bg-purple-900/30 rounded">useEffect</code> hook</li>
              <li>Read-only fields preserve quiz results while allowing additional input</li>
            </ul>
          </div>

          <div className="flex justify-center pt-4">
            <motion.a
              href="https://github.com/AliKelDev/QuizMapperJS"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple-900/20 border border-purple-500/30 hover:border-pink-500/50 rounded-lg text-purple-200 hover:text-white transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              <span>Check out the complete implementation on GitHub</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>

        {/* Form Section */}
        <form ref={form} onSubmit={handleSubmit} className="space-y-8">
          <motion.div variants={itemVariants}>
            {showSuccess && (
              <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 flex items-center gap-2">
                <Send className="w-5 h-5" />
                Form submitted successfully!
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                {error}
              </div>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-purple-200">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 rounded-lg bg-purple-900/20 border border-purple-500/30 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-colors"
                onChange={handleInputChange}
                value={formData.name}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-purple-200">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 rounded-lg bg-purple-900/20 border border-purple-500/30 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-colors"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-purple-200">Result Type</label>
              <input
                type="text"
                name="quiz_result_type"
                readOnly
                className="w-full px-4 py-2 rounded-lg bg-purple-900/40 border border-purple-500/30 text-purple-200"
                value={formData.quiz_result_type}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-purple-200">Timeline</label>
              <input
                type="text"
                name="timeline"
                readOnly
                className="w-full px-4 py-2 rounded-lg bg-purple-900/40 border border-purple-500/30 text-purple-200"
                value={formData.timeline}
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-purple-200">Details</label>
            <textarea
              name="details"
              rows={4}
              readOnly
              className="w-full px-4 py-2 rounded-lg bg-purple-900/40 border border-purple-500/30 text-purple-200"
              value={formData.details}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-purple-200">Additional Comments</label>
            <textarea
              name="comments"
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-purple-900/20 border border-purple-500/30 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-colors"
              placeholder="Any additional information..."
              onChange={handleInputChange}
              value={formData.comments}
            />
          </motion.div>

          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg font-mono text-lg transition-all flex items-center justify-center gap-2 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
            {isSubmitting ? 'Submitting...' : 'Submit Form'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactPage;