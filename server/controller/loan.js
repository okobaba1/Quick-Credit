import moment from 'moment';
import loan from '../dummyData/loans';
import dummyData from '../dummyData/auth';

class Loan {
  static specific(req, res) {
    const { id } = req.params;
    const existingLoan = loan.find(user => user.id === Number(id));
    if (existingLoan) {
      const data = existingLoan;
      return res.status(200).json({
        status: 200,
        data,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Not a loan application',
    });
  }


  static viewLoans(req, res) {
    const { status, repaid } = req.query;
    if (status && repaid) {
      const parsedRepaid = JSON.parse(repaid);
      if (status === 'approved' && parsedRepaid === false) {
        const unpaidLoans = loan.filter(user => user.status === 'approved' && user.repaid === Boolean(false));
        if (unpaidLoans) {
          return res.status(200).json({
            status: 200,
            data: unpaidLoans,
          });
        }
        return res.status(404).json({
          status: 404,
          error: 'They are no debtors',
        });
      } if (status === 'approved' && parsedRepaid === Boolean(true)) {
        const paidLoans = loan.filter(user => user.status === 'approved' && user.repaid === Boolean(true));
        if (paidLoans) {
          return res.status(200).json({
            status: 200,
            data: paidLoans,
          });
        }
        return res.status(404).json({
          status: 404,
          error: 'No paid loan was found',
        });
      }
    } return res.status(200).json({
      status: 200,
      data: loan,
    });
  }

  static loanRepayment(req, res) {
    const { id } = req.params;
    const repayArray = loan.find(user => user.id === Number(id));
    if (repayArray) {
      return res.status(200).json({
        status: 200,
        data: {
          id,
          createdOn: repayArray.createdOn,
          monthlyInstallment: repayArray.paymentInstallment,
          amount: repayArray.amount,
        },
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Not a Loan Application',
    });
  }

  static loanApply(req, res) {
    const { email, amount, tenor } = req.body;
    const checkStatus = dummyData.filter(user => user.status === 'verified' && user.email === email);
    if (!checkStatus) {
      return res.status(404).json({
        status: 404,
        error: 'Account status is not verified yet, try again later',
      });
    }
    // check if user owes money
    const checkDebt = loan.filter(user => user.user === email && user.balance > 0);
    if (checkDebt) {
      return res.status(401).json({
        status: 401,
        error: 'Pay up your debt',
      });
    }
    const interest = (0.05 * Number(amount));
    const data = {
      id: loan.length,
      firstName: dummyData.firstName,
      lastName: dummyData.lastName,
      email,
      tenor,
      amount,
      interest,
      paymentInstallment: parseFloat((amount + interest) / tenor, 100),
      status: 'pending',
      balance: amount,
      createdOn: moment().toDate(),
    };
    loan.push(data);
    return res.status(201).json({
      status: 201,
      data,
    });
  }


  static Approveloan(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const loanApplication = loan.find(user => user.id === Number(id) && user.status === 'pending');

    if (loanApplication) {
      loan.find(user => user.id === Number(id) && user.status === 'pending').status = status;
      return res.status(200).json({
        status: 200,
        message: `Loan ${status}`,
        data: {
          loanId: id,
          LoanAmount: loanApplication.amount,
          tenor: loanApplication.status,
          status,
          monthlyInstallment: loanApplication.paymentInstallment,
          interest: loanApplication.interest,

        },
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Loan not found',
    });
  }

  static repaymentRecord(req, res) {
    const { id } = req.params;
    const findLoan = loan.find(user => user.id === Number(id));
    if (findLoan) {
      return res.status(201).json({
        status: 201,
        data: {
          loanId: id,
          createdOn: findLoan.createdOn,
          amount: findLoan.amount,
          monthlyInstallment: findLoan.paymentInstallment,
          paidAmount: (findLoan.amount - findLoan.balance),
          balance: findLoan.balance,
        },
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'No loans found',
    });
  }
}

export default Loan;
