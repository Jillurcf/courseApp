import { supabase } from "../../../services/superbase";

export const fetchCourses = async () => {
  const { data, error } = await supabase
    .from("courses")
    .select("*");
  console.log("RECEIVED LENGTH:", data?.length);
  console.log("SUPABASE ERROR:", error);
  if (error) throw error;

  return data;
};