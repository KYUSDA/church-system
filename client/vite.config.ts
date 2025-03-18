import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.png', '**/*.jpg','**/*.JPG', '**/*.jpeg', '**/*.gif', '**/*.svg']
});
