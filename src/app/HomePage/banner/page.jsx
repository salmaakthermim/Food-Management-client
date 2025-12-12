const BannerPage = () => {
  return (
    <div className="w-full bg-gradient-to-b from-[#d4f8e8] to-[#f3fff7] py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10">

        {/* Left Text Section */}
        <div>
          <p className="text-green-600 text-xl font-semibold mb-2">
            We introduced
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Fresh Foods
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Organic food is food produced by methods that comply with the
            standards of organic farming.
          </p>

          <button className="mt-8 px-8 py-3 bg-[#ff6f61] text-white rounded-full text-lg font-medium hover:bg-[#ff5a4b] transition">
            Go Shop
          </button>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-center">
          <img
            src="https://i.ibb.co.com/kV6fcqGf/banner1.png"
            alt="Fresh Foods"
            className="w-full max-w-md md:max-w-xl"
          />
        </div>

      </div>
    </div>
  );
};

export default BannerPage;
