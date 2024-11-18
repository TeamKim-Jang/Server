const investModel = require("../models/investmainModels.js");

exports.getAllInvestments = async () => {
  return await investModel.getAllInvestments();
};
