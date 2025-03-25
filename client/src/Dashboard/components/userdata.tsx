import { useState, useEffect } from "react";
import { getBaseUrl } from "../../services/authService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export interface TUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  scores?: string;
  year?: number;
  role: string;
  familyLocated?: string;
  birthday?: Date;
  createdAt?: string;
  easyNumber?: number;
  mediumNumber?: number;
  hardNumber?: number;
  avatar?: { url: string };
}
const useUserData = () => {
  const authState = useSelector((state:RootState) => state.auth);
  const user =  authState.user as TUser | null;

  const accessToken = authState.accessToken as string | null;
  const [userData, setUserData] = useState<TUser | null>(null);
  const baseUrl = getBaseUrl();

  useEffect(() => {
    if (!user || !user.id || !accessToken) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseUrl}/user/${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user, baseUrl, accessToken]);

  return { userData, setUserData, user }; // Return user from Redux for easier access
};

export default useUserData;
