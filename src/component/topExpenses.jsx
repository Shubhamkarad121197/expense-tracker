
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const TopExpenses = ({ expenses }) => {
  if (expenses.length === 0) return <p>No data</p>;


  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.price);
    return acc;
  }, {});

  
  const data = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));


  data.sort((a, b) => b.value - a.value);

  return (
    <div className='topExpensesCard'>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
        >
 
          <YAxis dataKey="name" type="category" tick={{ fontSize: 14 }} />
    
          <XAxis type="number" hide />
     
          <Tooltip formatter={(value) => `₹${value}`} />
          
          <Bar dataKey="value" fill="#8A84E2" radius={[10, 10, 10, 10]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopExpenses;
