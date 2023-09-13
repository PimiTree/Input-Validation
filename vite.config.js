import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { defineConfig } from "vite";

export default defineConfig(() => {
    return {
      base: "",
      root: './src',
      build: {
        outDir: '../dist',
        assetsDir: 'img',
        rollupOptions: {
          output: {
            entryFileNames: 'js/[name].js',
            chunkFileNames: 'js/[name].js',
            assetFileNames: assetInfo => {
              const info = assetInfo.name.split('.');
              const extType = info[info.length - 1];
              if (/\.(png|jpe?g|gif|svg|webp|webm|mp3)$/.test(assetInfo.name)) {
                return `img/[name]-[hash].${extType}`;
              }
              if (/\.(css)$/.test(assetInfo.name)) {
                return `css/[name].${extType}`;
              }
              if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name)) {
                return `fonts/[name].${extType}`;
              }
              return `[name].${extType}`;
            },
          },
        },
      },
      plugins: [
        ViteImageOptimizer(),
       
    ],
    
   
    }
})




