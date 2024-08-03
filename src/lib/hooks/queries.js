import { useQuery } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";

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

export const useSpaces = () => {
  const rtr = useRouter();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["spaces"],
    queryFn: async () => {
      const res = await fetch("/api/space");

      if (res.redirected) {
        return rtr.push(res.url);
      }

      if (res.status === 401) {
        console.log("Unauthorized");
        throw new Error("Unauthorized");
      } else {
        const json = await res.json();
        return json;
      }
    },
    retry: false,
  });

  return {
    spacesData: data,
    isSpacesError: isError,
    isSpacesLoading: isLoading,
    spacesError: error,
  };
};

export const useSpace = (sid) => {
  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ["space", sid],
    queryFn: async () => {
      const res = await fetch(`/api/space/${sid}`);
      const json = await res.json();
      return json;
    },
  });

  console.log(data);
  console.log(isError);
  console.log(isLoading);
  console.log(error);

  return {
    spaceData: data,
    isSpaceError: isError,
    isSpaceLoading: isLoading,
    spaceError: error,
    refetchSpace: refetch,
  };
};
