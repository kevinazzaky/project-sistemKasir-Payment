// File: src/presentation/pages/POSPage.jsx
import { useState } from "react";
import { checkoutOrder } from "../../services/OrderService";

export default function POSPage() {
  const [cart, setCart] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const products = [
    { id: 1, name: "Kopi Gula Aren", price: 18000, icon: "☕" },
    { id: 2, name: "Roti Bakar Coklat", price: 15000, icon: "🍞" },
    { id: 3, name: "Kentang Goreng", price: 12000, icon: "🍟" },
    { id: 4, name: "Es Teh Manis", price: 8000, icon: "🍹" },
    { id: 5, name: "Mie Goreng Spesial", price: 25000, icon: "🍜" },
    { id: 6, name: "Burger Premium", price: 35000, icon: "🍔" },
    { id: 7, name: "Matcha Latte", price: 28000, icon: "🍵" },
    { id: 8, name: "Iced Americano", price: 22000, icon: "🧊" },
    { id: 9, name: "Croissant Butter", price: 24000, icon: "🥐" },
    { id: 10, name: "Nasi Goreng Seafood", price: 45000, icon: "🦐" },
    { id: 11, name: "Spaghetti Carbonara", price: 55000, icon: "🍝" },
    { id: 12, name: "Steak Wagyu A5", price: 185000, icon: "🥩" },
    { id: 13, name: "Salad Sayur Organik", price: 32000, icon: "🥗" },
    { id: 14, name: "Pizza Margherita", price: 75000, icon: "🍕" },
    { id: 15, name: "Lemon Tea Squash", price: 18000, icon: "🍋" },
    { id: 16, name: "Gelato Vanilla", price: 25000, icon: "🍨" },
  ];

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.productId === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (productId) => {
    const existingItem = cart.find((item) => item.productId === productId);
    if (existingItem.quantity === 1) {
      setCart(cart.filter((item) => item.productId !== productId));
    } else {
      setCart(
        cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
    }
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Keranjang masih kosong!");
    setIsProcessing(true);

    const orderData = {
      customerName: "Pelanggan VIP",
      totalAmount: totalAmount,
      paymentMethod: "CASH",
      items: cart,
    };

    try {
      const result = await checkoutOrder(orderData);
      alert(`🎉 BERHASIL! ${result.pesan}`);
      setCart([]);
    } catch (error) {
      alert("❌ Terjadi kesalahan saat menyimpan transaksi.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    // Latar belakang hitam pekat (#0a0a0a)
    <div className="flex h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Bagian Kiri: Daftar Produk */}
      <div className="flex-[2] p-8 overflow-y-auto custom-scrollbar">
        <h2 className="text-3xl font-bold mb-8 text-[#D4AF37] tracking-wider uppercase">
          Menu Eksklusif
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => addToCart(p)}
              // Kartu produk hitam sedikit lebih terang, dengan efek glow emas saat di-hover
              className="bg-[#141414] rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 border border-[#2a2a2a] hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] hover:border-[#D4AF37] active:scale-95"
            >
              <div className="text-5xl mb-4 grayscale hover:grayscale-0 transition-all">
                {p.icon}
              </div>
              <div className="text-lg font-semibold mb-2 text-white tracking-wide">
                {p.name}
              </div>
              <div className="text-[#D4AF37] font-bold text-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-4 py-1 rounded-full inline-block">
                Rp {p.price.toLocaleString("id-ID")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian Kanan: Struk / Keranjang */}
      <div className="flex-1 bg-[#0f0f0f] p-8 flex flex-col border-l border-[#222] shadow-2xl">
        <h2 className="text-2xl font-bold border-b border-[#333] pb-4 mb-6 text-white uppercase tracking-wider">
          Pesanan <span className="text-[#D4AF37]">VIP</span>
        </h2>

        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center text-[#555] mt-20 italic">
              Belum ada hidangan yang dipilih...
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-[#1a1a1a] p-4 rounded-xl mb-3 border border-[#2a2a2a]"
              >
                <div>
                  <h4 className="font-semibold text-gray-100 mb-1">
                    {item.name}
                  </h4>
                  <p className="text-[#D4AF37] text-sm">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>

                {/* Tombol Min dan Plus Emas */}
                <div className="flex items-center gap-3 bg-[#0a0a0a] rounded-lg p-1 border border-[#333]">
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="w-8 h-8 flex items-center justify-center bg-red-900/40 text-red-400 rounded hover:bg-red-600 hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="font-bold w-4 text-center text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-8 h-8 flex items-center justify-center bg-[#D4AF37]/20 text-[#D4AF37] rounded hover:bg-[#D4AF37] hover:text-black transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Ringkasan Pembayaran */}
        <div className="mt-6 pt-6 border-t border-[#333]">
          <div className="flex justify-between text-xl mb-6 text-gray-300">
            <span className="uppercase tracking-wider font-semibold">
              Total
            </span>
            <span className="text-[#D4AF37] font-bold text-2xl">
              Rp {totalAmount.toLocaleString("id-ID")}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isProcessing || cart.length === 0}
            // Tombol gradasi emas ke perunggu, teks hitam agar kontras
            className="w-full p-4 bg-gradient-to-r from-[#D4AF37] to-[#B5952F] text-black rounded-xl text-lg font-bold uppercase tracking-widest hover:from-[#E6C654] hover:to-[#D4AF37] transition-all active:scale-95 disabled:from-[#222] disabled:to-[#222] disabled:text-[#555] disabled:border disabled:border-[#333] disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            {isProcessing ? "MEMPROSES..." : "BAYAR SEKARANG"}
          </button>
        </div>
      </div>
    </div>
  );
}
