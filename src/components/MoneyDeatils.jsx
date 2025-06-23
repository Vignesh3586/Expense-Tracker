import { useSelector } from 'react-redux'
import { selectData} from '../slices/transctionSlice'

const MoneyDeatils = () => {

  const userDetails=useSelector(selectData);

  console.log(userDetails?.balance)

  return (
    <section className="money-details">
        <div className="money-balance">
            <label htmlFor="balance">Balance</label>
            <div id='balance' style={{fontFamily:"initial"}}>{"\u20B9"}{userDetails?.balance || 0}</div>
        </div>
        <div className="money-income-expenses">
        <div className="money-income">
            <label htmlFor="income">Income</label>
            <div id='income' style={{fontFamily:"initial",
              color:"#23e465"
            }}>{"\u20B9"}{userDetails?.income || 0}</div>
        </div>
        <div className="money-expenses">
            <label htmlFor="expenses">Expense</label>
            <div id='expenses' style={{fontFamily:"initial",
              color:" #ec1d1d"
            }}>{"\u20B9"}{userDetails?.expense||0}</div>
        </div>
        </div>
    </section>
  )
}

export default MoneyDeatils