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

export const useSpaces = () => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["spaces"],
    queryFn: async () => {
      const res = await fetch("/api/space");
      const json = await res.json();
      return json;
    },
  });

  return {
    spacesData: data,
    isSpacesError: isError,
    isSpacesLoading: isLoading,
    spacesError: error,
  };
};

export const useSpace = (sid) => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["space", sid],
    queryFn: async () => {
      const res = await fetch(`/api/space/${sid}`);
      const json = await res.json();
      return json;
    },
  });

  return {
    spaceData: data,
    isSpaceError: isError,
    isSpaceLoading: isLoading,
    spaceError: error,
  };
};
