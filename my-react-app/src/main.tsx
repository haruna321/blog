import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PostList from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostList />
  </StrictMode>,
)
