const { Subject } = require("./models/subject");
const { Course } = require("./models/course");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    name: "Software Engineering",
    courses: [
      {
        courseTitle: "User Interface Des/Dev",
        courseNumber: 632,
        section: 1,
        campus: "Fairfax",
        numberOfCredits: 3,
        daysOfTheWeek: "Friday",
        capacity: 44,
        instructor: "Laurel E. Fielding",
        building: "Peterson",
        buildingRoomNumber: 1105,
        description:
          "This course will provide a comprehensive introduction to human-computer interaction and the design and development of user interfaces, covering basic human cognition, methods for needfinding and prototyping, user-centered design, empirical and analytical methods for conducting usability evaluations, and principles for visual, information, interaction, and community design.",
        semester: "Fall 2020",
        dateYearStart: 2020,
        dateMonthStart: 0,
        dateDayStart: 24,
        dateHourStart: 16,
        dateMinuteStart: 30,
        dateHourEnd: 19,
        dateMinuteEnd: 10
      },
      {
        courseTitle: "Dist Software Eng",
        courseNumber: 622,
        section: 1,
        campus: "Fairfax",
        numberOfCredits: 3,
        daysOfTheWeek: "Monday",
        capacity: 44,
        instructor: "David A. Wheeler",
        building: "Arts and Design",
        buildingRoomNumber: 2026,
        description:
          "Hands-on introduction to techniques and programming interfaces for distributed software engineering. Networking protocols at several layers. Construction of distributed and concurrent software using network protocol services. Applications of Internet and web-based software.",
        semester: "Fall 2020",
        dateYearStart: 2020,
        dateMonthStart: 0,
        dateDayStart: 27,
        dateHourStart: 19,
        dateMinuteStart: 20,
        dateHourEnd: 22,
        dateMinuteEnd: 00
      },
      {
        courseTitle: "Software Proj Mgmt",
        courseNumber: 625,
        section: 1,
        campus: "Fairfax",
        numberOfCredits: 3,
        daysOfTheWeek: "Monday",
        capacity: 44,
        instructor: "Kenneth E Nidiffer",
        building: "Innovation",
        buildingRoomNumber: 206,
        description:
          "Lifecycle and process models; process metrics; planning for a software project; mechanisms for monitoring and controlling schedule, budget, quality, and productivity; and leadership, motivation, and team building.",
        semester: "Fall 2020",
        dateYearStart: 2020,
        dateMonthStart: 0,
        dateDayStart: 27,
        dateHourStart: 19,
        dateMinuteStart: 20,
        dateHourEnd: 22,
        dateMinuteEnd: 00
      }
    ]
  },
  {
    name: "Computer Science",
    courses: [
      {
        courseTitle: "Advanced Algorithms",
        courseNumber: 630,
        section: 1,
        campus: "Fairfax",
        numberOfCredits: 3,
        daysOfTheWeek: "Tuesday",
        capacity: 44,
        instructor: "Fei Li",
        building: "Innovation",
        buildingRoomNumber: 206,
        description:
          "Provides an overview of advanced algorithm design and analysis techniques. Topics include algorithms for hash tables, matrix operations, number theory, string matching, computational geometry, combinatorial optimization, and linear programming; also the areas of NP-completeness and approximation algorithms.",
        semester: "Fall 2020",
        dateYearStart: 2020,
        dateMonthStart: 0,
        dateDayStart: 21,
        dateHourStart: 19,
        dateMinuteStart: 20,
        dateHourEnd: 22,
        dateMinuteEnd: 00
      },
      {
        courseTitle: "Distibuted Systems",
        courseNumber: 675,
        section: 1,
        campus: "Fairfax",
        numberOfCredits: 3,
        daysOfTheWeek: "Wednesday",
        capacity: 44,
        instructor: "Yue Cheng",
        building: "Innovation",
        buildingRoomNumber: 134,
        description:
          "Issues in design and implementation of distributed systems and applications. Topics include distributed communication paradigms, middleware, coordination and synchronization, distributed transactions, consistency and replication, fault-tolerance and reliability, and peer-to-peer systems.",
        semester: "Fall 2020",
        dateYearStart: 2020,
        dateMonthStart: 0,
        dateDayStart: 22,
        dateHourStart: 16,
        dateMinuteStart: 30,
        dateHourEnd: 19,
        dateMinuteEnd: 10
      },
      {
        courseTitle: "Computer Vision",
        courseNumber: 682,
        section: 1,
        campus: "Fairfax",
        numberOfCredits: 3,
        daysOfTheWeek: "Friday",
        capacity: 44,
        instructor: "Zoran Duric",
        building: "Arts and Design",
        buildingRoomNumber: 8,
        description:
          "Study of computational models of visual perception and their implementation in computer systems. Topics include early visual processing, edge detection, segmentation, intrinsic images, image modeling, representation of visual knowledge, and image understanding.",
        semester: "Fall 2020",
        dateYearStart: 2020,
        dateMonthStart: 0,
        dateDayStart: 24,
        dateHourStart: 13,
        dateMinuteStart: 30,
        dateHourEnd: 16,
        dateMinuteEnd: 10
      }
    ]
  },
  {
    name: "Physics",
    courses: [
      {
        courseTitle: "Intro Quantum Mech",
        courseNumber: 502,
        section: 1,
        campus: "Fairfax",
        numberOfCredits: 3,
        daysOfTheWeek: "Monday",
        capacity: 44,
        instructor: "Mingzhen Tian",
        building: "Planetary",
        buildingRoomNumber: 220,
        description:
          "Experimental basis of quantum mechanics, the wave function, and systems in one, two, and three dimensions.",
        semester: "Fall 2020",
        dateYearStart: 2020,
        dateMonthStart: 0,
        dateDayStart: 27,
        dateHourStart: 19,
        dateMinuteStart: 20,
        dateHourEnd: 22,
        dateMinuteEnd: 00
      },
      {
        courseTitle: "Solid State Physics",
        courseNumber: 512,
        section: 1,
        campus: "Fairfax",
        numberOfCredits: 3,
        daysOfTheWeek: "Friday",
        capacity: 44,
        instructor: "Yuri Mishin",
        building: "Planetary",
        buildingRoomNumber: 112,
        description:
          "Crystal structures, binding, lattice vibrations, the free electron model, metals, semiconductors and semiconductor devices, superconductivity, and magnetism.",
        semester: "Fall 2020",
        dateYearStart: 2020,
        dateMonthStart: 0,
        dateDayStart: 24,
        dateHourStart: 10,
        dateMinuteStart: 30,
        dateHourEnd: 13,
        dateMinuteEnd: 10
      },
      {
        courseTitle: "Atmospheric Physics I",
        courseNumber: 575,
        section: 1,
        campus: "Fairfax",
        numberOfCredits: 3,
        daysOfTheWeek: "Friday",
        capacity: 44,
        instructor: "Michael E Summers",
        building: "Exploratory",
        buildingRoomNumber: 1004,
        description:
          "Introduction to basic physical and chemical processes that operate in the Earth's atmosphere. Emphasis on those concepts that provide a global description of the current atmospheric state and those processes that relate to global change and atmospheric evolution. Topics include equilibrium structure, radiative transfer models, thermodynamics of various atmospheric layers, and the various processes defining these layers.",
        semester: "Fall 2020",
        dateYearStart: 2020,
        dateMonthStart: 0,
        dateDayStart: 24,
        dateHourStart: 19,
        dateMinuteStart: 20,
        dateHourEnd: 22,
        dateMinuteEnd: 00
      }
    ]
  }
];

async function seed() {
  await mongoose.connect(config.get("db"));

  await Course.deleteMany({});
  await Subject.deleteMany({});

  for (let subject of data) {
    const { _id: subjectId } = await new Subject({ name: subject.name }).save();
    const courses = subject.courses.map(course => ({
      ...course,
      subject: { _id: subjectId, name: subject.name }
    }));
    await Course.insertMany(courses);
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
