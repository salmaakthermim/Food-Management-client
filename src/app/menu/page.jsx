import React from "react";
import MenuClient from "./MenuClient";

async function getFoods() {
  try {
    const res = await fetch("http://localhost:5000/foods", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.error("Failed to fetch menu foods:", error);
    return [];
  }
}

const MenuPage = async () => {
  const foods = await getFoods();

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] relative pb-20">
      {/* Decorative blurred blobs */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-indigo-50 dark:bg-indigo-900/10 rounded-b-[100px] -z-10 absolute pointer-events-none overflow-hidden">
        <div className="absolute left-1/4 top-1/2 w-[600px] h-[600px] bg-purple-200 dark:bg-purple-900/20 blur-[120px] rounded-full mix-blend-multiply opacity-70 transform -translate-x-1/2 -translate-y-1/2 animation-pulse"></div>
        <div className="absolute right-1/4 top-1/4 w-[500px] h-[500px] bg-indigo-200 dark:bg-indigo-900/20 blur-[120px] rounded-full mix-blend-multiply opacity-70"></div>
      </div>

      <MenuClient initialFoods={foods} />

      {/* Call to Action at Bottom */}
      {foods && foods.length > 0 && (
        <div className="max-w-4xl mx-auto px-6 mt-32 text-center relative z-10">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden">
             {/* Decorative rings */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full border-[20px] border-white/10"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full border-[20px] border-white/10"></div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10 drop-shadow-md">
              Ready to Order?
            </h2>
            <p className="text-indigo-100 text-lg md:text-xl mb-8 relative z-10 max-w-xl mx-auto">
              Choose your favorite meal and enjoy our fast, reliable delivery service right to your doorstep.
            </p>
            <button className="relative z-10 px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all">
              Login to Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
