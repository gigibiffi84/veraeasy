import path from "path"
import react from '@vitejs/plugin-react-swc'
import {defineConfig} from "vite"

export default defineConfig({
    server: {
        proxy: {
            '/api/veraeasy': {
                target: 'http://localhost:8888/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/veraeasy/, 'api'),
            },
            '/otp/api/veraeasy-verifier': {
                target: 'http://localhost:8889/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/otp\/api\/veraeasy-verifier/, 'api'),
            }
        }
    },
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
