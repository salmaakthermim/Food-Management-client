

// import Image from "next/image";

// Server-side data fetch using fetch()
async function getFood(id) {
  const res = await fetch(`https://users-management-food-server.vercel.app/foods/${id}`, {
    cache: "no-store", // always get fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch food data");
  }

  return res.json();
}

const FoodDetailsPage = async ({ params }) => {
  const { id } = await params; // dynamic route
  const food = await getFood(id);
  console.log(food);
  

  return (
    <div className="max-w-4xl mx-auto px-5 mt-10 bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Food Image */}
        <div>
          <img
            src={food?.image}
            alt={food.title}
            width={500}
            height={500}
            className="rounded-xl object-cover"
          />
        </div>

        {/* Food Info */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-green-800 mb-4">{food.title}</h1>
            <p className="text-gray-700 mb-4">{food.description}</p>
            <p className="text-xl font-semibold text-green-700">Price: ${food.price}</p>
          </div>

          <button className="mt-6 btn bg-green-600 hover:bg-green-700 text-white w-full">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsPage;
