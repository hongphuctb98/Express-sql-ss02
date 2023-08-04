const express = require("express");
const router = express.Router();
const db = require("../ultils/database");

router.get("/", async (req, res) => {
  const { keysearch } = req.query;
  const { page } = req.query || 1;

  try {
    let query = "SELECT * FROM user";
    if (keysearch) {
      query += ` WHERE username LIKE "%${keysearch}%"`;
    }
    if (page) {
      query += ` LIMIT 5 OFFSET ${(page - 1) * 5}`;
    }
    let data = await db.execute(query);
    res.json({ users: data[0] });
  } catch (error) {
    res.json({ message: "get all users" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let data = await db.execute("SELECT * FROM user WHERE user_id = ?", [id]);
    res.json({ users: data[0][0] });
  } catch (error) {
    res.json({ message: "get user by id" });
  }
});

router.post("/", async (req, res) => {
  const { name, username, email, website, phone } = req.body;
  console.log(name, username, email, website, phone);
  try {
    await db.execute(
      "insert into user (name, username, email, website, phone) values (?, ?, ?, ?, ?)",
      [name, username, email, website, phone]
    );
    let data = await db.execute("SELECT * FROM user");
    res.json({ message: "create user success", users: data[0] });
  } catch (error) {
    res.json({ message: "create user fail" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, username, email, website, phone } = req.body;
  try {
    await db.execute(
      "update user set name = ?, username = ?, email = ?, website = ?, phone = ? where user_id = ?",
      [name, username, email, website, phone, id]
    );
    let data = await db.execute("SELECT * FROM user");
    res.json({ message: "update user success", users: data[0] });
  } catch (error) {
    res.json({ message: "update user fail" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("delete from user where user_id = ?", [id]);
    let data = await db.execute("SELECT * FROM user");
    res.json({ message: "delete user success", users: data[0] });
  } catch (error) {
    res.json({ message: "delete user fail" });
  }
});

//search

module.exports = router;
