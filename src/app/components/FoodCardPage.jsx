  "use client";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";

const FoodCardPage = ({ food }) => {
  const { title, description, price, category, location, priority, image } = food || {};

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition">
      {/* Image */}
      <div className="w-full h-48 overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

        <p className="text-gray-600 text-sm line-clamp-3">
          {description}
        </p>

        <p className="text-lg font-bold text-green-600">${price}</p>

        <div className="flex justify-between text-sm text-gray-500">
          <p>Category: <span className="font-medium text-gray-700">{category}</span></p>
          <p>Priority: <span className="font-medium text-gray-700">{priority}</span></p>
        </div>

        <p className="flex items-center gap-1 text-sm text-gray-500">
          <FaMapMarkerAlt className="text-red-500" /> {location}
        </p>

        <Link
          href={`/AllFood/${food?._id}`}
          className="block w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-medium text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FoodCardPage;
