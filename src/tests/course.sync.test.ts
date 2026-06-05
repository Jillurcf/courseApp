import { syncCourses } from "../features/courses/logic/syncCourses";
// jest.mock("../features/courses/api/course.api", () => ({
//   fetchCourses: jest.fn(() =>
//     Promise.resolve([
//       {
//         course_id: "1",
//         title: "React",
//         description_short: "Test",
//         instructor_name: "A",
//         duration_weeks: 2,
//         price_usd: 0,
//         is_premium: false,
//         tags: ["react"],
//         rating: 4,
//         last_updated: "2024-01-01",
//       },
//     ])
//   ),
// }));

// describe("Sync Courses", () => {
//   it("should sync without crashing", async () => {
//     const result = await syncCourses();
//     expect(result).toBe(true);
//   });
// });



jest.mock("../database/sqlite", () => ({
  db: {
    runAsync: jest.fn(),
    getAllAsync: jest.fn(() => Promise.resolve([])),
  },
}));

jest.mock("../features/courses/api/course.api", () => ({
  fetchCourses: jest.fn(() =>
    Promise.resolve([
      {
        course_id: "1",
        title: "React",
        description_short: "Test",
        instructor_name: "A",
        duration_weeks: 2,
        price_usd: 0,
        is_premium: false,
        tags: ["react"],
        rating: 4,
        last_updated: "2024-01-01",
      },
    ])
  ),
}));


describe("Sync Courses", () => {
  it("should sync without crashing", async () => {
    const result = await syncCourses();
    expect(result).toBe(true);
  });
});