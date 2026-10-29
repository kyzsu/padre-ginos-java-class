import { Link } from "@tanstack/react-router";
import { Component } from "react";

// ErrorBoundary itu komponen yang menangkap error saat proses render di komponen-komponen anaknya,
// lalu menampilkan UI cadangan (fallback) supaya seluruh aplikasi tidak blank/crash.
// Sampai sekarang error boundary hanya bisa dibuat lewat class component, belum ada versi hook-nya.
class ErrorBoundary extends Component {
  // state awal: belum ada error.
  state = { hasError: false };

  // Dipanggil React saat ada anak yang melempar error ketika render.
  // Return value-nya otomatis menjadi state baru, jadi hasError berubah jadi true dan render ulang menampilkan fallback.
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Dipanggil setelah error tertangkap, tempat yang tepat untuk side effect seperti logging.
  // error berisi detail error-nya, info berisi component stack (komponen mana yang bermasalah).
  // Di aplikasi nyata, ini biasanya dikirim ke layanan monitoring seperti Sentry atau TrackJS.
  componentDidCatch(error, info) {
    console.error("Error Boundary menangkap error", error, info);
  }

  render() {
    // Kalau ada error, tampilkan UI fallback berisi pesan dan link kembali ke beranda.
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Waduh!</h2>
          <p>
            Telah terjadi error pada list ini.{" "}
            {/* Link dari TanStack Router: pindah halaman tanpa reload penuh */}
            <Link to={"/"}>Click disini</Link> untuk kembali ke beranda.
          </p>
        </div>
      );
    }

    // Kalau tidak ada error, render anak-anaknya seperti biasa.
    return this.props.children;
  }
}

export default ErrorBoundary;
