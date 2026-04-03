// File: src/services/OrderService.js
import axios from 'axios';

// Ini adalah alamat URL backend yang kita buat tadi
const API_URL = 'http://localhost:3000/api/orders';

export const checkoutOrder = async (orderData) => {
    try {
        // Mengirim data JSON ke backend menggunakan metode POST
        const response = await axios.post(`${API_URL}/checkout`, orderData);
        return response.data;
    } catch (error) {
        console.error("Gagal melakukan checkout:", error);
        throw error;
    }
};