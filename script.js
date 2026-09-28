let semuaHewan = [];
let semuaKebutuhan = [];
let keranjang = [];
let tipeAktif = "all";
let kategoriAktif = "all";

const petContainer = document.getElementById("petContainer");
const needsContainer = document.getElementById("needsContainer");
const search = document.getElementById("search");
const filterButtons = document.querySelectorAll(".filter-btn");

function formatRupiah(nilai) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(nilai);
}

function normalisasiText(value = "") {
    return value.toLowerCase();
}

function ambilAsal(value) {
    if (!value) {
        return "Tidak diketahui";
    }

    if (typeof value === "string") {
        return value;
    }

    if (Array.isArray(value)) {
        return value.join(", ");
    }

    if (typeof value === "object") {
        if (value.name) {
            return value.name;
        }

        if (value.country) {
            return value.country;
        }

        return Object.values(value)
            .filter(Boolean)
            .join(", ");
    }

    return String(value);
}

async function ambilDataHewan() {
    try {
        petContainer.innerHTML = "<p>Sedang memuat koleksi hewan...</p>";

        const dogResponse = await fetch("https://dogapi.dog/api/v2/breeds?page[size]=20");
        const dogData = dogResponse.ok ? await dogResponse.json() : { data: [] };

        const anjing = (dogData.data || []).map((item) => ({
            id: item.id,
            type: "dog",
            name: item.attributes.name,
            origin: ambilAsal(item.attributes.origin),
            description: item.attributes.description || "Ras favorit yang cocok untuk keluarga.",
            needs: "Makanan sehat, kalung, mainan, dan kebutuhan harian yang nyaman.",
            life: item.attributes.life,
            weight: item.attributes.male_weight || item.attributes.female_weight,
            price: 2500000,
            image: `https://dogapi.dog/api/v2/breeds/${item.id}/image`
        }));

        const kucing = [
            {
                id: "persian",
                type: "cat",
                name: "Persian",
                origin: "Iran",
                description: "Kucing berbulu panjang dengan karakter tenang dan anggun.",
                needs: "Aksesoris lembut, sisir bulu, tempat tidur, dan kebutuhan harian yang nyaman.",
                life: { min: 12, max: 17 },
                weight: { min: 3, max: 6 },
                price: 2200000,
                image: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=900&q=80"
            },
            {
                id: "siamese",
                type: "cat",
                name: "Siamese",
                origin: "Thailand",
                description: "Kucing aktif, cerdas, dan sangat sosial dengan suara khas.",
                needs: "Aksesoris aktif, box pasir, mainan interaktif, dan kebutuhan harian yang aman.",
                life: { min: 10, max: 15 },
                weight: { min: 3, max: 5 },
                price: 2400000,
                image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=900&q=80"
            },
            {
                id: "maine-coon",
                type: "cat",
                name: "Maine Coon",
                origin: "Amerika Serikat",
                description: "Kucing besar, ramah, dan sangat cocok untuk keluarga.",
                needs: "Aksesoris empuk, selimut hangat, serta kebutuhan harian yang nyaman untuk keluarga.",
                life: { min: 12, max: 18 },
                weight: { min: 5, max: 8 },
                price: 2600000,
                image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=80"
            },
            {
                id: "british-shorthair",
                type: "cat",
                name: "British Shorthair",
                origin: "Inggris",
                description: "Kucing berbadan tegap, lembut, dan mudah beradaptasi.",
                needs: "Aksesoris grooming, mainan ringan, dan kebutuhan harian yang mendukung keseharian.",
                life: { min: 12, max: 16 },
                weight: { min: 4, max: 7 },
                price: 2300000,
                image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80"
            },
            {
                id: "ragdoll",
                type: "cat",
                name: "Ragdoll",
                origin: "Amerika Serikat",
                description: "Kucing kalem, penyayang, dan patuh dengan karakter lembut.",
                needs: "Aksesoris lembut, tempat tidur empuk, dan kebutuhan harian yang nyaman.",
                life: { min: 12, max: 18 },
                weight: { min: 4, max: 9 },
                price: 2700000,
                image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=900&q=80"
            }
        ];

        semuaHewan = [...anjing, ...kucing];
        semuaKebutuhan = [
            {
                id: "dog-accessory-1",
                type: "dog",
                category: "Aksesoris",
                name: "Collar & Leash Set",
                description: "Set kalung dan tali pengendali yang nyaman untuk aktivitas harian.",
                price: 140000,
                image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80"
            },
            {
                id: "dog-cage-1",
                type: "dog",
                category: "Kandang",
                name: "Kandang Anjing Portable",
                description: "Kandang ringan dan aman untuk istirahat dan perjalanan.",
                price: 680000,
                image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80"
            },
            {
                id: "cat-accessory-1",
                type: "cat",
                category: "Aksesoris",
                name: "Box Pasir & Sisir",
                description: "Perlengkapan kebersihan dan grooming yang tepat untuk kebutuhan harian.",
                price: 180000,
                image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=900&q=80"
            },
            {
                id: "cat-cage-1",
                type: "cat",
                category: "Kandang",
                name: "Rumah Kucing Minimalis",
                description: "Kandang nyaman dengan ruang tidur dan area bermain untuk kucing.",
                price: 720000,
                image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=900&q=80"
            }
        ];

        tampilkanHewan();
        tampilkanKebutuhan();

    } catch (error) {
        petContainer.innerHTML = "<p>Gagal memuat koleksi hewan. Coba lagi beberapa saat.</p>";
        needsContainer.innerHTML = "<p>Gagal memuat kebutuhan pet. Coba lagi beberapa saat.</p>";
        console.error(error);
    }
}

function tampilkanHewan(data = semuaHewan) {
    const keyword = normalisasiText(search.value);
    const hasil = data.filter((animal) => {
        const cocokJenis = tipeAktif === "all" || animal.type === tipeAktif;
        const cocokPencarian =
            normalisasiText(animal.name).includes(keyword) ||
            normalisasiText(animal.origin).includes(keyword) ||
            normalisasiText(animal.description).includes(keyword);

        return cocokJenis && cocokPencarian;
    });

    petContainer.innerHTML = "";

    if (hasil.length === 0) {
        petContainer.innerHTML = "<p>Hewan yang Anda cari belum tersedia.</p>";
        return;
    }

    hasil.forEach(function(animal) {
        const card = document.createElement("div");
        card.className = "pet-card";

        const tipeLabel = animal.type === "dog" ? "Anjing" : "Kucing";

        card.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}">
            <div class="pet-info">
                <div class="pet-meta">
                    <span class="animal-badge">${tipeLabel}</span>
                    <span class="pet-origin">${animal.origin}</span>
                </div>

                <h3>${animal.name}</h3>
                <p>${animal.description}</p>
                <p>Umur: ${animal.life.min} - ${animal.life.max} tahun</p>
                <p>Berat: ${animal.weight.min} - ${animal.weight.max} kg</p>
                <p class="pet-needs"><strong>Kebutuhan:</strong> ${animal.needs}</p>

                <div class="harga">${formatRupiah(animal.price)}</div>

                <button onclick="tambahKeranjang('${animal.id}', '${animal.type}')">
                    + Tambah ke Keranjang
                </button>
            </div>
        `;

        petContainer.appendChild(card);
    });
}

function tampilkanKebutuhan(data = semuaKebutuhan) {
    const keyword = normalisasiText(search.value);
    const hasil = data.filter((item) => {
        const cocokJenis = tipeAktif === "all" || item.type === tipeAktif;
        const cocokKategori = kategoriAktif === "all" || item.category === kategoriAktif;
        const cocokPencarian =
            normalisasiText(item.name).includes(keyword) ||
            normalisasiText(item.category).includes(keyword) ||
            normalisasiText(item.description).includes(keyword) ||
            normalisasiText(item.type === "dog" ? "anjing" : "kucing").includes(keyword);

        return cocokJenis && cocokKategori && cocokPencarian;
    });

    needsContainer.innerHTML = "";

    if (hasil.length === 0) {
        needsContainer.innerHTML = "<p>Pilihan kebutuhan pet untuk pencarian ini belum tersedia.</p>";
        return;
    }

    hasil.forEach(function(item) {
        const card = document.createElement("div");
        card.className = "need-card";

        const tipeLabel = item.type === "dog" ? "Anjing" : "Kucing";

        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="need-info">
                <span class="need-badge">${tipeLabel} • ${item.category}</span>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="harga">${formatRupiah(item.price)}</div>
                <button onclick="tambahKeranjangKebutuhan('${item.id}', '${item.type}', '${item.category}')">
                    + Tambah ke Keranjang
                </button>
            </div>
        `;

        needsContainer.appendChild(card);
    });
}

search.addEventListener("input", function() {
    tampilkanHewan(semuaHewan);
    tampilkanKebutuhan(semuaKebutuhan);
});

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        if (button.classList.contains("need-filter")) {
            kategoriAktif = button.dataset.category;
        } else {
            tipeAktif = button.dataset.type;
        }

        filterButtons.forEach(function(item) {
            const sameCategory = item.classList.contains("need-filter") && item.dataset.category === kategoriAktif;
            const sameType = !item.classList.contains("need-filter") && item.dataset.type === tipeAktif;
            item.classList.toggle("active", sameCategory || sameType);
        });

        tampilkanHewan(semuaHewan);
        tampilkanKebutuhan(semuaKebutuhan);
    });
});

function tambahKeranjang(id, type) {
    const animal = semuaHewan.find(function(item) {
        return item.id === id && item.type === type;
    });

    if (!animal) {
        return;
    }

    keranjang.push(animal);
    updateKeranjang();

    alert(`${animal.name} berhasil ditambahkan ke keranjang.`);
}

function tambahKeranjangKebutuhan(id, type, category) {
    const item = semuaKebutuhan.find(function(product) {
        return product.id === id && product.type === type && product.category === category;
    });

    if (!item) {
        return;
    }

    keranjang.push(item);
    updateKeranjang();

    alert(`${item.name} berhasil ditambahkan ke keranjang.`);
}

function updateKeranjang() {
    document.getElementById("jumlahKeranjang").textContent = keranjang.length;

    const area = document.getElementById("keranjang");
    area.innerHTML = "";

    if (keranjang.length === 0) {
        area.innerHTML = "<p>Keranjang masih kosong.</p>";
        document.getElementById("total").textContent = "Rp 0";
        return;
    }

    keranjang.forEach(function(animal, index) {
        const item = document.createElement("div");
        item.className = "cart-item";

        const label = animal.type === "dog" ? "🐶" : "🐱";
        const namaProduk = animal.category ? `${animal.category} - ${animal.name}` : animal.name;

        item.innerHTML = `
            <div>
                ${label}
                ${namaProduk}
                <br>
                ${formatRupiah(animal.price)}
            </div>

            <button onclick="hapusKeranjang(${index})">Hapus</button>
        `;

        area.appendChild(item);
    });

    const total = keranjang.reduce(function(sum, animal) {
        return sum + animal.price;
    }, 0);

    document.getElementById("total").textContent = formatRupiah(total);
}

function hapusKeranjang(index) {
    keranjang.splice(index, 1);
    updateKeranjang();
}

function bukaKeranjang() {
    document.getElementById("modal").style.display = "flex";
}

function tutupKeranjang() {
    document.getElementById("modal").style.display = "none";
}

function pesanSekarang() {
    if (keranjang.length === 0) {
        alert("Keranjang masih kosong, pilih hewan dulu ya.");
        return;
    }

    alert("Terima kasih! Pesanan Anda sedang diproses.");
}

ambilDataHewan();