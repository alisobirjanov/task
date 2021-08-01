const express = require("express");
const Message = require("../models/Message");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/admin/get/messages", auth, async (req, res) => {
  try {
    if(req.user.rol === 'admin') {
      const messages = await Message.find({})
        .populate([
          {
            path: "author",
            select: "email",
          },
        ])
      res.json(messages);
    }
    
  } catch (e) {
    res.json
      .status(500)
      .json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
