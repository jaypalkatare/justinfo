import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Moon, Sun, Globe, Sliders, Sparkles } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useState } from 'react'
import '../styles/pages/Settings.css'

const Settings = () => {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const [quality, setQuality] = useState(80)
  const [language, setLanguage] = useState('en')

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  ]

  const settings = [
    {
      title: 'Theme',
      icon: isDark ? Moon : Sun,
      description: 'Switch between dark and light mode',
      action: (
        <button
          onClick={toggleTheme}
          className="settings-action-button glass"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span className="flex-1 text-left">Use {isDark ? 'Light' : 'Dark'} Mode</span>
          <motion.div
            animate={isDark ? { rotate: 360 } : {}}
            transition={{ duration: 0.5 }}
          >
            {isDark ? '🌙' : '☀️'}
          </motion.div>
        </button>
      )
    },
    {
      title: 'Language',
      icon: Globe,
      description: 'Select your preferred language',
      action: (
        <div className="space-y-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="settings-select glass"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
      )
    },
    {
      title: 'Conversion Quality',
      icon: Sliders,
      description: 'Adjust the quality of converted files',
      action: (
        <div className="settings-quality">
          <div className="settings-quality-label">
            <span className="settings-quality-text">Quality: {quality}%</span>
            <span className="settings-quality-subtext">
              {quality < 50 ? 'Fast' : quality < 80 ? 'Balanced' : 'High'}
            </span>
          </div>
          <input
            type="range"
            min="30"
            max="100"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="settings-range"
          />
          <div className="settings-range-hint">
            <span>Lower Size</span>
            <span>Better Quality</span>
          </div>
        </div>
      )
    },
  ]

  return (
    <div className="settings-page">
      <div className="settings-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="settings-header"
        >
          <button
            onClick={() => navigate(-1)}
            className="settings-back-btn glass"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="settings-title gradient-text">
            <Sparkles className="w-8 h-8" />
            Settings
          </h1>
          <div className="w-24" /> {/* Spacer */}
        </motion.div>

        {/* Settings Cards */}
        <div className="settings-cards">
          {settings.map((setting, index) => {
            const Icon = setting.icon
            return (
              <motion.div
                key={setting.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="settings-card glass"
              >
                <div className="settings-card-header">
                  <div className="settings-card-icon bg-gradient-to-r from-neon-blue to-neon-pink">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="settings-card-title">{setting.title}</h3>
                    <p className="settings-card-text">
                      {setting.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  {setting.action}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="settings-info glass"
        >
          <p className="settings-info-text">
            Settings are automatically saved to your browser
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings

