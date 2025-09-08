
import './App.css'
import ExpenseTrackerHome from './component/ExpenseTrackerHome'
import { SnackbarProvider, useSnackbar } from 'notistack'

const App=()=>{
  return (<>

 <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <ExpenseTrackerHome/>
  </SnackbarProvider>
  
  </>)
}
export default App
