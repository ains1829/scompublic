import './index.css'
import './css/personaly.css'
import { Route, Routes } from 'react-router-dom'
import Feedback from './pages/Feedback'
import Signalement from './pages/Signalement'
import Contentpage from './content/Contentpage'
import Acceuil from './pages/Acceuil'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Contentpage />}>
          <Route path='/' element={<Acceuil />}></Route>
          <Route path='/feedback/:ref?' element={<Feedback />}></Route>
          <Route path='/signalment' element={<Signalement />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
