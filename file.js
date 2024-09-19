document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Buat dan tambahkan elemen style
    const style = document.createElement('style');
    style.textContent = `
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #FFE6E6;
        }
        h1, h2 {
            text-align: center;
            color: #333;
        }
        .form-container {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        .input-section,
        .result-section {
            width: 48%;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border: 2px solid #8A2BE2;
        }
        .section-divider {
            border-left: 2px solid #8A2BE2;
            margin: 0 10px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            color: #333;
        }
        input,
        textarea,
        select {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #FFC0CB;
            border-radius: 4px;
            background-color: #FFF0F5;
        }
        button {
            background-color: #FF69B4;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #FF1493;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #FFC0CB;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #FF69B4;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #FFF0F5;
        }
        .table-section {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border: 2px solid #8A2BE2;
        }
        tr.highlight {
            background-color: #FFCCCC !important;
        }
        tr.hidden {
            display: none;
        }
    `;
    document.head.appendChild(style);

    // Buat elemen formulir
    const form = document.createElement('form');
    form.innerHTML = `
        <h1>FORMULIR PENDAFTARAN KEGIATAN ALASKA BATCH 5</h1>
        <div class="form-container">
            <div class="input-section">
                <h2>INPUT DATA FORMULIR</h2>
                <label for="nama">Nama:</label>
                <input type="text" id="nama" required>
                
                <label for="nim">NIM:</label>
                <input type="text" id="nim" required>
                
                <label for="tanggal-lahir">Tanggal Lahir:</label>
                <input type="date" id="tanggal-lahir" required>
                
                <label for="semester">Semester:</label>
                <input type="text" id="semester" required>
                
                <label for="program-studi">Program Studi:</label>
                <select id="program-studi" required>
                    <option value="">Pilih Program Studi</option>
                    <option value="Pendidikan Guru Sekolah Dasar">Pendidikan Guru Sekolah Dasar</option>
                    <option value="Pendidikan Guru Pendidikan Anak Usia Dini">Pendidikan Guru Pendidikan Anak Usia Dini</option>
                    <option value="Pendidikan Perikanan dan Kelautan">Pendidikan Perikanan dan Kelautan</option>
                    <option value="Sistem Informasi Kelautan">Sistem Informasi Kelautan</option>
                    <option value="Logistik Kelautan">Logistik Kelautan</option>
                </select>
                
                <label for="alasan">Alasan mengikuti kepanitaan ini:</label>
                <textarea id="alasan" required></textarea>
                
                <button type="submit" id="submitBtn">Submit</button>
            </div>
            <div class="section-divider"></div>
            <div class="result-section">
                <h2>HASIL PENGISIAN FORMULIR</h2>
                <div id="result"></div>
            </div>
        </div>
        <div class="table-section" style="display: none;">
            <h2>SELURUH DATA PENDAFTAR</h2>
            <table id="data-table">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>NIM</th>
                        <th>Tanggal Lahir</th>
                        <th>Semester</th>
                        <th>Program Studi</th>
                        <th>Alasan</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    `;

    app.appendChild(form);

    const resultDiv = document.getElementById('result');
    const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    const submitBtn = document.getElementById('submitBtn');
    const programStudi = document.getElementById('program-studi');
    const alasan = document.getElementById('alasan');
    const tableSection = document.querySelector('.table-section');

    // Event 1: onload
    window.onload = () => {
        alert('Selamat datang di Formulir Pendaftaran Kegiatan ALASKA BATCH 5!');
    };

    // Event 2: onclick
    submitBtn.onclick = (e) => {
        e.preventDefault();
        const formData = {
            nama: document.getElementById('nama').value,
            nim: document.getElementById('nim').value,
            tanggalLahir: document.getElementById('tanggal-lahir').value,
            semester: document.getElementById('semester').value,
            programStudi: programStudi.value,
            alasan: alasan.value
        };

        displayResult(formData);
        addToTable(formData);
        form.reset();
        tableSection.style.display = 'block'; // Menampilkan tabel
    };

    // Event 3: onchange
    programStudi.onchange = () => {
        alert(`Anda telah memilih program studi: ${programStudi.value}`);
    };

    // Event 4: onmouseover
    submitBtn.onmouseover = () => {
        submitBtn.style.backgroundColor = '#FF1493';
    };
    submitBtn.onmouseout = () => {
        submitBtn.style.backgroundColor = '#FF69B4';
    };

    // Event 5: onkeyup
    alasan.onkeyup = () => {
        const remainingChars = 200 - alasan.value.length;
        alasan.setAttribute('placeholder', `Sisa karakter: ${remainingChars}`);
    };

    // Event 6: onmouseleave
    function addMouseLeaveEventToRow(row) {
        row.addEventListener('mouseleave', () => {
            row.classList.remove('highlight');
        });
    }

    function displayResult(data) {
        resultDiv.innerHTML = `
            <p><strong>Nama:</strong> ${data.nama}</p>
            <p><strong>NIM:</strong> ${data.nim}</p>
            <p><strong>Tanggal Lahir:</strong> ${data.tanggalLahir}</p>
            <p><strong>Semester:</strong> ${data.semester}</p>
            <p><strong>Program Studi:</strong> ${data.programStudi}</p>
            <p><strong>Alasan:</strong> ${data.alasan}</p>
        `;
    }

    function addToTable(data) {
        const row = dataTable.insertRow();
        row.classList.add('highlight');
        Object.values(data).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });

        // Menambahkan event double click untuk menyembunyikan baris
        row.ondblclick = () => {
            row.classList.add('hidden');
        };

        // Menambahkan event klik untuk menampilkan kembali baris
        row.onclick = () => {
            if (row.classList.contains('hidden')) {
                row.classList.remove('hidden');
            }
        };

        addMouseLeaveEventToRow(row);
    }
});