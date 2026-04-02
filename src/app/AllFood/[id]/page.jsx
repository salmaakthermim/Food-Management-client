import FoodDetailsClient from "./FoodDetailsClient";

// Server-side data fetch using fetch()
async function getFood(id) {
  try {
    const res = await fetch(`http://localhost:5000/foods/${id}`, {
      cache: "no-store", // always get fresh data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch food data");
    }

    return res.json();
  } catch(e) {
    console.error(e);
    return null;
  }
}

const FoodDetailsPage = async ({ params }) => {
  const { id } = await params; // dynamic route
  const food = await getFood(id);

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#020617]">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Food not found</h2>
      </div>
    );
  }

  return <FoodDetailsClient food={food} />;
};

export default FoodDetailsPage;
