
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Feedback from './pages/Feedback';

function App() {

  return (
    <Router>
        <Routes>
          <Route path= "/" element = { < Dashboard /> } />
          <Route path= "/feedback" element = { < Feedback /> } />
          < Route path = "*" element = { <h1>Invalid Route</h1>} />
        </Routes>
    </Router>
  )
}

export default App;
