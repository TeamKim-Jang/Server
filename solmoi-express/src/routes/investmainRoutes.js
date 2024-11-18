const express = require("express");
const router = express.Router();
const investmainController = require("../controllers/investmainController.js");

router.get("/", investmainController.getAllInvestments);

module.exports = router;
