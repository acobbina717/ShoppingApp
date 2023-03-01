import useSWR from "swr";
import { getCurrentUser } from "../firebase/firebase.utils";

export const useUser = () => {
  const { data } = useSWR((_, getCurrentUser));
  console.log(data);

  //   return { data };
};
