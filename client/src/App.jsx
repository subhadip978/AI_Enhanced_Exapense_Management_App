import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import Transection from './pages/Transection';
import Header from './components/ui/Header';
import { AuthContext } from './context/AuthContext';
import TransectionHistory from './pages/TransectionHistory';
import Leaderboard from './pages/Leaderboard';
import { Toaster } from 'react-hot-toast';
// Toaster


const App = () => {
  const { currentUser } = useContext(AuthContext); 

  const Layout = () => {
   return (
     <div>
       <Header />
        <Outlet /> 
     </div>
   );
 };
  
  
   const ProtectedRoute = ({ children }) => {
   
     if (!currentUser) {
       return <Navigate to="/login" />; 
     }
     return children;
   };

  return (
    
    <Routes>
       
         <Route
          path="/"
          element={
             <ProtectedRoute>
              <Layout />
              </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/transection/:id" element={<Transection />} />
          <Route path="/expense" element={<TransectionHistory/>} />
          <Route path="/leaderboard" element={<Leaderboard/>}></Route>
        </Route> 


        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/logout"  element={< />}/> */}
        
      </Routes>
   
  );
};

export default App;
