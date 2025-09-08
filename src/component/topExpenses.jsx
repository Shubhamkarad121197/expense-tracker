// const TopExpenses=()=>{
//     return(
//         <>
//         <div className='topExpensesCard'></div>
//         </>
//     )
// }

// export default TopExpenses
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const TopExpenses = ({ expenses }) => {
  if (expenses.length === 0) return <p>No data</p>;

  // ✅ Calculate totals per category
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.price);
    return acc;
  }, {});

  // ✅ Format data for recharts
  const data = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  // ✅ Sort by highest expense first
  data.sort((a, b) => b.value - a.value);

  return (
    <div className='topExpensesCard'>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
        >
          {/* Category names on Y-axis */}
          <YAxis dataKey="name" type="category" tick={{ fontSize: 14 }} />
          {/* Expense values on X-axis */}
          <XAxis type="number" hide />
          {/* Hover tooltip */}
          <Tooltip formatter={(value) => `₹${value}`} />
          {/* Bars */}
          <Bar dataKey="value" fill="#8A84E2" radius={[10, 10, 10, 10]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopExpenses;
