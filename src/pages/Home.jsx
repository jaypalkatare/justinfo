import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FileUp, Image, Video, Music, FileText, Archive, Box, Sparkles } from 'lucide-react'
import { FILE_CATEGORIES } from '../utils/fileFormats'
import { useTheme } from '../contexts/ThemeContext'

const Home = () => {
  const navigate = useNavigate()
  const { isDark } = useTheme()

  const categoryCards = [
    { key: 'images', icon: Image, path: '/format-selection' },
    { key: 'videos', icon: Video, path: '/format-selection' },
    { key: 'audio', icon: Music, path: '/format-selection' },
    { key: 'documents', icon: FileText, path: '/format-selection' },
    { key: 'archives', icon: Archive, path: '/format-selection' },
    { key: '3d', icon: Box, path: '/format-selection' },
  ]

  const handleCategoryClick = (category) => {
    navigate('/format-selection', { state: { category } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-neon-blue/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-neon-pink/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold gradient-text"
        >
          JustInfo
        </motion.div>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/settings')}
          className="p-2 rounded-lg glass hover:bg-white/20 transition-colors"
        >
          ⚙️
        </motion.button>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-16 h-16 text-neon-blue mx-auto mb-4" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-extrabold mb-6 gradient-text"
          >
            Convert Anything
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl font-light mb-4 text-gray-700 dark:text-gray-300"
          >
            Anytime. Anywhere.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Universal file converter supporting images, videos, audio, documents, archives, and 3D formats
          </motion.p>
        </motion.div>

        {/* Quick Upload Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/format-selection')}
            className="group px-8 py-4 bg-gradient-to-r from-neon-blue via-neon-pink to-neon-purple text-white rounded-full font-semibold text-lg shadow-lg glow hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
          >
            <FileUp className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            Start Converting
          </motion.button>
        </motion.div>

        {/* Category Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto"
        >
          {categoryCards.map((item, index) => {
            const category = FILE_CATEGORIES[item.key]
            const Icon = item.icon
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick(item.key)}
                className="group relative cursor-pointer"
              >
                <motion.div
                  className={`glass rounded-2xl p-6 text-center backdrop-blur-xl border-2 transition-all duration-300 ${
                    isDark ? 'border-gray-700 hover:border-neon-blue' : 'border-gray-200 hover:border-neon-blue'
                  }`}
                  whileHover={{ 
                    boxShadow: '0 0 30px rgba(0, 240, 255, 0.5)',
                  }}
                >
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {category.formats.length} formats
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center"
        >
          {[
            { label: 'File Formats', value: '100+' },
            { label: 'Conversions', value: 'Unlimited' },
            { label: 'File Size', value: 'No Limit' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Home

