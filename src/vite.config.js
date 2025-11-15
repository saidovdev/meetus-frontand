import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// mkcert endi kerak emas, uni olib tashlaymiz

// HTTPS backend manzilingizni kiriting
const BACKEND_URL = 'https://4865f3c8f43f.ngrok-free.app'; // Eslatma: ngrok har safar o'zgaradi!

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // mkcert() endi ishlatilmaydi
  ],
  
  server: {
    // HTTPS ni o'chirib qo'yamiz, oddiy HTTP ishlatamiz
    https: false,
    port: 5173,  
    
    // 🔥 Proksi sozlamasi (muhim qism)
    proxy: {
      // "/api/" bilan boshlangan barcha so'rovlar uchun
      '/api': {
        target: BACKEND_URL, // So'rov yuboriladigan manzil
        changeOrigin: true, // Host sarlavhasini o'zgartiradi
        secure: false, // SSL sertifikatini tekshirmaydi (ngrok uchun kerak)
      }
    }
  }
});