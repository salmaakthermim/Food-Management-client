

import FoodCardPage from "../components/FoodCardPage";


async function getFoods() {
  const res = await fetch("https://users-management-food-server.vercel.app/foods", {
    cache: "no-store",
  });
  return res.json();
}

const HomeFoodPage = async () => {
  const foods = await getFoods();
  console.log(foods);
  

  const sortedFoods = [...foods].sort((a, b) => a.price - b.price);
  const topFoods = sortedFoods.slice(0, 6);

  return (
    <div className="">
         {/* HOME FOOD SECTION */}
      <h2 className="text-3xl font-bold mb-6 py-5 text-center">Popular Foods</h2>
      <div className="max-w-6xl mx-auto px-5">
       
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topFoods.map((food) => (
          <FoodCardPage key={food._id} food={food} />
        ))}
      </div>
      </div>
    </div>
  );
};

export default HomeFoodPage;
