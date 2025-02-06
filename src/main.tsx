import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import { HomePage, MediaDetailePage } from './pages'
import { Provider } from 'react-redux'


import store from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/media/:imdbId" element={<MediaDetailePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
