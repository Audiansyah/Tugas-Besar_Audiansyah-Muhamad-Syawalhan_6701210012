const express = require('express');
const cors = require('cors');

const port = 3000;
const app = express();

// Middleware untuk mengizinkan permintaan dari alamat asal tertentu
app.use(cors());

// Parsing body request
app.use(express.json());

// Data siswa (contoh data sederhana)
let siswas = [
	{ id: 1, nisn: '1234567890', nama: 'audi', kelas: 'XII-A' },
	{ id: 1, nisn: '1234567891', nama: 'Muhamad', kelas: 'XII-B' },
	{ id: 1, nisn: '1234567892', nama: 'Syawal', kelas: 'XII-C' },
];

// GET: Mendapatkan semua data siswa
app.get('/siswa', (req, res) => {
	res.json(siswas);
});

// GET: Mendapatkan data siswa berdasarkan ID
app.get('/siswa/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const siswa = siswas.find((g) => g.id === id);
	if (siswa) {
		res.json(siswa);
	} else {
		res.status(404).json({ message: 'siswa tidak ditemukan' });
	}
});

// POST: Menambahkan data siswa baru
app.post('/siswa', (req, res) => {
	const siswa = req.body;
	siswa.id = siswas.length + 1;
	siswas.push(siswa);
	res.status(201).json(siswa);
});

// PUT: Mengupdate data siswa berdasarkan ID
app.put('/siswa/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const siswaIndex = siswas.findIndex((g) => g.id === id);
	if (siswaIndex !== -1) {
		siswas[siswaIndex] = { ...siswas[siswaIndex], ...req.body };
		res.json(siswas[siswaIndex]);
	} else {
		res.status(404).json({ message: 'siswa tidak ditemukan' });
	}
});

// DELETE: Menghapus data siswa berdasarkan ID
app.delete('/siswa/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const siswaIndex = siswas.findIndex((g) => g.id === id);
	if (siswaIndex !== -1) {
		const siswa = siswas[siswaIndex];
		siswas.splice(siswaIndex, 1);
		res.json(siswa);
	} else {
		res.status(404).json({ message: 'siswa tidak ditemukan' });
	}
});

// Jalankan server
app.listen(port, () => {
	console.log(`Server berjalan di http://localhost:${port}`);
});
