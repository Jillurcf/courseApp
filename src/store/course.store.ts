// import { create } from "zustand";
// import { Course } from "./course.type";

// type Store = {
//   courses: Course[];
//   setCourses: (data: Course[]) => void;
//   toggleEnroll: (id: string) => void;
// };

// export const useCourseStore = create<Store>((set) => ({
//   courses: [],

//   setCourses: (data) => set({ courses: data }),

//   toggleEnroll: (id) =>
//     set((state) => ({
//       courses: state.courses.map((c) =>
//         c.course_id === id
//           ? { ...c, is_enrolled: c.is_enrolled ? 0 : 1 }
//           : c
//       ),
//     })),
// }));

import { create } from "zustand";
import { Course } from "./course.type";

type Store = {
  courses: Course[];

  search: string;
  filter: {
    isPremium: boolean | null;
    isEnrolled: boolean | null;
  };

  setCourses: (data: Course[]) => void;

  setSearch: (text: string) => void;

  setFilter: (filter: Partial<Store["filter"]>) => void;

  toggleEnroll: (id: string) => void;

  getFilteredCourses: () => Course[];
};

export const useCourseStore = create<Store>((set, get) => ({
  courses: [],

  search: "",
  filter: {
    isPremium: null,
    isEnrolled: null,
  },

  setCourses: (data) => set({ courses: data }),

  setSearch: (text) => set({ search: text }),

  setFilter: (filter) =>
    set((state) => ({
      filter: { ...state.filter, ...filter },
    })),

  toggleEnroll: (id) =>
    set((state) => ({
      courses: state.courses.map((c) =>
        c.course_id === id
          ? { ...c, is_enrolled: c.is_enrolled ? 0 : 1 }
          : c
      ),
    })),

  getFilteredCourses: () => {
    const { courses, search, filter } = get();

    return courses.filter((course) => {
      const matchSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor_name.toLowerCase().includes(search.toLowerCase());

      const matchPremium =
        filter.isPremium === null ||
        course.is_premium === filter.isPremium;

      const matchEnroll =
        filter.isEnrolled === null ||
        course.is_enrolled === filter.isEnrolled;

      return matchSearch && matchPremium && matchEnroll;
    });
  },
}));