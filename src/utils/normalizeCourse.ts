
export const normalizeCourses = (courses: any[]) =>
  courses.map((course) => ({
    ...course,
    is_premium: Boolean(course.is_premium),
    is_enrolled: Number(course.is_enrolled),
  }));