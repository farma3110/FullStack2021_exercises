import React from 'react'

const AddForm = ({submit, name, number, nameHandler, numberHandler}) => {
  return(
  	<div>
  	  <form onSubmit={submit}>
        <div>
          name: <input value={name} onChange={nameHandler}/>
        </div>
         <div>
           number: <input value={number} onChange={numberHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  	</div>
  )
}


export default AddForm