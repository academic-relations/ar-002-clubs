import { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

export const useGetProfileNow = () => {
  const [profile, setProfile] = useState<string | undefined>(undefined);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // TODO: secret key 검증
      const decoded: { type?: string } = jwtDecode(token);
      setProfile(decoded.type);
    }
  }, []);
  return profile;
};
