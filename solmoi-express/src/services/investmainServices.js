const investModel = require("../models/investmainModels.js");

exports.getAllInvestments = async () => {
  return await investModel.getAllInvestments();
};

exports.addInvestment = async (investmentData) => {
  return await investModel.addInvestment(investmentData);
};
