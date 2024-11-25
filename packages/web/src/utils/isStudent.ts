import { Profile } from "../common/providers/AuthContext";

const isStudent = (profile?: Profile) => {
  if (!profile) return false;
  return (
    profile.type === "undergraduate" ||
    profile.type === "master" ||
    profile.type === "doctor"
  );
};
export default isStudent;
