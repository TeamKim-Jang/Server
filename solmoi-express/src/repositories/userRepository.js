import { User } from "../models/index.js";

class UserRepository {
  async getUserById(userId) {
    return await User.findByPk(userId);
  }

  async updateCashBalance(userId, newBalance) {
    return await User.update({ cash_balance: newBalance }, { where: { user_id: userId } });
  }
}

export default new UserRepository();
