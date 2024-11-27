import { useState } from 'react'

import { Layout } from './components/layout/layout'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Layout>
      <div>
        <h1>
          Estamos en el main
        </h1>
      </div>
    </Layout>
  )
}

export default App
