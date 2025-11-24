import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, File, CheckCircle2 } from 'lucide-react'
import { formatFileSize, getCategoryByExtension } from '../utils/fileFormats'

const FileUpload = ({ onFileSelect, selectedFile }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState(null)

  const handleFile = useCallback((file) => {
    if (file) {
      onFileSelect(file)
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => setPreview(e.target.result)
        reader.readAsDataURL(file)
      } else {
        setPreview(null)
      }
    }
  }, [onFileSelect])

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const removeFile = () => {
    onFileSelect(null)
    setPreview(null)
  }

  const getFileExtension = (fileName) => {
    return fileName.split('.').pop().toLowerCase()
  }

  const getCategoryIcon = (fileName) => {
    const ext = getFileExtension(fileName)
    const category = getCategoryByExtension(ext)
    const icons = {
      images: '🖼️',
      videos: '🎬',
      audio: '🎵',
      documents: '📄',
      archives: '📦',
      '3d': '🎮'
    }
    return icons[category] || '📎'
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-2xl p-12 text-center
              transition-all duration-300 cursor-pointer
              ${isDragging 
                ? 'border-neon-blue bg-neon-blue/10 scale-105' 
                : 'border-gray-300 dark:border-gray-700 hover:border-neon-blue/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/50'
              }
            `}
            onClick={() => document.getElementById('file-input').click()}
          >
            <motion.div
              animate={isDragging ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: isDragging ? Infinity : 0 }}
            >
              <Upload className={`w-16 h-16 mx-auto mb-4 ${isDragging ? 'text-neon-blue' : 'text-gray-400'}`} />
            </motion.div>
            
            <h3 className="text-xl font-semibold mb-2">
              {isDragging ? 'Drop your file here' : 'Drag & Drop your file'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              or click to browse
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Supports all major file formats
            </p>
            
            <input
              id="file-input"
              type="file"
              className="hidden"
              onChange={handleFileInput}
              accept="*/*"
            />

            {/* Animated border pulse */}
            {isDragging && (
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-neon-blue"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass rounded-2xl p-6 relative"
          >
            <button
              onClick={removeFile}
              className="absolute top-4 right-4 p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row items-center gap-6">
              {preview ? (
                <motion.img
                  src={preview}
                  alt="Preview"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-5xl">
                  {getCategoryIcon(selectedFile.name)}
                </div>
              )}

              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <File className="w-5 h-5 text-neon-blue" />
                  <h3 className="text-lg font-semibold truncate">{selectedFile.name}</h3>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Size: {formatFileSize(selectedFile.size)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Type: {selectedFile.type || 'Unknown'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FileUpload

