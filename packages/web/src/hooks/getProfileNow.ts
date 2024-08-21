import { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

export const useGetProfileNow = () => {
  const token = localStorage.getItem("accessToken");
  const [profile, setProfile] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (token) {
      // TODO: secret key 검증
      const decoded: { type?: string } = jwtDecode(token);
      setProfile(decoded.type);
    }
  }, [token]);
  return profile;
};
