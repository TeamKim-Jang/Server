import School from "./School.js";
import Attendance from "./attendance.js";
import User from "./user.js"

User.belongsTo(School, { foreignKey: 'school_id' });
Attendance.belongsTo(User, { foreignKey: 'user_id' });


export {
    User,
    School,
    Attendance,
  };