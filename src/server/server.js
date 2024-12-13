const { createServer } = require('http');
const { Server } = require('socket.io');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, // Tambahkan port di sini
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi MySQL gagal:', err);
    return;
  }
  console.log('Terhubung ke MySQL');
});

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log('Pengguna terhubung:', socket.id);

  // Kirim pesan sebelumnya dari database ke pengguna yang baru terhubung
  db.query('SELECT * FROM messages ORDER BY timestamp DESC LIMIT 50', (err, results) => {
    if (err) {
      console.error('Gagal mengambil pesan:', err);
      return;
    }
    socket.emit('previousMessages', results);
  });

  socket.on('joinChat', (username) => {
    console.log(`${username} telah bergabung!`);
    socket.username = username;
  });

  socket.on('sendMessage', (msg) => {
    const { message } = msg;
    const username = socket.username || 'Anonymous';

    // Simpan pesan ke database
    const query = 'INSERT INTO messages (user, message) VALUES (?, ?)';
    db.query(query, [username, message], (err, result) => {
      if (err) {
        console.error('Gagal menyimpan pesan:', err);
        return;
      }
      console.log('Pesan tersimpan');

      const newMessage = {
        id: result.insertId,
        user: username,
        message,
        timestamp: new Date(),
      };

      // Broadcast pesan baru ke semua pengguna
      io.emit('receiveMessage', newMessage);
    });
  });

  socket.on('disconnect', () => {
    console.log(`${socket.username || 'Pengguna'} terputus`);
  });
});

const ipAddress = '192.168.18.230'; // Ganti dengan alamat IP kamu
server.listen(3001, ipAddress, () => {
  console.log(`Server berjalan di http://${ipAddress}:3001`);
});
