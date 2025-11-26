import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Download, CheckCircle2, FileDown, RefreshCw, Home } from 'lucide-react'
import { useFileContext } from '../contexts/FileContext'
import { formatFileSize } from '../utils/fileFormats'
import '../styles/pages/Results.css'

const Results = () => {
  const navigate = useNavigate()
  const { file, outputFormat, conversionResult, clearAll } = useFileContext()

  const handleDownload = () => {
    if (conversionResult?.downloadUrl) {
      const link = document.createElement('a')
      link.href = conversionResult.downloadUrl
      link.download = conversionResult.fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleConvertAnother = () => {
    clearAll()
    navigate('/format-selection')
  }

  const handleGoHome = () => {
    clearAll()
    navigate('/')
  }

  if (!conversionResult || !file) {
    return (
      <div className="results-empty-wrapper">
        <div className="results-empty-card">
          <p className="results-empty-text">
            No conversion result found
          </p>
          <button
            onClick={() => navigate('/')}
            className="results-empty-btn bg-neon-blue hover:bg-neon-blue/80"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="results-page">
      <div className="results-container">
        {/* Success Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="results-success"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="results-icon-wrapper"
          >
            <div className="results-icon bg-gradient-to-r from-green-400 to-emerald-500 glow-green">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="results-title gradient-text"
          >
            Conversion Complete!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="results-subtitle"
          >
            Your file has been successfully converted
          </motion.p>
        </motion.div>

        {/* File Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="results-card glass"
        >
          <div className="results-grid">
            {/* Original File */}
            <div className="space-y-4">
              <h3 className="results-section-title">Original File</h3>
              <div className="results-file-card glass">
                <div className="results-file-shell">
                  <div className="results-file-icon bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
                    📄
                  </div>
                  <div className="flex-1">
                    <p className="results-file-name">{file.name}</p>
                    <p className="results-file-meta">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Converted File */}
            <div className="space-y-4">
              <h3 className="results-section-title">Converted File</h3>
              <div className="results-file-card glass border-2 border-neon-blue/50">
                <div className="results-file-shell">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="results-file-icon bg-gradient-to-br from-neon-blue to-neon-pink text-2xl"
                  >
                    ✨
                  </motion.div>
                  <div className="flex-1">
                    <p className="results-file-name text-neon-blue">{conversionResult.fileName}</p>
                    <p className="results-file-meta">
                      {formatFileSize(conversionResult.fileSize)}
                    </p>
                    <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Ready to download
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preview Area */}
        {file.type?.startsWith('image/') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="results-preview-card glass"
          >
            <h3 className="results-section-title">Preview</h3>
            <div className="results-preview-box">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full max-h-96 object-contain mx-auto rounded-lg"
              />
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="results-actions"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="results-primary-btn glow group"
          >
            <Download className="w-6 h-6 group-hover:animate-bounce" />
            Download File
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConvertAnother}
            className="results-secondary-btn glass group"
          >
            <RefreshCw className="w-6 h-6 group-hover:rotate-180 transition-transform" />
            Convert Another
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoHome}
            className="results-secondary-btn glass group"
          >
            <Home className="w-6 h-6" />
            Home
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default Results

