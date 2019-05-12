import loan from '../dummyData/loans';

class Loan {
  static specific(req, res) {
    const { id } = req.params;
    const existingLoan = loan.filter(user => user.id === Number(id));
    if (existingLoan.length === 1) {
      const data = existingLoan[0];
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

  static unpaid(req, res) {
    const { status } = req.query;
    const unpaidLoans = loan.filter(user => user.status === 'approved' && user.repaid === false);
    if (unpaidLoans.length >= 1) {
      return res.status(200).json({
        status: 200,
        data: unpaidLoans,
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'They are no debtors',
    });
  }

  static paid(req, res) {
    const { status } = req.query;
    const paidLoans = loan.filter(user => user.status === 'approved' && user.repaid === true);
    if (paidLoans.length >= 1) {
      return res.status(200).json({
        status: 200,
        data: paidLoans,
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'Clients aren\'t paying',
    });
  }

  static allLoans(req, res) {
    return res.status(200).json({
      status: 200,
      data: loan,
    });
  }
}

export default Loan;
