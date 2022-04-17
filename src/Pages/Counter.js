import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment,incrementByAmount,decrementByAmount } from '../features/counter/counterSlice';

const Counter = () => {
    const count = useSelector((state)=> state.counter.value);
    const dispatch = useDispatch()
  return (
      <div>
          <div>
              <button aria-label='Increment value' onClick={()=> dispatch(increment())}>Increment</button>
              <span>{count}</span>
              <button aria-label='Decrement value' onClick={()=>dispatch(decrement())}>Decrement</button>
              <br/>
              <button aria-label='increment By value' onClick={()=>dispatch(incrementByAmount(27))}>Increment by 27</button>
              <button aria-label='Decrement By value' onClick={()=>dispatch(decrementByAmount(27))}>Decrement by 27</button>
          </div>
      </div>
  )
}

export default Counter