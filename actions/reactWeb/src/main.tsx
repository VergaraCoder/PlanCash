import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Navegation } from './navegation/navegation.tsx'
import { Router } from './routes/routes.ts'
import { RouterProvider } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navegation/>
    <RouterProvider router={Router} />
  </StrictMode>,
)
