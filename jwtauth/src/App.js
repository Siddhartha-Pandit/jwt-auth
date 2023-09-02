import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Routes>
          <Route Component={HomePage} path="/" exact />
          <Route Component={LoginPage} path="/login" />
          <Route Component={Register} path="/register" />
        </Routes>
      </Router>
      {/* <LoginPage /> */}
    </div>
  );
}

export default App;