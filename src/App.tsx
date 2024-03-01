import './App.css';
import charStatsJSON from './general_logic/data/hsr_char_stats.json';
import LandingPage from './components/specific_pages/LandingPage';
import Simulator from './components/specific_pages/Simulator';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: '/sim',
    element: <Simulator />
  }
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;