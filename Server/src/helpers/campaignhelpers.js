const moment = require('moment');
const Transaction = require('../models/transaction');

const calculateRaisedMoney = (transactions) => {
  let raisedMoney = 0;

  transactions.forEach((transaction) => {
    const amountInBirr =
      transaction.currency === 'usd' ? transaction.amount * 57.48 : transaction.amount;
    raisedMoney += amountInBirr;
  });

  return Math.ceil(raisedMoney);
};
const getDaysOfWeek = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(moment().subtract(i, 'days').format('ddd'));
  }
  return days.reverse();
};

function tableWeeklyTransactions(transactions) {
  // Generate data for current week
  const thisWeekData = [0, 0, 0, 0, 0, 0, 0];
  const daysOfWeek = getDaysOfWeek();
  const exchangeRate = 57.48;

  transactions.forEach((transaction) => {
    const dayOfWeek = moment(transaction.createdAt).format('ddd');
    if (daysOfWeek.includes(dayOfWeek)) {
      const index = daysOfWeek.indexOf(dayOfWeek);
      const amountInBirr =
        transaction.currency === 'usd' ? transaction.amount * exchangeRate : transaction.amount;
      thisWeekData[index] += amountInBirr;
    }
  });

  // Floor the numbers to remove decimal parts
  const flooredWeekData = thisWeekData.map(Math.floor);
  return {
    flooredWeekData,
    daysOfWeek,
  };
}

const getTodayTransactionsCount = async (campaignId) => {
  // Get the start and end of today in UTC
  const startOfToday = new Date();
  startOfToday.setUTCHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setUTCHours(23, 59, 59, 999);

  // Find transactions created today
  const transactions = await Transaction.find({
    campaignId: campaignId,
    createdAt: {
      $gte: startOfToday,
      $lt: endOfToday,
    },
  });

  // Return the count of transactions
  return transactions;
};
module.exports = {
  calculateRaisedMoney,
  tableWeeklyTransactions,
  getTodayTransactionsCount,
};
