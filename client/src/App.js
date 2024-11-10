import { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './components/home/home'
import Login from './components/Login/login';
import Header from './components/header/header';
import routes from './routes'
import PageWrapper from './components/pagewrapper'
import Title from './components/title/title'

const getRoutes = (allRoutes) => allRoutes.map((route) => {
  if("children" in route){
    if(route.children.length != 0){
      return getRoutes(route.children);
    }
  }

  if(route.route){
    return <Route path={route.route} element={ route.component} key={route.key} />;
  }

  return null;
});

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');
  const [userid, setUserid] = useState(sessionStorage.getItem('userid') || 0);
  const [isAdmin, setisAdmin] = useState(sessionStorage.getItem('isAdmin') || 0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (newToken, newId, newAdmin) => {
    setToken(newToken);
    setUserid(newId);
    sessionStorage.setItem('token', newToken);
    sessionStorage.setItem('userid', newId);
    sessionStorage.setItem('isAdmin', newAdmin);
    navigate('/home');
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const getPath = (path) => {
    return path.split("/")[1];
  }

  const getSubPath = (path) => {
    var strs = path.split("/");
    console.log(strs);
    if(strs.length > 2)
      return strs[2];
    return null;
  }

  useEffect(() => {
    if (!token && location.pathname !== '/') {
        navigate('/');
    }
  }, [token, navigate, location.pathname]);

  var r;
  var r_sub;
  if(location.pathname !== "/"){
    r = routes.find(route => route.key === getPath(location.pathname));
    r_sub = r.children.find(sub => sub.key === getSubPath(location.pathname));
  }
  return (
    <div className="wrapper">
      <PageWrapper className={!token ? "login-background" : "home-background"}>
        {token && <Header userId={userid} isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />}
        <div className={`right-panel ${token ? !isSidebarVisible ? "collapsed" : "dashboard" : ""}`}>
        {token && <Title route={r} sub={r_sub}/>}
        <div className={token && "content-container"}>
          <Routes>
              <Route path="/"  element={ <Login onLogin={handleLogin} />} />      
              {getRoutes(routes)}
          </Routes>
          </div>
        </div>  
      </PageWrapper>
    </div>
  );
}

const WrappedApp = () => (
  <BrowserRouter>
      <App />
  </BrowserRouter>
);

export default WrappedApp;
