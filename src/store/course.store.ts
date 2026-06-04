import { create } from "zustand";
import { Course } from "./course.type";

type Store = {
  courses: Course[];
  setCourses: (data: Course[]) => void;
  toggleEnroll: (id: string) => void;
};

export const useCourseStore = create<Store>((set) => ({
  courses: [],

  setCourses: (data) => set({ courses: data }),

  toggleEnroll: (id) =>
    set((state) => ({
      courses: state.courses.map((c) =>
        c.course_id === id
          ? { ...c, is_enrolled: c.is_enrolled ? 0 : 1 }
          : c
      ),
    })),
}));