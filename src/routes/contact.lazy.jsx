import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import postContact from "../api/postContact";

// createLazyFileRoute membuat route "/contact" yang di-load secara lazy:
// kode halaman ini baru diunduh saat user membuka /contact, jadi bundle awal tetap kecil.
export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function ContactRoute() {
  // useQuery dipakai untuk mengambil data, sedangkan useMutation dipakai untuk mengubah/mengirim data ke server (POST, PUT, DELETE).
  // mutation berisi status (isSuccess, isPending, isError, dll) dan fungsi mutate untuk menjalankan mutationFn.
  const mutation = useMutation({
    // mutationFn menerima argumen yang kita kirim lewat mutate().
    // Di sini argumennya event dari form, karena mutate langsung dipasang di onSubmit.
    mutationFn: function (e) {
      // Cegah browser me-reload halaman saat form di-submit.
      e.preventDefault();

      // FormData membaca semua isi field di form berdasarkan atribut name-nya.
      const formData = new FormData(e.target);

      // Kirim datanya ke server lewat postContact, hasilnya (Promise) dikelola oleh React Query.
      return postContact(
        formData.get("name"),
        formData.get("email"),
        formData.get("message"),
      );
    },
  });

  return (
    <div className="contact">
      <h2>Contact</h2>
      {/* Kalau mutation sukses, tampilkan pesan terkirim. Kalau belum, tampilkan form. */}
      {mutation.isSuccess ? (
        <h3>Terkirim!</h3>
      ) : (
        // mutate dipanggil saat form di-submit, event-nya diteruskan ke mutationFn.
        <form onSubmit={mutation.mutate}>
          <input name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <textarea name="message" placeholder="Message"></textarea>
          <button>Submit</button>
        </form>
      )}
    </div>
  );
}
