import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// plugins: [react()] digunakan untuk mengintegrasikan plugin React ke dalam konfigurasi Vite. Plugin ini memungkinkan Vite untuk memahami sintaks JSX dan mengoptimalkan proses build untuk aplikasi React. Dengan menambahkan plugin ini, kita dapat menggunakan fitur-fitur React seperti JSX, hooks, dan lainnya dalam proyek Vite kita.
// server: { proxy: { ... } } digunakan untuk mengatur proxy server dalam konfigurasi Vite. Proxy server ini memungkinkan kita untuk mengarahkan permintaan API dari aplikasi frontend ke server backend yang berbeda, sehingga kita dapat menghindari masalah CORS (Cross-Origin Resource Sharing) saat mengembangkan aplikasi. Dalam contoh ini, permintaan yang diawali dengan "/api" dan "/public" akan diteruskan ke "http://localhost:3000", yang merupakan alamat server backend lokal. Dengan pengaturan ini, kita dapat dengan mudah mengembangkan aplikasi frontend dan backend secara bersamaan tanpa harus khawatir tentang masalah lintas domain.
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/public": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  plugins: [TanStackRouterVite(), react()],
});
