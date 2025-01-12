import React from 'react'
import { useNavigate } from 'react-router-dom'

const HistoryPage = () => {
    const navigate=useNavigate()

    const backToHome=()=>{
        navigate("/home-page")
    }

    const headerContent=()=>{
        if(window.innerWidth>768){
            return (
                <>
                <h1>History</h1>
                </>
            )
        }else{
          return (
                <>
               <div>
                <button type='button' onClick={backToHome}></button>
               </div>
                </>
            )
        }
    }
  return (
    <>
     <section className='section-container'>
      <header>
        {headerContent}
      </header>
      <div className='year-container'>
        <h1>Year Analysis</h1>
        <div id="year-pie-chart"></div>
      </div>
      <div className='month-container'>
        <h1>Month Analysis</h1>
        <div id="month-pie-chart"></div>
      </div>

     </section>
    </>
  )
}

export default HistoryPage