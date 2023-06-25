import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './containers/pages/Home';
import Create from './containers/pages/Create';
import BannerAccount from './containers/pages/MyNFT';
import { AuthProvider } from './context/authContext';
import { Login } from './containers/auth/Login';
import { Register } from './containers/auth/Register';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Error Display */}
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/create' element={<Create/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/mynft' element={<BannerAccount/>}/>
        </Routes>
      </Router>
    </AuthProvider>
      
  );
}

export default App;
