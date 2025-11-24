import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { FileProvider } from './contexts/FileContext'
import Home from './pages/Home'
import FormatSelection from './pages/FormatSelection'
import Conversion from './pages/Conversion'
import Results from './pages/Results'
import Settings from './pages/Settings'

function App() {
  return (
    <ThemeProvider>
      <FileProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/format-selection" element={<FormatSelection />} />
            <Route path="/conversion" element={<Conversion />} />
            <Route path="/results" element={<Results />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </FileProvider>
    </ThemeProvider>
  )
}

export default App

