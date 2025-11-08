import legacy from '@vitejs/plugin-legacy';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint2';
import removeConsole from 'vite-plugin-remove-console';
import stylelint from 'vite-plugin-stylelint';

import _config from './_config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: _config.root,
  server: {
    host: _config.server.host,
    port: _config.server.port,
    open: _config.server.open,
    watch: {
      ignored: ['**/.stylelintcache', '**/.eslintcache'],
    },
  },
  preview: { port: _config.preview.port },
  plugins: [
    removeConsole({}),
    eslint({ cache: true }),
    stylelint(),
    legacy({ targets: _config.legacyTargets }),
  ],
  build: {
    sourcemap: true,
    minify: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, _config.root, 'index.html'),
        atomic: resolve(
          __dirname,
          _config.srcPath,
          'shared/uikit/atomic/bundle.js'
        ),
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.includes('atomic')) return 'assets/atomic.css';
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, _config.srcPath),
    },
  },
});
