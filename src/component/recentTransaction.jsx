

const RecentTransaction = ({ recentTransaction, setRecentTransaction, setBalanceVal, setExpenseCost , onEdit}) => {

  const deleteExpense = (index) => {
    setRecentTransaction((prev) => {
      const itemToDelete = prev[index];
      const newPrice = Number(itemToDelete.price);

      setBalanceVal((prevBal) => prevBal + newPrice);
      setExpenseCost((prevCost) => prevCost - newPrice);

      return prev.filter((_, i) => i !== index);
    });
  };



  return (
    <div className="recentTransactionTable">
      {recentTransaction.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            color: "#9B9B9B",
            fontStyle: "italic",
          }}
        >
          No data available
        </div>
      ) : (
        recentTransaction.map((data, index) => (
          <div
            key={index}
            className="row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              borderBottom: "2px solid #9B9B9B",
              padding: "5px",
            }}
          >
            <div style={{ display: "flex", gap: "0.5em" }}>
              <div className="icon"></div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>{data.title}</span>
                <span style={{ color: "#9B9B9B" }}>{data.category}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5em" }}>
              <div style={{ color: "#FF9304", display: "flex", marginTop: "10px" }}>
                ₹{data.price}
              </div>
              <div className="delete">
                <span
                  className="material-symbols-outlined"
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteExpense(index)}
                >
                  delete
                </span>
              </div>
              <div className="edit">
                <span className="material-symbols-outlined" onClick={() => onEdit(index)} style={{ cursor: "pointer" }}>
                  edit
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentTransaction;
