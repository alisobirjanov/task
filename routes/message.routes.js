const express = require("express");
const Message = require("../models/Message");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/message/create", auth, async (req, res) => {
  try {
    console.log(req.user)
    const message = new Message({
      text: req.body.text,
      author: req.user._id,
    });

    const msg = await message.save();

    res.json(msg);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});



router.get("/message/get", auth, async (req, res) => {
  try {
      const messages = await Message.find({ author: req.user.user })
        res.json(messages);
  } catch(e) {
      console.log(e);
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});


router.get("/messages/:id" , async  (req, res) => {
  try {
    const message = await Message.findById({ _id: req.params.id }).populate([
      {
        path: "author",
        select: "email",
      }
    ]);

    if (!message.read) {
      await Message.findByIdAndUpdate({ _id: req.params.id }, {read: true});
      message.read = true
    } 
    
    return res.json(message);


  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
