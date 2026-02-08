// Fungsi untuk smooth scroll ke section
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Tambahkan event listener ke link navigasi
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            scrollToSection(target);
        });
    });

    // Inisialisasi keranjang belanja (simulasi dengan localStorage)
    if (!localStorage.getItem('keranjang')) {
        localStorage.setItem('keranjang', JSON.stringify([]));
    }
    updateKeranjangDisplay();
});

// Fungsi untuk menambah item ke keranjang
function tambahKeKeranjang(nama, harga) {
    let keranjang = JSON.parse(localStorage.getItem('keranjang'));
    keranjang.push({ nama: nama, harga: harga });
    localStorage.setItem('keranjang', JSON.stringify(keranjang));
    updateKeranjangDisplay();
    alert(`${nama} telah ditambahkan ke keranjang!`);
}

// Fungsi untuk update tampilan keranjang (tampilkan di console atau tambahkan elemen HTML)
function updateKeranjangDisplay() {
    const keranjang = JSON.parse(localStorage.getItem('keranjang'));
    console.log('Keranjang saat ini:', keranjang);
    // Jika ingin tampilkan di HTML, tambahkan elemen seperti <div id="keranjang"></div> di HTML
    // document.getElementById('keranjang').innerHTML = `Item di keranjang: ${keranjang.length}`;
}

// Validasi form kontak
function validasiForm() {
    const nama = document.getElementById('nama').value;
    const pesan = document.getElementById('pesan').value;
    if (nama === '' || pesan === '') {
        alert('Harap isi nama dan pesan!');
        return false;
    }
    alert('Pesan berhasil dikirim!');
    // Reset form
    document.getElementById('nama').value = '';
    document.getElementById('pesan').value = '';
    return false; // Mencegah submit default
}

// Tambahkan event listener ke tombol pesan di menu
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.menu-item button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.parentElement.querySelector('h3').textContent;
            const hargaText = this.parentElement.querySelector('p').textContent;
            const harga = parseInt(hargaText.match(/\d+/)[0]) * 1000; // Ekstrak harga (misal Rp 15.000 -> 15000)
            tambahKeKeranjang(item, harga);
        });
    });

    // Event listener untuk form kontak
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            validasiForm();
        });
    }
});