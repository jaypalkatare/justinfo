import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Moon, Sun, Globe, Sliders, Sparkles } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useState } from 'react'

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
          className="flex items-center gap-3 px-6 py-3 glass rounded-xl hover:bg-white/20 transition-colors w-full"
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
            className="w-full px-6 py-3 glass rounded-xl hover:bg-white/20 transition-colors cursor-pointer"
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Quality: {quality}%</span>
            <span className="text-sm text-gray-500 dark:text-gray-500">
              {quality < 50 ? 'Fast' : quality < 80 ? 'Balanced' : 'High'}
            </span>
          </div>
          <input
            type="range"
            min="30"
            max="100"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-blue"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
            <span>Lower Size</span>
            <span>Better Quality</span>
          </div>
        </div>
      )
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-3xl font-bold gradient-text flex items-center gap-2">
            <Sparkles className="w-8 h-8" />
            Settings
          </h1>
          <div className="w-24" /> {/* Spacer */}
        </motion.div>

        {/* Settings Cards */}
        <div className="space-y-6">
          {settings.map((setting, index) => {
            const Icon = setting.icon
            return (
              <motion.div
                key={setting.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-blue to-neon-pink flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{setting.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
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
          className="mt-8 glass rounded-2xl p-6 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Settings are automatically saved to your browser
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings

