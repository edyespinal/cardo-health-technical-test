import { createEmotionCache, MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './styles/index.css'
import { theme } from './styles/theme'
import { components } from './styles/theme/components'

const emotionCache = createEmotionCache({
  key: 'mantine',
  prepend: false,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        ...theme,
        components,
      }}
      withNormalizeCSS
      emotionCache={emotionCache}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
)
