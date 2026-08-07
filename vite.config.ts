import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 8446 keeps clear of the sibling projects in C:\WebProjects — GreyEdge on 8444,
// SkinProtocolRX on 8443/8445, RKidds on 8765 — so they can all run at once.
const PORT = Number(process.env.PORT ?? 8446)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: PORT,
    // Fail loudly on a collision rather than drifting to the next free port, which
    // would leave run.bat opening a browser tab pointed at nothing.
    strictPort: true,
    host: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
