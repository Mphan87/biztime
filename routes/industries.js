const express = require("express");
const router = express.Router();
const ExpressError = require("../expressError")
const db = require("../db");



router.get('/', async (req, res, next) => {
    try {

      const results = await db.query(`SELECT i.company_code, i.industry, c.name, c.description FROM industries i JOIN companies c ON i.company_code = c.code;`);
      return res.json({ industries: results.rows })
    } catch (e) {
      return next(e);
    }
  })



module.exports = router;