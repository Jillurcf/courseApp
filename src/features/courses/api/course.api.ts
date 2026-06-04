import { supabase } from "../../../services/superbase";

export const fetchCourses = async () => {
  const { data, error } = await supabase
    .from("courses")
    .select("*");

  if (error) throw error;

  return data;
};