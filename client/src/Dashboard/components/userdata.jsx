import { useState, useEffect } from "react";
import { getBaseUrl } from "../../utils/api"; 
import { useAuthContext } from "../../context/useAuthcontext";

const useUserData = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState(null);
  const baseUrl = getBaseUrl();

  useEffect(() => {
    if (!user || !user.id) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseUrl}/user/${user.id}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user, baseUrl]);

  return { userData, setUserData };
};

export default useUserData;
