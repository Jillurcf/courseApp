import { useCourseStore } from "../store/course.store";

describe("Course Store", () => {
  it("should toggle enrollment", () => {
    const store = useCourseStore.getState();

    store.setCourses([
      {
        course_id: "1",
        title: "Test",
        is_enrolled: 0,
      } as any,
    ]);

    store.toggleEnroll("1");

    const updated = useCourseStore.getState().courses[0];

    expect(updated.is_enrolled).toBe(1);
  });
});