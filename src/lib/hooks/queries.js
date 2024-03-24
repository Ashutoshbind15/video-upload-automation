import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/profile");
      const json = await res.json();
      return json;
    },
  });

  return {
    userData: data,
    isUserError: isError,
    isUserLoading: isLoading,
    userError: error,
  };
};
