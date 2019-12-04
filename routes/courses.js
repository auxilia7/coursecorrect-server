const { Course, validate } = require("../models/course");
const { Subject } = require("../models/subject");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const courses = await Course.find()
    .select("-__v")
    .sort("name");
  res.send(courses);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const subject = await Subject.findById(req.body.subjectId);
  if (!subject) return res.status(400).send("Invalid subject.");

  const course = new Course({
    courseTitle: req.body.courseTitle,
    subject: {
      _id: subject._id,
      name: subject.name
    },
    courseNumber: req.body.courseNumber,
    section: req.body.section,
    campus: req.body.campus,
    numberOfCredits: req.body.numberOfCredits,
    daysOfTheWeek: req.body.daysOfTheWeek,
    capacity: req.body.capacity,
    instructor: req.body.instructor,
    building: req.body.building,
    buildingRoomNumber: req.body.buildingRoomNumber,
    description: req.body.description,
    semester: req.body.semester,
    dateYearStart: req.body.dateYearStart,
    dateMonthStart: req.body.dateMonthStart,
    dateDayStart: req.body.dateDayStart,
    dateHourStart: req.body.dateHourStart,
    dateMinuteStart: req.body.dateMinuteStart,
    dateHourEnd: req.body.dateHourEnd,
    dateMinuteEnd: req.body.dateMinuteEnd,
    publishDate: moment().toJSON()
  });
  await course.save();

  res.send(course);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const subject = await Subject.findById(req.body.subjectId);
  if (!subject) return res.status(400).send("Invalid subject.");

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      courseTitle: req.body.courseTitle,
      subject: {
        _id: subject._id,
        name: subject.name
      },
      courseNumber: req.body.courseNumber,
      section: req.body.section,
      campus: req.body.campus,
      numberOfCredits: req.body.numberOfCredits,
      daysOfTheWeek: req.body.daysOfTheWeek,
      capacity: req.body.capacity,
      instructor: req.body.instructor,
      building: req.body.building,
      buildingRoomNumber: req.body.buildingRoomNumber,
      description: req.body.description,
      semester: req.body.semester,
      dateYearStart: req.body.dateYearStart,
      dateMonthStart: req.body.dateMonthStart,
      dateDayStart: req.body.dateDayStart,
      dateHourStart: req.body.dateHourStart,
      dateMinuteStart: req.body.dateMinuteStart,
      dateHourEnd: req.body.dateHourEnd,
      dateMinuteEnd: req.body.dateMinuteEnd
    },
    { new: true }
  );

  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  res.send(course);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);

  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  res.send(course);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const course = await Course.findById(req.params.id).select("-__v");

  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  res.send(course);
});

module.exports = router;
