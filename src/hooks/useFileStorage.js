import { useState, useEffect } from 'react'

export const useFileStorage = () => {
  const [file, setFile] = useState(null)
  const [outputFormat, setOutputFormat] = useState(null)
  const [conversionResult, setConversionResult] = useState(null)

  useEffect(() => {
    // Load from localStorage
    const savedFile = localStorage.getItem('conversionFile')
    const savedFormat = localStorage.getItem('outputFormat')
    const savedResult = localStorage.getItem('conversionResult')
    
    if (savedFile) {
      try {
        const parsed = JSON.parse(savedFile)
        setFile(parsed)
      } catch (e) {
        console.error('Error loading file from storage', e)
      }
    }
    
    if (savedFormat) setOutputFormat(savedFormat)
    if (savedResult) {
      try {
        setConversionResult(JSON.parse(savedResult))
      } catch (e) {
        console.error('Error loading result from storage', e)
      }
    }
  }, [])

  const saveFile = (fileData) => {
    const fileObj = {
      name: fileData.name,
      size: fileData.size,
      type: fileData.type,
      lastModified: fileData.lastModified
    }
    setFile(fileData)
    localStorage.setItem('conversionFile', JSON.stringify(fileObj))
  }

  const saveOutputFormat = (format) => {
    setOutputFormat(format)
    localStorage.setItem('outputFormat', format)
  }

  const saveResult = (result) => {
    setConversionResult(result)
    localStorage.setItem('conversionResult', JSON.stringify(result))
  }

  const clearStorage = () => {
    setFile(null)
    setOutputFormat(null)
    setConversionResult(null)
    localStorage.removeItem('conversionFile')
    localStorage.removeItem('outputFormat')
    localStorage.removeItem('conversionResult')
  }

  return {
    file,
    outputFormat,
    conversionResult,
    saveFile,
    saveOutputFormat,
    saveResult,
    clearStorage
  }
}

