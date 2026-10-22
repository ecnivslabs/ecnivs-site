import { mountPage } from './lib/mount-page'
import './index.css'
import App from './App.tsx'
import { initAnalytics } from './lib/analytics'

initAnalytics()

mountPage(<App />)
