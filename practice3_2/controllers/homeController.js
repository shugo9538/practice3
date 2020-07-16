var courses = [
  {
    title: "Event Driven Cakes",
    cost: 50
  },
  {
    title: "Asynchronous Artichoke",
    cost:10
  }
];

module.exports = {
  showCourses: (req. res) => {
    res.render("course", {
      offeredCourses: course
    });
  }
};
