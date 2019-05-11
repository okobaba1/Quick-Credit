const loans = [
  {
    id: 1,
    user: 'amojnnfs@email.com', // user email
    createdOn: '24/07/2018',
    status: 'approved', // pending, approved, rejected
    repaid: false,
    tenor: 9, // maximum of 12 months
    amount: 56000,
    paymentInstallment: 6533.33, // monthly installment payment
    balance: 19600,
    interest: 2800, // 5% of amount
  },
];
export default loans;
