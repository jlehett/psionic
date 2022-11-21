import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        global: {},
    },
    resolve: {
        alias: {
            '@assets': resolve(__dirname, './src/assets'),
            '@components': resolve(__dirname, './src/components'),
            '@contexts': resolve(__dirname, './src/contexts'),
            '@hooks': resolve(__dirname, './src/hooks'),
            '@styles': resolve(__dirname, './src/styles'),
            '@utils': resolve(__dirname, './src/utils'),
        }
    },
    plugins: [
        react(),
        svgr({
            exportAsDefault: true,
        }),
    ],
    build: {
        lib: {
            entry: './src/index.js',
            formats: ["es", "cjs"],
            fileName: 'index',
            name: 'index',
        },
        rollupOptions: {
            external: ["react", "react-dom"],
        }
    },
})
