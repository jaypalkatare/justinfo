import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FileUp, Image, Video, Music, FileText, Archive, Box, Sparkles } from 'lucide-react'
import { FILE_CATEGORIES } from '../utils/fileFormats'
import { useTheme } from '../contexts/ThemeContext'
import '../styles/pages/Home.css'

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
    <div className="home">
      {/* Animated Background */}
      <div className="home__background">
        <motion.div
          className="home__bubble home__bubble--blue"
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
          className="home__bubble home__bubble--pink"
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
      <nav className="home__nav">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="home__brand gradient-text"
        >
          JustInfo
        </motion.div>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/settings')}
          className="home__settings-btn glass"
        >
          ⚙️
        </motion.button>
      </nav>

      {/* Hero Section */}
      <div className="home__hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="home__hero-content"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="home__hero-icon"
          >
            <Sparkles className="home__sparkles-icon" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="home__title gradient-text"
          >
            Convert Anything
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="home__subtitle"
          >
            Anytime. Anywhere.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="home__description"
          >
            Universal file converter supporting images, videos, audio, documents, archives, and 3D formats
          </motion.p>
        </motion.div>

        {/* Quick Upload Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          // transition={{ delay: 0.5 }}
          className="home__upload"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/format-selection')}
            className="home__upload-button glow group"
          >
            <FileUp className="home__upload-icon group-hover:rotate-12" />
            Start Converting
          </motion.button>
        </motion.div>

        {/* Category Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="home__category-grid"
        >
          {categoryCards.map((item, index) => {
            const category = FILE_CATEGORIES[item.key]
            const Icon = item.icon
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => handleCategoryClick(item.key)}
                className="home__category-card group"
              >
                <motion.div
                  className={`home__category-card-inner glass ${
                    isDark ? 'home__category-card-inner--dark' : 'home__category-card-inner--light'
                  }`}
                >
                  <motion.div
                    className={`home__category-icon bg-gradient-to-r ${category.color}`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="home__category-title">{category.name}</h3>
                  <p className="home__category-text">
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
          className="home__stats-grid"
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
                className="home__stats-card glass"
            >
                <div className="home__stats-value">{stat.value}</div>
                <div className="home__stats-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Home

