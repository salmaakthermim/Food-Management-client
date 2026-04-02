import FoodCardPage from "../components/FoodCardPage";

async function getFoods() {
  try {
    const res = await fetch("http://localhost:5000/foods", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.error("Failed to fetch top foods");
    return [];
  }
}

const HomeFoodPage = async () => {
  const foods = await getFoods();
  const sortedFoods = [...foods].sort((a, b) => a.price - b.price);
  const topFoods = sortedFoods.slice(0, 6);

  if (!topFoods.length) return null;

  return (
    <div className="py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-50 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50 rounded-full blur-3xl opacity-50 -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-indigo-600 font-bold tracking-wider uppercase mb-3 drop-shadow-sm">Handpicked For You</h2>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">Popular Culinary Delights</h1>
          <p className="text-gray-500 text-lg">
            Discover our community's favorite meals. From premium organic dishes to everyday comfort food, find exactly what you're craving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topFoods.map((food) => (
            <FoodCardPage key={food._id} food={food} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeFoodPage;
