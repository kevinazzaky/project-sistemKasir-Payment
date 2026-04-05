// File: src/presentation/pages/POSPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkoutOrder } from "../../services/OrderService";

export default function POSPage() {
  const [cart, setCart] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- SATPAM PENJAGA PINTU ---
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Kasir | Menu Utama";
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  // -----------------------------

  // --- FUNGSI LOGOUT ---
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  // ---------------------

  // DAFTAR 50 MENU EKSKLUSIF
  const products = [
    { id: 1, name: "Kopi Gula Aren", price: 18000, icon: "☕" },
    { id: 2, name: "Iced Americano", price: 22000, icon: "🧊" },
    { id: 3, name: "Matcha Latte", price: 28000, icon: "🍵" },
    { id: 4, name: "Es Teh Manis", price: 8000, icon: "🍹" },
    { id: 5, name: "Lemon Tea Squash", price: 18000, icon: "🍋" },
    { id: 6, name: "Caramel Macchiato", price: 35000, icon: "🍮" },
    { id: 7, name: "Vanilla Latte", price: 32000, icon: "🍦" },
    { id: 8, name: "Affogato Gold", price: 25000, icon: "🍨" },
    { id: 9, name: "Chocolate Lava Shake", price: 30000, icon: "🍫" },
    { id: 10, name: "Strawberry Mojito", price: 28000, icon: "🍓" },
    { id: 11, name: "Mie Goreng Spesial", price: 25000, icon: "🍜" },
    { id: 12, name: "Burger Premium", price: 35000, icon: "🍔" },
    { id: 13, name: "Nasi Goreng Seafood", price: 45000, icon: "🦐" },
    { id: 14, name: "Spaghetti Carbonara", price: 55000, icon: "🍝" },
    { id: 15, name: "Steak Wagyu A5", price: 185000, icon: "🥩" },
    { id: 16, name: "Pizza Margherita", price: 75000, icon: "🍕" },
    { id: 17, name: "Ayam Bakar Madu", price: 38000, icon: "🍗" },
    { id: 18, name: "Salmon Teriyaki", price: 95000, icon: "🐟" },
    { id: 19, name: "Soto Betawi Premium", price: 42000, icon: "🥣" },
    { id: 20, name: "Ramen Shoyu", price: 48000, icon: "🍜" },
    { id: 21, name: "Dory Steak", price: 52000, icon: "🐠" },
    { id: 22, name: "Beef Teriyaki Rice", price: 45000, icon: "🍚" },
    { id: 23, name: "Chicken Katsu", price: 38000, icon: "🍱" },
    { id: 24, name: "Club Sandwich", price: 35000, icon: "🥪" },
    { id: 25, name: "Lasagna", price: 62000, icon: "🥘" },
    { id: 26, name: "Fettuccine Alfredo", price: 55000, icon: "🍝" },
    { id: 27, name: "Kwetiau Sapi", price: 42000, icon: "🍜" },
    { id: 28, name: "Nasi Gila", price: 30000, icon: "🍛" },
    { id: 29, name: "Tenderloin Steak", price: 145000, icon: "🥩" },
    { id: 30, name: "Iga Bakar Penyet", price: 85000, icon: "🍖" },
    { id: 31, name: "Roti Bakar Coklat", price: 15000, icon: "🍞" },
    { id: 32, name: "Kentang Goreng", price: 12000, icon: "🍟" },
    { id: 33, name: "Croissant Butter", price: 24000, icon: "🥐" },
    { id: 34, name: "Salad Sayur Organik", price: 32000, icon: "🥗" },
    { id: 35, name: "Dimsum Udang", price: 22000, icon: "🥟" },
    { id: 36, name: "Nachos Cheese", price: 28000, icon: "🌮" },
    { id: 37, name: "Chicken Wings BBQ", price: 34000, icon: "🍗" },
    { id: 38, name: "Pisang Bakar Keju", price: 18000, icon: "🍌" },
    { id: 39, name: "Edamame Salted", price: 15000, icon: "🎋" },
    { id: 40, name: "Tahu Walik Krispi", price: 12000, icon: "🍢" },
    { id: 41, name: "Calamari Rings", price: 32000, icon: "🦑" },
    { id: 42, name: "Onion Rings", price: 20000, icon: "🧅" },
    { id: 43, name: "Mac and Cheese", price: 45000, icon: "🧀" },
    { id: 44, name: "Pancake Maple", price: 28000, icon: "🥞" },
    { id: 45, name: "Waffle Ice Cream", price: 30000, icon: "🧇" },
    { id: 46, name: "Smoothie Bowl", price: 35000, icon: "🥣" },
    { id: 47, name: "Blueberry Cheesecake", price: 42000, icon: "🍰" },
    { id: 48, name: "Tiramisu", price: 38000, icon: "🍮" },
    { id: 49, name: "Iced Lychee Tea", price: 22000, icon: "🍹" },
    { id: 50, name: "Hot Chocolate", price: 25000, icon: "☕" },
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
      customerName: "Pelanggan",
      totalAmount: totalAmount,
      paymentMethod: "MIDTRANS",
      items: cart,
    };

    try {
      const result = await checkoutOrder(orderData);

      if (result.token) {
        window.snap.pay(result.token, {
          onSuccess: function (response) {
            alert("🎉 YEY! Pembayaran Berhasil!");
            setCart([]);
          },
          onPending: function (response) {
            alert("Menunggu pembayaran QRIS diselesaikan...");
          },
          onError: function (response) {
            alert("Yah, pembayaran gagal!");
          },
          onClose: function () {
            alert("Kamu menutup pop-up sebelum menyelesaikan pembayaran.");
          },
        });
      } else {
        alert("Transaksi tersimpan, tapi gagal memuat Midtrans.");
      }
    } catch (error) {
      console.error("Error Checkout:", error);
      alert("Terjadi kesalahan saat menyimpan transaksi.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Bagian Kiri: Daftar Produk */}
      <div className="flex-[2] p-8 overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#D4AF37] tracking-wider uppercase">
            Menu Eksklusif
          </h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-900/40 text-red-400 border border-red-900 rounded-lg hover:bg-red-600 hover:text-white transition-colors text-sm font-semibold tracking-widest"
          >
            LOGOUT
          </button>
        </div>

        {/* Grid menggunakan responsivitas yang baik agar 50 menu tersusun rapi */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => addToCart(p)}
              className="bg-[#141414] rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 border border-[#2a2a2a] hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] hover:border-[#D4AF37] active:scale-95 flex flex-col justify-between"
            >
              <div>
                <div className="text-5xl mb-4 grayscale hover:grayscale-0 transition-all">
                  {p.icon}
                </div>
                <div className="text-sm font-semibold mb-3 text-white tracking-wide leading-snug">
                  {p.name}
                </div>
              </div>
              <div className="text-[#D4AF37] font-bold text-xs bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1.5 rounded-full inline-block mx-auto">
                Rp {p.price.toLocaleString("id-ID")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian Kanan: Struk / Keranjang */}
      <div className="flex-1 bg-[#0f0f0f] p-8 flex flex-col border-l border-[#222] shadow-2xl">
        <h2 className="text-2xl font-bold border-b border-[#333] pb-4 mb-6 text-white uppercase tracking-wider">
          Pesanan
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
                  <h4 className="font-semibold text-gray-100 mb-1 text-sm">
                    {item.name}
                  </h4>
                  <p className="text-[#D4AF37] text-xs font-bold">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#0a0a0a] rounded-lg p-1 border border-[#333]">
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="w-7 h-7 flex items-center justify-center bg-red-900/40 text-red-400 rounded hover:bg-red-600 hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="font-bold w-4 text-center text-white text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-7 h-7 flex items-center justify-center bg-[#D4AF37]/20 text-[#D4AF37] rounded hover:bg-[#D4AF37] hover:text-black transition-colors"
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
          <div className="flex justify-between items-center mb-6 text-gray-300">
            <span className="uppercase tracking-wider font-semibold text-lg">
              Total
            </span>
            <span className="text-[#D4AF37] font-bold text-2xl">
              Rp {totalAmount.toLocaleString("id-ID")}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isProcessing || cart.length === 0}
            className="w-full p-4 bg-gradient-to-r from-[#D4AF37] to-[#B5952F] text-black rounded-xl text-lg font-bold uppercase tracking-widest hover:from-[#E6C654] hover:to-[#D4AF37] transition-all active:scale-95 disabled:from-[#222] disabled:to-[#222] disabled:text-[#555] disabled:border disabled:border-[#333] disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            {isProcessing ? "MEMPROSES..." : "BAYAR SEKARANG"}
          </button>
        </div>
      </div>
    </div>
  );
}
