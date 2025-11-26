import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, File, CheckCircle2 } from 'lucide-react'
import { formatFileSize, getCategoryByExtension } from '../utils/fileFormats'
import '../styles/components/FileUpload.css'

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
    <div className="upload">
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
            className={`upload-dropzone ${isDragging ? 'upload-dropzone--active' : 'upload-dropzone--idle'}`}
            onClick={() => document.getElementById('file-input').click()}
          >
            <motion.div
              animate={isDragging ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: isDragging ? Infinity : 0 }}
            >
              <Upload className={`upload-icon ${isDragging ? 'text-neon-blue' : 'text-gray-400'}`} />
            </motion.div>
            
            <h3 className="upload-heading">
              {isDragging ? 'Drop your file here' : 'Drag & Drop your file'}
            </h3>
            <p className="upload-subtext">
              or click to browse
            </p>
            <p className="upload-hint">
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
            className="upload-preview glass"
          >
            <button
              onClick={removeFile}
              className="upload-remove-btn"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="upload-preview-body">
              {preview ? (
                <motion.img
                  src={preview}
                  alt="Preview"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="upload-preview-image"
                />
              ) : (
                <div className="upload-preview-icon bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
                  {getCategoryIcon(selectedFile.name)}
                </div>
              )}

              <div className="upload-preview-details">
                <div className="upload-file-title">
                  <File className="w-5 h-5 text-neon-blue" />
                  <h3 className="upload-file-name">{selectedFile.name}</h3>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <p className="upload-file-meta mb-1">
                  Size: {formatFileSize(selectedFile.size)}
                </p>
                <p className="upload-file-meta">
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

