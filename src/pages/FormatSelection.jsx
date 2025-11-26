import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import FileUpload from '../components/FileUpload'
import { FILE_CATEGORIES, getCategoryByExtension, getSupportedOutputFormats } from '../utils/fileFormats'
import { useFileContext } from '../contexts/FileContext'
import '../styles/pages/FormatSelection.css'

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
    <div className="format-page">
      <div className="format-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="format-header"
        >
          <button
            onClick={() => navigate('/')}
            className="format-back-btn glass"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="format-title gradient-text">
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
          className="format-upload"
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
              <h2 className="format-section-title">Choose Output Format</h2>
              
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
                      className="format-category glass"
                    >
                      <h3 className="format-category-title">
                        <span>{categoryData.icon || '📁'}</span>
                        {categoryData.name || category.charAt(0).toUpperCase() + category.slice(1)}
                      </h3>
                      
                      <div className="format-grid">
                        {formats.map((format) => (
                          <motion.button
                            key={format}
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleFormatSelect(format)}
                            className={`format-option ${
                              selectedOutput === format
                                ? 'format-option--selected glow'
                                : 'format-option--default'
                            }`}
                            style={{
                              perspective: '1000px'
                            }}
                          >
                            <motion.div
                              animate={selectedOutput === format ? { rotateY: 360 } : {}}
                              transition={{ duration: 0.5 }}
                              className="text-center"
                            >
                              <div className="format-option-code">{format.toUpperCase()}</div>
                              <div className="format-option-text">
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
                  className="format-continue"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleContinue}
                    className="format-continue-btn glow"
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
              className="format-empty glass"
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

