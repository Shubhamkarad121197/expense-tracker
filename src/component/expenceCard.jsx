const ExpenceCard = ({ openWalletModal, expenseCost }) => {
  return (
    <div className="walletBalanceCard">
      <span className="balanceTitle">
        Expenses:
        <span style={{ color: "#FF9304", fontWeight: "bold" }}>
          ₹{expenseCost}
        </span>
      </span>
      <button
        type="button"
        className="addExpenceButton"
        onClick={openWalletModal}
      >
        + Add Expense
      </button>
    </div>
  );
};

export default ExpenceCard;
