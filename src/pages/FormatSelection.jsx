import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import FileUpload from '../components/FileUpload'
import { FILE_CATEGORIES, getCategoryByExtension, getSupportedOutputFormats, formatFileSize } from '../utils/fileFormats'
import { useFileContext } from '../contexts/FileContext'

const FormatSelection = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { file, saveFile, saveOutputFormat } = useFileContext()
  const [selectedFile, setSelectedFile] = useState(file)
  const [selectedOutput, setSelectedOutput] = useState(null)
  const [availableFormats, setAvailableFormats] = useState({})

  const categoryFromState = location.state?.category

  useEffect(() => {
    if (file) {
      setSelectedFile(file)
    }
  }, [file])

  useEffect(() => {
    if (selectedFile) {
      const ext = selectedFile.name.split('.').pop().toLowerCase()
      const category = categoryFromState || getCategoryByExtension(ext)
      const formats = getSupportedOutputFormats(category, ext)
      setAvailableFormats(formats)
    }
  }, [selectedFile, categoryFromState])

  const handleFileSelect = (file) => {
    setSelectedFile(file)
    saveFile(file)
  }

  const handleFormatSelect = (format) => {
    setSelectedOutput(format)
    saveOutputFormat(format)
  }

  const handleContinue = () => {
    if (selectedFile && selectedOutput) {
      navigate('/conversion')
    }
  }

  const getCategoryInfo = () => {
    if (!selectedFile) return null
    const ext = selectedFile.name.split('.').pop().toLowerCase()
    const category = categoryFromState || getCategoryByExtension(ext)
    return FILE_CATEGORIES[category] || null
  }

  const categoryInfo = getCategoryInfo()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-3xl font-bold gradient-text flex items-center gap-2">
            <Sparkles className="w-8 h-8" />
            Select Output Format
          </h1>
          <div className="w-24" /> {/* Spacer */}
        </motion.div>

        {/* File Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <FileUpload onFileSelect={handleFileSelect} selectedFile={selectedFile} />
        </motion.div>

        {/* Format Selection */}
        <AnimatePresence mode="wait">
          {selectedFile ? (
            <motion.div
              key="formats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Choose Output Format</h2>
              
              <div className="space-y-6">
                {Object.entries(availableFormats).map(([category, formats], idx) => {
                  if (formats === true || formats === false) return null // Skip boolean flags
                  if (!Array.isArray(formats) || formats.length === 0) return null

                  const categoryData = FILE_CATEGORIES[category] || { name: category, color: 'from-gray-500 to-gray-600' }
                  
                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="glass rounded-xl p-6"
                    >
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <span>{categoryData.icon || '📁'}</span>
                        {categoryData.name || category.charAt(0).toUpperCase() + category.slice(1)}
                      </h3>
                      
                      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                        {formats.map((format) => (
                          <motion.button
                            key={format}
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleFormatSelect(format)}
                            className={`
                              relative p-4 rounded-lg border-2 transition-all duration-300
                              ${selectedOutput === format
                                ? 'border-neon-blue bg-neon-blue/20 glow'
                                : 'border-gray-300 dark:border-gray-700 hover:border-neon-blue/50 bg-white/50 dark:bg-gray-800/50'
                              }
                            `}
                            style={{
                              perspective: '1000px'
                            }}
                          >
                            <motion.div
                              animate={selectedOutput === format ? { rotateY: 360 } : {}}
                              transition={{ duration: 0.5 }}
                              className="text-center"
                            >
                              <div className="text-2xl font-bold mb-1">{format.toUpperCase()}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {category}
                              </div>
                            </motion.div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Continue Button */}
              {selectedOutput && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 flex justify-end"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleContinue}
                    className="px-8 py-4 bg-gradient-to-r from-neon-blue via-neon-pink to-neon-purple text-white rounded-full font-semibold text-lg shadow-lg glow hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 glass rounded-xl"
            >
              <p className="text-xl text-gray-500 dark:text-gray-400">
                Upload a file to see available conversion formats
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FormatSelection

