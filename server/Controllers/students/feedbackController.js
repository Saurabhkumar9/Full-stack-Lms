const Contact = require("../../Models/student/contact.model");
const Contect = require("../../Models/student/contact.model");
const feedbackModel = require("../../Models/student/feedback.model");

const sendFeedback = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(404).json({
        message: "message field require",
      });
    }

    const newMessage = new feedbackModel({
      message,
      userId: req.user.id,
    });
    await newMessage.save();

    return res.status(201).json({
      status: true,
      message: "Feedback  save successfull.",
    });
  } catch (error) {
    console.error("Error in submit Feedback:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const feedbackShow = async (req, res) => {
  try {
    const findFeedback = await feedbackModel.find().populate("userId");

    if (!findFeedback) {
      return res.status(404).json({
        message: "not exist any message",
      });
    }

    return res.status(201).json({
      findFeedback,
      message: "message success ful fetch",
    });
  } catch (error) {
    console.error("Error in show Feedback:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// delete feedback

const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await feedbackModel.findById(id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    await feedbackModel.findByIdAndDelete(id);

    res.status(201).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Delete Feedback Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// contect

const ContectUser = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(404).json({
        message: "All Field required",
      });
    }

    const newContect = new Contect({
      name,
      email,
      phone,
      subject,
      message,
    });

    await newContect.save();
    return res.status(201).json({
      message: " contect form submitted successful",
      newContect,
    });
  } catch (error) {
    console.error("Error in Contect User:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// show contect

const showAllContacts = async (req, res) => {
  try {
    const contacts = await Contect.find(); // Fetch all contacts from DB
    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// delelet contact

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the contact in DB
    const foundContact = await Contact.findById(id);

    if (!foundContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Delete the contact
    await Contact.findByIdAndDelete(id);

    // Send success response
    res.status(201).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Delete Contact Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  sendFeedback,
  feedbackShow,
  ContectUser,
  deleteFeedback,
  showAllContacts,
  deleteContact,
};
