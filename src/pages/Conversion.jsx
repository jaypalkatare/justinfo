import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Loader2, Zap, Sparkles } from 'lucide-react'
import { useFileContext } from '../contexts/FileContext'
import { simulateConversion } from '../utils/conversion'

const Conversion = () => {
  const navigate = useNavigate()
  const { file, outputFormat, saveResult } = useFileContext()
  const [progress, setProgress] = useState(0)
  const [isConverting, setIsConverting] = useState(true)

  useEffect(() => {
    if (!file || !outputFormat) {
      navigate('/format-selection')
      return
    }

    const convertFile = async () => {
      try {
        const result = await simulateConversion(file, outputFormat, (prog) => {
          setProgress(prog)
        })
        saveResult(result)
        setTimeout(() => {
          navigate('/results')
        }, 500)
      } catch (error) {
        console.error('Conversion error:', error)
      } finally {
        setIsConverting(false)
      }
    }

    convertFile()
  }, [file, outputFormat, navigate, saveResult])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-12"
        >
          {/* 3D Loader Animation */}
          <motion.div
            className="relative w-32 h-32 mx-auto mb-8"
            style={{ perspective: '1000px' }}
          >
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-neon-blue via-neon-pink to-neon-purple"
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border-4 border-transparent bg-gradient-to-r from-neon-purple via-neon-blue to-neon-pink"
              animate={{
                rotateX: [360, 0],
                rotateY: [360, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            />
            <motion.div
              className="absolute inset-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-pink flex items-center justify-center"
              animate={{
                rotateZ: [0, 360],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold gradient-text flex items-center gap-2 justify-center"
              >
                <Zap className="w-6 h-6" />
                Converting...
              </motion.h2>
              <span className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                {progress}%
              </span>
            </div>
            
            <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-blue via-neon-pink to-neon-purple"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/30"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* File Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 space-y-2"
          >
            <p className="text-gray-600 dark:text-gray-400">
              Converting <span className="font-semibold text-neon-blue">{file?.name}</span>
            </p>
            <p className="text-gray-500 dark:text-gray-500">
              to <span className="font-semibold text-neon-pink">{outputFormat?.toUpperCase()}</span>
            </p>
          </motion.div>

          {/* Status Messages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 space-y-2"
          >
            {progress < 25 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                Analyzing file structure...
              </p>
            )}
            {progress >= 25 && progress < 50 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                Processing file data...
              </p>
            )}
            {progress >= 50 && progress < 75 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                Converting format...
              </p>
            )}
            {progress >= 75 && progress < 100 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                Finalizing conversion...
              </p>
            )}
            {progress === 100 && (
              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-sm text-green-500 font-semibold"
              >
                ✓ Conversion complete!
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Conversion

