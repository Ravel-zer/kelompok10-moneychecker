// Fungsi untuk menampilkan semua transaksi dalam tabel
function displayTransactions() {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const tbody = document.getElementById("displayTransaction");

  // Membersihkan isi tbody sebelum menambahkan baris baru
  tbody.innerHTML = "";

  // Perulangan untuk setiap transaksi
  transactions.forEach((transaction, index) => {
    // Buat sebuah baris baru untuk tabel
    const row = document.createElement("tr");

    // Buat sel-sel untuk deskripsi, jumlah, dan tombol hapus
    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = transaction.description;
    const amountCell = document.createElement("td");
    amountCell.textContent = transaction.amount;
    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTransaction(index)); // Menambahkan event listener untuk tombol hapus
    deleteCell.appendChild(deleteButton);

    // Tambahkan sel-sel ke dalam baris
    row.appendChild(descriptionCell);
    row.appendChild(amountCell);
    row.appendChild(deleteCell);

    // Tambahkan baris ke dalam tbody
    tbody.appendChild(row);
  });
}

// Fungsi untuk menghapus transaksi
function deleteTransaction(index) {
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions.splice(index, 1); // Menghapus transaksi dari array berdasarkan indeks
  localStorage.setItem("transactions", JSON.stringify(transactions)); // Simpan kembali array transaksi ke dalam localStorage
  displayTransactions(); // Perbarui tampilan tabel setelah penghapusan
}

// Fungsi untuk menangani pengiriman form
function handleFormSubmit(event) {
  event.preventDefault();
  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;

  // Ambil data transaksi yang sudah ada di localStorage atau buat array kosong jika belum ada
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  // Tambahkan transaksi baru ke dalam array
  transactions.push({ description, amount });

  // Simpan kembali array transaksi ke dalam localStorage
  localStorage.setItem("transactions", JSON.stringify(transactions));

  // Bersihkan input form
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";

  // Muat ulang halaman untuk menampilkan transaksi terbaru
  location.reload();
}

// Tambahkan event listener ke form di income.html
const moneyForm = document.getElementById("moneyForm");
if (moneyForm) {
  moneyForm.addEventListener("submit", handleFormSubmit);
}

// Panggil fungsi tampilan saat halaman dimuat
document.addEventListener("DOMContentLoaded", displayTransactions);
