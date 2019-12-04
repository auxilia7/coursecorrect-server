const Joi = require("joi");
const mongoose = require("mongoose");
const { subjectSchema } = require("./subject");

const Course = mongoose.model(
  "Courses",
  new mongoose.Schema({
    courseTitle: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255
    },
    subject: {
      type: subjectSchema,
      required: true
    },
    courseNumber: {
      type: Number,
      required: true,
      min: 0,
      max: 2000
    },
    section: {
      type: Number,
      required: true,
      min: 0,
      max: 20
    },
    campus: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255
    },
    numberOfCredits: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    daysOfTheWeek: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255
    },
    capacity: {
      type: Number,
      required: true,
      min: 0,
      max: 500
    },
    instructor: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255
    },
    building: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255
    },
    buildingRoomNumber: {
      type: Number,
      required: true,
      min: 0,
      max: 10000
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 10000
    },
    semester: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255
    },
    dateYearStart: {
      type: Number,
      required: true,
      min: 0,
      max: 10000
    },
    dateMonthStart: {
      type: Number,
      required: true,
      min: 0,
      max: 13
    },
    dateDayStart: {
      type: Number,
      required: true,
      min: 0,
      max: 40
    },
    dateHourStart: {
      type: Number,
      required: true,
      min: 0,
      max: 25
    },
    dateMinuteStart: {
      type: Number,
      required: true,
      min: 0,
      max: 61
    },
    dateHourEnd: {
      type: Number,
      required: true,
      min: 0,
      max: 25
    },
    dateMinuteEnd: {
      type: Number,
      required: true,
      min: 0,
      max: 61
    }
  })
);

function validateCourse(course) {
  const schema = {
    courseTitle: Joi.string()
      .min(5)
      .max(250)
      .required(),
    subjectId: Joi.objectId().required(),
    courseNumber: Joi.number()
      .min(0)
      .required(),
    section: Joi.number()
      .min(0)
      .required(),
    campus: Joi.string()
      .min(5)
      .max(50)
      .required(),
    numberOfCredits: Joi.number()
      .min(0)
      .required(),
    daysOfTheWeek: Joi.string()
      .min(5)
      .max(50)
      .required(),
    capacity: Joi.number()
      .min(0)
      .required(),
    instructor: Joi.string()
      .min(3)
      .max(250)
      .required(),
    building: Joi.string()
      .min(3)
      .max(250)
      .required(),
    buildingRoomNumber: Joi.number()
      .min(0)
      .required(),
    description: Joi.string()
      .min(3)
      .max(10000)
      .required(),
    semester: Joi.string()
      .min(3)
      .max(255)
      .required(),
    dateYearStart: Joi.number()
      .min(0)
      .required(),
    dateMonthStart: Joi.number()
      .min(0)
      .required(),
    dateDayStart: Joi.number()
      .min(0)
      .required(),
    dateHourStart: Joi.number()
      .min(0)
      .required(),
    dateMinuteStart: Joi.number()
      .min(0)
      .required(),
    dateHourEnd: Joi.number()
      .min(0)
      .required(),
    dateMinuteEnd: Joi.number()
      .min(0)
      .required()
  };

  return Joi.validate(course, schema);
}

exports.Course = Course;
exports.validate = validateCourse;
