
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import router from './router/router.js'
import { RouterProvider } from 'react-router'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} >
       <App/>
    </RouterProvider>
  </Provider>,
)
