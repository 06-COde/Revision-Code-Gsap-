import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import Accordian from './Components/Accordian';
import OtpGenerator from './Components/OtpGenerator';

const appRoute = createBrowserRouter([
  {
    path: '/',
    element: <Home />,  // 🏠 Home page content
  },
  {
    path: '/accordian',
    element: <Accordian />,
  },
  {
    path: "/otp",
    element: <OtpGenerator/>
  }
]);

function App() {
  return <RouterProvider router={appRoute} />;
}

export default App;
