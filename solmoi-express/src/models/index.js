import User from './User.js';
import Portfolio from './Portfolio.js';
import School from './School.js';
import Ranking from './Ranking.js';

User.hasOne(Portfolio, { foreignKey: 'user_id' });
Portfolio.belongsTo(User, { foreignKey: 'user_id' });

School.hasMany(User, { foreignKey: 'school_id' });
User.belongsTo(School, { foreignKey: 'school_id' });

User.hasOne(Ranking, { foreignKey: 'user_id' });
Ranking.belongsTo(User, { foreignKey: 'user_id' });

export { User, Portfolio, School, Ranking };

