const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Message = require("../models/msgModel");

//add message
exports.addMsg = catchAsyncErrors(async (req, res) => {
  const newMessage = await Message.create(req.body);

  res.status(200).json({
    success: true,
    newMessage,
  })
});

//get message
exports.getMsg = catchAsyncErrors(async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});
