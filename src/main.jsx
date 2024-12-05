import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home.jsx';
import Shop from './pages/shop/shop.jsx'
import About from './pages/about/About.jsx'
import Contact from './pages/contact/Contact.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children : [
      {
        path: '/',
        element:<Home/>,
      },
      {
        path: '/about',
        element:<About/>,
      },
      {
        path: '/contact',
        element:<Contact/>,
      },
      {
        path: '/shop',
        element:<Shop/>,
      },
      {
        path: '/register',
        element: <h1>Home</h1>,
      },

    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
