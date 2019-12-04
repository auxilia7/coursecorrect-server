const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Subject, validate } = require("../models/subject");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const subjects = await Subject.find()
    .select("-__v")
    .sort("name");
  res.send(subjects);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let subject = new Subject({ name: req.body.name });
  subject = await subject.save();

  res.send(subject);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const subject = await Subject.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }
  );

  if (!subject)
    return res.status(404).send("The subject with the given ID was not found.");

  res.send(subject);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const subject = await Subject.findByIdAndRemove(req.params.id);

  if (!subject)
    return res.status(404).send("The subject with the given ID was not found.");

  res.send(subject);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const subject = await Subject.findById(req.params.id).select("-__v");

  if (!subject)
    return res.status(404).send("The subject with the given ID was not found.");

  res.send(subject);
});

module.exports = router;
