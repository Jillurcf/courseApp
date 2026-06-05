describe("Course Filter", () => {
  const courses = [
    { title: "React Native", is_premium: true },
    { title: "JavaScript", is_premium: false },
  ];

  it("should filter premium courses", () => {
    const premium = courses.filter((c) => c.is_premium);

    expect(premium.length).toBe(1);
    expect(premium[0].title).toBe("React Native");
  });
});