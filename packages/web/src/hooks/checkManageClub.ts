import { useGetMyManageClub } from "../features/manage-club/services/getMyManageClub";

export const useCheckManageClub = (): {
  isLoading: boolean;
  delegate: number | undefined;
} => {
  const { data, isLoading, isError } = useGetMyManageClub();
  if (isError) {
    return { isLoading: false, delegate: undefined };
  }
  if (isLoading) {
    return { isLoading: true, delegate: undefined };
  }
  if (data && "delegateEnumId" in data) {
    return { isLoading: false, delegate: data.delegateEnumId };
  }
  return { isLoading: false, delegate: undefined };
};
