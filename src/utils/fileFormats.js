export const FILE_CATEGORIES = {
  images: {
    name: 'Images',
    icon: '🖼️',
    formats: ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif', 'svg', 'tiff', 'heic', 'avif', 'raw', 'cr2', 'nef', 'dng', 'ico', 'jfif'],
    color: 'from-blue-500 to-cyan-500'
  },
  videos: {
    name: 'Videos',
    icon: '🎬',
    formats: ['mp4', 'mkv', 'mov', 'avi', 'mpeg', 'mpg', 'webm', 'm4v', 'flv', 'wmv', '3gp', 'ogv', 'ts'],
    color: 'from-purple-500 to-pink-500'
  },
  audio: {
    name: 'Audio',
    icon: '🎵',
    formats: ['mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a', 'opus', 'wma', 'amr', 'aiff', 'midi', 'pcm'],
    color: 'from-green-500 to-emerald-500'
  },
  documents: {
    name: 'Documents',
    icon: '📄',
    formats: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 'ppt', 'pptx', 'xls', 'xlsx', 'epub', 'mobi', 'csv', 'md'],
    color: 'from-orange-500 to-red-500'
  },
  archives: {
    name: 'Archives',
    icon: '📦',
    formats: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'iso'],
    color: 'from-yellow-500 to-amber-500'
  },
  '3d': {
    name: '3D / CAD',
    icon: '🎮',
    formats: ['obj', 'stl', 'fbx', 'gltf', 'step', 'dwg', 'dxf'],
    color: 'from-indigo-500 to-violet-500'
  }
}

export const getAllFormats = () => {
  return Object.values(FILE_CATEGORIES).flatMap(category => category.formats)
}

export const getCategoryByExtension = (ext) => {
  ext = ext.toLowerCase().replace('.', '')
  for (const [key, category] of Object.entries(FILE_CATEGORIES)) {
    if (category.formats.includes(ext)) {
      return key
    }
  }
  return null
}

export const getSupportedOutputFormats = (inputCategory, inputFormat) => {
  const inputExt = inputFormat.toLowerCase().replace('.', '')
  
  if (inputCategory === 'images') {
    return {
      images: FILE_CATEGORIES.images.formats.filter(f => f !== inputExt),
      documents: ['pdf'],
      text: ['txt'] // OCR option
    }
  }
  
  if (inputCategory === 'videos') {
    return {
      videos: FILE_CATEGORIES.videos.formats.filter(f => f !== inputExt),
      audio: ['mp3', 'wav', 'aac'],
      images: ['gif', 'jpg', 'png'], // Frame extraction
      gif: ['gif']
    }
  }
  
  if (inputCategory === 'audio') {
    return {
      audio: FILE_CATEGORIES.audio.formats.filter(f => f !== inputExt)
    }
  }
  
  if (inputCategory === 'documents') {
    return {
      documents: FILE_CATEGORIES.documents.formats.filter(f => f !== inputExt),
      images: ['pdf', 'jpg', 'png'], // For PDF to image
      text: ['txt']
    }
  }
  
  if (inputCategory === 'archives') {
    return {
      archives: FILE_CATEGORIES.archives.formats.filter(f => f !== inputExt),
      extract: true
    }
  }
  
  if (inputCategory === '3d') {
    return {
      '3d': FILE_CATEGORIES['3d'].formats.filter(f => f !== inputExt),
      viewer: true
    }
  }
  
  return {}
}

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

