import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import MediaDetail from './components/MediaDetail.tsx';
import { Provider } from 'react-redux'

import App from './App.tsx'
import store from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/media/:imdbId" element={<MediaDetail />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
