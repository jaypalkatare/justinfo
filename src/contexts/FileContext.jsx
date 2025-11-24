import { createContext, useContext, useState } from 'react'

const FileContext = createContext()

export const useFileContext = () => {
  const context = useContext(FileContext)
  if (!context) {
    throw new Error('useFileContext must be used within FileProvider')
  }
  return context
}

export const FileProvider = ({ children }) => {
  const [file, setFile] = useState(null)
  const [outputFormat, setOutputFormat] = useState(null)
  const [conversionResult, setConversionResult] = useState(null)

  const saveFile = (fileData) => {
    setFile(fileData)
    // Save metadata to localStorage
    if (fileData) {
      const metadata = {
        name: fileData.name,
        size: fileData.size,
        type: fileData.type,
        lastModified: fileData.lastModified
      }
      localStorage.setItem('conversionFileMetadata', JSON.stringify(metadata))
    } else {
      localStorage.removeItem('conversionFileMetadata')
    }
  }

  const saveOutputFormat = (format) => {
    setOutputFormat(format)
    if (format) {
      localStorage.setItem('outputFormat', format)
    } else {
      localStorage.removeItem('outputFormat')
    }
  }

  const saveResult = (result) => {
    setConversionResult(result)
    if (result) {
      localStorage.setItem('conversionResult', JSON.stringify(result))
    } else {
      localStorage.removeItem('conversionResult')
    }
  }

  const clearAll = () => {
    setFile(null)
    setOutputFormat(null)
    setConversionResult(null)
    localStorage.removeItem('conversionFileMetadata')
    localStorage.removeItem('outputFormat')
    localStorage.removeItem('conversionResult')
  }

  return (
    <FileContext.Provider
      value={{
        file,
        outputFormat,
        conversionResult,
        saveFile,
        saveOutputFormat,
        saveResult,
        clearAll
      }}
    >
      {children}
    </FileContext.Provider>
  )
}

