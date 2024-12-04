import { Transaction } from "../models/index.js";

class TransactionRepository {
  async createTransaction(userId, stockId, type, quantity, price) {
    return await Transaction.create({
      user_id: userId,
      stock_id: stockId,
      transaction_type: type,
      quantity,
      price,
    });
  }
}

export default new TransactionRepository();
