
import './App.css'
import Page from './app/dashboard/page'
import { AlertProvider } from '@/components/alert-provider'

function App() {
  return (
    <>
      <AlertProvider>
        <div className="dark min-h-screen bg-background">
          <Page/>
        </div>
      </AlertProvider>
    </>
  )
}

export default App
