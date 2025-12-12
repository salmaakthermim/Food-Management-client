"use client";

import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { AuthContext } from "@/provider/AuthProvider";

const ManageFoodPage = () => {
    const [foods, setFoods] = useState([]);
    const [filter, setFilter] = useState("all");
     const {user} = useAuth(AuthContext);
    //  console.log(user);


    const router = useRouter();

  if(!user){
    router.push("/login");
  }
     

    const fetchFoods = async () => {
        try {
            const res = await axios.get("https://users-management-food-server.vercel.app/foods");
            setFoods(res.data);
        } catch (error) {
            console.error("Failed to fetch foods:", error);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    const handleDelete = (id, name) => {
        Swal.fire({
            title: `Are you sure you want to delete "${name}"?`,
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://users-management-food-server.vercel.app/foods/${id}`);
                    setFoods(foods.filter((food) => food._id !== id));
                    Swal.fire({
                        title: "Deleted!",
                        text: `"${name}" has been deleted.`,
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                } catch (error) {
                    Swal.fire("Error!", "Failed to delete food!", "error");
                }
            }
        });
    };


    // Filter and sort foods
    const filteredFoods = [...foods].sort((a, b) => {
        const priceA = Number(a.price) || 0;
        const priceB = Number(b.price) || 0;
        if (filter === "asc") return priceA - priceB;
        if (filter === "desc") return priceB - priceA;
        return 0;
    });

    return (
        <div className=" bg-gradient-to-b from-[#d4f8e8] to-[#f3fff7]">
        <div className="p-6 w-[1000px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">
                    Manage Foods ({filteredFoods.length})
                </h1>

                {/* DaisyUI Dropdown for Price Filter */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-sm m-1">
                        Price Filter
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <button onClick={() => setFilter("all")}>All</button>
                        </li>
                        <li>
                            <button onClick={() => setFilter("asc")}>Low to High</button>
                        </li>
                        <li>
                            <button onClick={() => setFilter("desc")}>High to Low</button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFoods.map((food) => (
                            <tr key={food._id}>
                                <td>
                                    <img
                                        className="w-12 h-12 rounded"
                                        src={food.image}
                                        alt={food.title}
                                    />
                                </td>
                                <td>{food.title}</td>
                                <td>{food.category}</td>
                                <td>${Number(food.price).toFixed(2)}</td>
                                <td className="flex gap-2">
                                    <Link className="btn btn-sm btn-square bg-green-300"
                                        href={`/AllFood/${food._id}`}
                                    >
                                        <FaEye></FaEye>
                                    </Link>
                                    <button
                                        className="btn btn-sm bg-red-600 text-white"
                                        onClick={() => handleDelete(food._id, food.title)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default ManageFoodPage;
