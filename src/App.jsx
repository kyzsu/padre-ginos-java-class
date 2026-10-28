import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";

// routeTree itu hasil generate otomatis dari TanStack Router (isinya semua route di folder routes).
// createRouter mengubah routeTree tersebut jadi router yang siap dipakai.
const router = createRouter({ routeTree });

// QueryClient itu "otak" dari React Query: tempat menyimpan cache dan mengatur proses fetching data.
// Dibuat sekali di luar komponen supaya tidak terbuat ulang setiap App di-render.
const queryClient = new QueryClient();

const App = () => {
  return (
    // StrictMode memberikan extra warning dan hanya aktif saat development (di production tidak ada efeknya).
    // Karena itu, di development React akan menjalankan render/effect komponen kita dua kali untuk membantu menemukan bug.
    <StrictMode>
      {/* QueryClientProvider membagikan queryClient ke semua komponen, jadi useQuery bisa dipakai di mana saja */}
      <QueryClientProvider client={queryClient}>
        {/* RouterProvider yang menjalankan router: mencocokkan URL dengan route, lalu merender halamannya */}
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
};

// createRoot membuat root React di dalam elemen DOM yang kita tentukan.
// Ini cara baru menginisialisasi aplikasi React, menggantikan ReactDOM.render yang lama.
// Menerima satu argumen: elemen DOM tempat aplikasi akan dirender.
const container = document.getElementById("root");
const root = createRoot(container);

// render menampilkan komponen <App /> ke dalam root tersebut.
root.render(<App />);
