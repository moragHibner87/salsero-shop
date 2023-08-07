import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig(({mode}) => {
  const env = dotenv.config({
    path: `.env.${mode}`,
  }).parsed;

  return {
    plugins: [react()],
    define: {
      'process.env': env
    },
  };
  
})
