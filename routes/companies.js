/** Routes for compannies of. */

const express = require("express");
const router = express.Router();
const ExpressError = require("../expressError")
const db = require("../db");


// router.get('/', async (req, res, next) => {
//     try {
//       const results = await db.query(`SELECT * FROM companies;`);
//       return res.json({ companies: results.rows })
//     } catch (e) {
//       return next(e);
//     }
//   })


router.get('/', async (req, res, next) => {
    try {
      const results = await db.query(`SELECT c.code, c.name, c.description, i.industry FROM companies c JOIN industries i ON c.code = i.company_code;`);
      return res.json({ companies: results.rows })
    } catch (e) {
      return next(e);
    }
  })



  router.get('/:code', async (req, res, next) => {
    try {
      const code = req.params.code;
      const results = await db.query('SELECT * FROM companies WHERE code = $1', [code])
      if (results.rows.length === 0) {
        throw new ExpressError(`Can't find company with code of ${code}`, 404)
      }
      return res.send({ companies: results.rows[0] })
    } catch (e) {
      return next(e)
    }
  })


  router.post('/', async (req, res, next) => {
    try {
      const code = req.body.code
      const name = req.body.name
      const description = req.body.description

      const results = await db.query('INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description', [code, name, description]);
      return res.json({ companies: results.rows })
    } catch (e) {
      return next(e);
    }
  })


  router.put('/:code', async (req, res, next) => {
    try {
      const { code } = req.params;
      console.log(req.body)
      const { name, description } = req.body;
      const results = await db.query('UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING code, name, description', [name, description, code])
      if (results.rows.length === 0) {
        throw new ExpressError(`Can't update company with id of ${code}`, 404)
      }
      return res.send({ companies: results.rows[0] })
    } catch (e) {
      return next(e)
    }
  })


  router.delete('/:code', async (req, res, next) => {
    try {
      const results = db.query('DELETE FROM companies WHERE code = $1', [req.params.code])
      return res.send({ msg: "DELETED!" })
    } catch (e) {
      return next(e)
    }
  })








  module.exports = router;