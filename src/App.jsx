import { Routes, Route } from 'react-router-dom'
import PageOne from './pages/PageOne'
import PageTwo from './pages/PageTwo'
import PageThree from './pages/PageThree'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PageOne />} />
      <Route path="/processing" element={<PageTwo />} />
      <Route path="/editor" element={<PageThree />} />
    </Routes>
  )
}
