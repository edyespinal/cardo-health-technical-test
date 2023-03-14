import { createEmotionCache, MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'
import { theme } from './theme'

const emotionCache = createEmotionCache({
  key: 'mantine',
  prepend: false,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      theme={theme}
      withGlobalStyles
      withNormalizeCSS
      emotionCache={emotionCache}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
)
