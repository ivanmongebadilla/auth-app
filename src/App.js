import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import HotelDetailPage from './pages/HotelDetailPage';


const router = createBrowserRouter([
  { 
    path: '/',
    element: <MainPage />
  },
  {
    path: '/:hotelId',
    element: <HotelDetailPage />
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
