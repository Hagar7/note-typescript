import React,{useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getQuotes } from '../../store/QuotesSlice'
import style from './Quotes.module.scss'
import { BounceLoader } from 'react-spinners'

const Quotes = () => {
const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getQuotes())
    }, [dispatch])
    const { quotes,loading } = useAppSelector((state)=>state.quotes)
  return (

    loading?(
      <div
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        background: "#212428",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BounceLoader color="#EAC51F" loading />
    </div>
    ):(
      <div className={`${style.quotes}`}>
      <div className='container'>
          <h2>Ouotes About Success</h2>
          <div className="row">
              {quotes?.map((item,index)=>
         <div className="col-md-3" key={index}>
                    <div className={`${style.items}`} >
                      <div className={`${style.item}`}>
                        <div className={`${style.title}`}>
                          <h3>{item.author}</h3>
                        </div> 
                      <div className={`${style.desc}`}>
                        <p>{item.quote}</p>
                      </div>
                      </div>
                    </div>
           </div>
              )}
          </div>
      </div>
      </div>
    )
  )
}

export default Quotes
