// Mock conversion logic
export const simulateConversion = async (file, outputFormat, onProgress) => {
  const steps = 100
  const delay = 30 // ms per step
  
  for (let i = 0; i <= steps; i++) {
    await new Promise(resolve => setTimeout(resolve, delay))
    onProgress(i)
  }
  
  // Simulate creating output file
  const outputFileName = file.name.replace(/\.[^/.]+$/, `.${outputFormat}`)
  
  return {
    fileName: outputFileName,
    fileSize: file.size * 0.9, // Simulate slight size change
    downloadUrl: URL.createObjectURL(file) // Mock download URL
  }
}

