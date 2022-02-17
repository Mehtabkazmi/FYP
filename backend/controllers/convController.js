const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Conversation = require("../models/convModel");

//new conv
exports.newConv = catchAsyncErrors(async (req, res) => {
  const { senderId, receiverId } = req.body;
  const conv = await Conversation.create({
    members: [
      senderId,
      receiverId,
    ],
  });
  res.status(201).json({
    success: true,
    conv,
  });
});

// get conversation of user

exports.getConv = catchAsyncErrors(async (req, res) => {
  const conv = await Conversation.find({
      members: { $in: [req.params.userId] },
  });
  
  res.status(200).json({
    success: true,
    conv,
  });
});

// get conv includes two userId
exports.getusersConv=catchAsyncErrors(async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});
