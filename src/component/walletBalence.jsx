const WalletBalance = ({ openAddBalanceModal, balanceVal }) => {
  return (
    <div className="walletBalanceCard">
      <span className="balanceTitle">
        Wallet Balance:{" "}
        <span style={{ color: "#9DFF5B", fontWeight: "bold" }}>
          ₹{balanceVal}
        </span>
      </span>
      <button
        type="button"
        className="addIncomeButton"
        onClick={openAddBalanceModal}
      >
        + Add Income
      </button>
    </div>
  );
};

export default WalletBalance;
