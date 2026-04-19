// --- KONFIGURASI GLOBAL ---
let currentImgIndex = 1;
const totalImages = 16;
const imageExtension = 'png'; // Ganti jadi 'png' jika semua fotomu formatnya png

// --- FUNGSI LIGHTBOX (POP-UP) ---

function openLightbox(index) {
    currentImgIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        // Update gambar saat dibuka
        updateLightboxImage();
        
        // Tampilkan lightbox
        lightbox.style.display = 'flex';
        // Matikan scroll pada halaman utama
        document.body.style.overflow = 'hidden'; 
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        // Aktifkan kembali scroll
        document.body.style.overflow = 'auto'; 
    }
}

function changeImage(direction) {
    currentImgIndex += direction;
    
    // Logika berputar (Looping)
    if (currentImgIndex > totalImages) {
        currentImgIndex = 1;
    } else if (currentImgIndex < 1) {
        currentImgIndex = totalImages;
    }
    
    updateLightboxImage();
}

// Fungsi internal untuk memperbarui source gambar
function updateLightboxImage() {
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) {
        // Set source gambar berdasarkan index
        lightboxImg.src = `img/foto${currentImgIndex}.${imageExtension}`;
        
        // Fallback jika gambar tidak ditemukan di folder img/
        lightboxImg.onerror = function() {
            this.src = `https://via.placeholder.com/800x600?text=Foto+${currentImgIndex}`;
        };
    }
}

// --- EVENT LISTENERS ---

// 1. Menutup lightbox jika klik area luar (area hitam)
window.onclick = function(event) {
    const lightbox = document.getElementById('lightbox');
    if (event.target == lightbox) {
        closeLightbox();
    }
};

// 2. Efek Transparansi Navbar saat Scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = '#1a1c1e';
            navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(35,37,39,0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// 3. Logika Hamburger Menu Mobile
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

if (menu && menuLinks) {
    menu.addEventListener('click', function() {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });

    // Tutup menu otomatis saat link diklik
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('is-active');
            menuLinks.classList.remove('active');
        });
    });
}

// 4. Kontrol Keyboard (ESC, Panah Kiri, Panah Kanan)
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    
    // Hanya jalankan jika lightbox sedang terbuka
    if (lightbox && lightbox.style.display === 'flex') {
        if (e.key === "Escape") {
            closeLightbox();
        }
        if (e.key === "ArrowLeft") {
            changeImage(-1);
        }
        if (e.key === "ArrowRight") {
            changeImage(1);
        }
    }
});