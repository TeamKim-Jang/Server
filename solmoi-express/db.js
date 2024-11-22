const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("yourdatabase", "root", "00000000", {
  host: "127.0.0.1",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize;
