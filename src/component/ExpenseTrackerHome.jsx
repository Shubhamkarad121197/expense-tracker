import { useState } from "react";
import RecentTransaction from "./recentTransaction";
import ExpenceCard from "./expenceCard";
import PiechartComponent from "./pieChart";
import WalletBalance from "./walletBalence";
import TopExpenses from "./topExpenses";
import ReactModal from "react-modal";
import { useSnackbar } from "notistack";

ReactModal.setAppElement("#root");

const ExpenseTrackerHome = () => {
  const { enqueueSnackbar } = useSnackbar(); // ✅ hook inside component

  const [walletIsOpen, setWalletIsOpen] = useState(false);
  const [addBalanceModalOpen, setAddBalanceModalOpen] = useState(false);
  const [balanceVal, setBalanceVal] = useState(5000);
  const [newBalance, setNewBalance] = useState("");
  const [expenseCost, setExpenseCost] = useState(0);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const [recentTransaction, setRecentTransaction] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const addBalance = (e) => {
    e.preventDefault();
    const num = Number(newBalance);
    if (!isNaN(num) && num > 0) {
      setBalanceVal((prev) => prev + num);
      setNewBalance("");
      setAddBalanceModalOpen(false);
      enqueueSnackbar("Balance added successfully!", { variant: "success" });
    }
  };

  const saveExpense = (e) => {
    e.preventDefault();
    const newExpense = { title, price: Number(price), category, date };

    // ✅ check if entered price exceeds balance
    let availableBalance = balanceVal;
    if (isEditing) {
      const oldExpense = recentTransaction[editIndex];
      availableBalance += Number(oldExpense.price); // allow editing to increase price within old + available
    }

    if (Number(price) > availableBalance) {
      enqueueSnackbar("Entered amount exceeds available balance!", { variant: "error" });
      return; // stop saving
    }

    if (isEditing) {
      // update mode
      const oldExpense = recentTransaction[editIndex];
      const diff = Number(price) - Number(oldExpense.price);

      setRecentTransaction((prev) =>
        prev.map((item, i) => (i === editIndex ? newExpense : item))
      );

      setBalanceVal((prev) => prev - diff);
      setExpenseCost((prev) => prev + diff);

      setIsEditing(false);
      setEditIndex(null);
      enqueueSnackbar("Transaction updated successfully!", { variant: "success" });
    } else {
      // add mode
      setRecentTransaction((prev) => [...prev, newExpense]);
      setBalanceVal((prev) => prev - Number(price));
      setExpenseCost((prev) => prev + Number(price));
      enqueueSnackbar("Transaction added successfully!", { variant: "success" });
    }

    // reset form
    setTitle("");
    setPrice("");
    setCategory("");
    setDate("");
    setWalletIsOpen(false);
  };

  const handleEditExpense = (index) => {
    const expense = recentTransaction[index];
    setTitle(expense.title);
    setPrice(expense.price);
    setCategory(expense.category);
    setDate(expense.date);
    setEditIndex(index);
    setIsEditing(true);
    setWalletIsOpen(true);
  };

  return (
    <>
      <div className="expenseTrackerContainer">
        <h1 className="appTitle">Expense Tracker</h1>

        <div className="expenseWalletInfoCard">
          <WalletBalance
            openAddBalanceModal={() => setAddBalanceModalOpen(true)}
            balanceVal={balanceVal}
          />
          <ExpenceCard
            openWalletModal={() => setWalletIsOpen(true)}
            expenseCost={expenseCost}
          />
          <PiechartComponent expenses={recentTransaction} />
        </div>

        <div className="recentTransactionContainer">
          <div>
            <span className="categoryTitle">Recent Transactions</span>
            <br />
            <RecentTransaction
              recentTransaction={recentTransaction}
              setRecentTransaction={setRecentTransaction}
              setBalanceVal={setBalanceVal}
              setExpenseCost={setExpenseCost}
              onEdit={handleEditExpense} // ✅ pass edit handler
            />
          </div>
          <div>
            <span className="categoryTitle">Top Expenses</span>
            <br />
            <TopExpenses expenses={recentTransaction} />
          </div>
        </div>
      </div>

      {/* Modal for Add / Edit Expense */}
      <ReactModal
        isOpen={walletIsOpen}
        onRequestClose={() => setWalletIsOpen(false)}
        contentLabel="Add Expense"
        style={{
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            height: "33%",
            maxHeight: "80vh",
            overflowY: "auto",
            background: "#EFEFEFD9",
            borderRadius: "10px",
          },
        }}
      >
        <h2 className="modalTitle">
          {isEditing ? "Edit Expense" : "Add Expense"}
        </h2>
        <form onSubmit={saveExpense}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2em" }}>
            <div style={{ display: "flex", gap: "2em" }}>
              <div className="inputBox">
                <input
                  type="text"
                  name='title'
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="inputBox">
                <input
                  type="number"
                  placeholder="Price"
                  name='price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min="0"
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: "2em" }}>
              <div className="inputBox">
                <input
                  type="text"
                  name='category'
                  placeholder="Select Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="inputBox">
                <input
                  type="date"
                  name="date"
                  placeholder="dd/mm/yyyy"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}></div>
          <button type="submit" className="addExpenseButtonModal">
            {isEditing ? "Update Expense" : "Add Expense"}
          </button>{" "}
          &nbsp;
          <button
            type="button"
            className="closeExpenseButtonModal"
            onClick={() => {
              setWalletIsOpen(false);
              setIsEditing(false);
              setEditIndex(null);
            }}
          >
            Cancel
          </button>
        </form>
      </ReactModal>

      {/* Modal For Add Balance */}
      <ReactModal
        isOpen={addBalanceModalOpen}
        onRequestClose={() => setAddBalanceModalOpen(false)}
        contentLabel="Add Balance"
        style={{
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            height: "20%",
            maxHeight: "80vh",
            overflowY: "auto",
            background: "#EFEFEFD9",
            borderRadius: "10px",
          },
        }}
      >
        <h2>Add Balance</h2>
        <form onSubmit={addBalance}>
          <input
            type="number"
            placeholder="Income Amount"

            value={newBalance}
            onChange={(e) => setNewBalance(e.target.value)}
            required
            min="1"
          />
          <div style={{ marginTop: "10px" }}>
            <button type="submit" className="addExpenseButtonModal">Add Balance</button>
            <button
              type="button"
               className="closeExpenseButtonModal"
              onClick={() => setAddBalanceModalOpen(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </ReactModal>
    </>
  );
};

export default ExpenseTrackerHome;
