const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Conversation = require("../models/convModel");

//new conv
exports.newConv = catchAsyncErrors(async (req, res) => {
  const conv = await Conversation.create({
    members: [
      req.body.senderId,
      req.body.receiverId,
    ],
  });
  res.status(201).json(conv);
});

// get conversation of user

exports.getConv = catchAsyncErrors(async (req, res) => {
  const conv = await Conversation.find({
    members: { $in: [req.params.userId] },
  });
  res.status(200).json(conv);
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
