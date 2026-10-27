import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// plugins: [react()] digunakan untuk mengintegrasikan plugin React ke dalam konfigurasi Vite. Plugin ini memungkinkan Vite untuk memahami sintaks JSX dan mengoptimalkan proses build untuk aplikasi React. Dengan menambahkan plugin ini, kita dapat menggunakan fitur-fitur React seperti JSX, hooks, dan lainnya dalam proyek Vite kita.
export default defineConfig({
  plugins: [react()],
});
