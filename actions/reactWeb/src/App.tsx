import { useState } from 'react'

import { Layout } from './components/layout/layout'
import { NavLink } from 'react-router'
import { PrincipalScreen } from './pages/main/FirstScreen'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Layout>
      <PrincipalScreen/>
    </Layout>
  )
}

export default App
