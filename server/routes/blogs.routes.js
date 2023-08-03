const express = require("express");
const router = express.Router();
const db = require("../ultils/database");

router.get("/", async (req, res) => {
  try {
    const data = await db.execute("select * from blog");
    res.json({ blogs: data[0] });
  } catch (error) {
    res.json({ message: "get all blogs fail" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await db.execute("select * from blog where blog_id = ?", [id]);
    res.json({ blogs: data[0] });
  } catch (error) {
    res.json({ message: "get blog by id" });
  }
});

router.post("/", async (req, res) => {
  const { title, body, user_id } = req.body;
  console.log(title, body, user_id);
  try {
    await db.execute(
      "insert into blog (title, body, user_id) values (?, ?, ?)",
      [title, body, user_id]
    );
    let data = await db.execute("SELECT * FROM blog");
    res.json({ message: "create blog success", blogs: data[0] });
  } catch (error) {
    res.json({ message: "create blog fail" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, body, user_id } = req.body;
  try {
    await db.execute(
      "update blog set title=?, body=?, user_id=? where blog_id=?",
      [title, body, user_id, id]
    );

    let data = await db.execute("select * from blog");
    res.json({ message: "update blog success", blogs: data[0] });
  } catch (error) {
    res.json({ message: "update blog fail" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("delete from blog where blog_id=?", [id]);
    let data = await db.execute("select * from blog");
    res.json({ message: "delete blog success", blogs: data[0] });
  } catch (error) {
    res.json({ message: "delete blog fail" });
  }
});

module.exports = router;
