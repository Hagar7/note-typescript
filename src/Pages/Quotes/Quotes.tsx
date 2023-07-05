import React,{useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getQuotes } from '../../store/QuotesSlice'
import style from './Quotes.module.scss'

const Quotes = () => {
const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getQuotes())
    }, [dispatch])
    const { quotes } = useAppSelector((state)=>state.quotes)
  return (
    <div className={`${style.quotes}`}>
    <div className='container'>
        <h2>Ouotes About </h2>
        <div className="row">
            {quotes?.map((item)=>
       <div className="col-md-3">
                  <div className={`${style.items}`}>
                    <div className={`${style.item}`}>
                      <div className={`${style.title}`}>
                        <h3>{item.author}</h3>
                      </div>
                    
                    </div>
                    <div className={`${style.desc}`}>
                      <p>{item.quote}</p>
                    </div>
                  </div>
         </div>
            )}
        </div>
    </div>
    </div>
  )
}

export default Quotes
