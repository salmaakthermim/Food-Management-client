"use client";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useRole = () => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    if (!loading && user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/role/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRole(data.role); // 'admin' or 'customer'
          setIsRoleLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch user role", error);
          setRole("customer"); // fallback
          setIsRoleLoading(false);
        });
    } else if (!loading && !user) {
      setRole(null);
      setIsRoleLoading(false);
    }
  }, [user, loading]);

  return [role, isRoleLoading];
};

export default useRole;
