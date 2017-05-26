import React from 'react'

const Select = (props) => {
  const {options, history, match, location, staticContext, ...restOfProps} = props
  const optionElements = options.map((option) => (
      <option key={option.id} value={option.id} >
        {option.title}
      </option>
    )
  )
  let selectedOption = location.pathname.substring(1);

  return (
    <select value={selectedOption} onChange={(e) => {history.push(`/${e.target.value}`)}} {...restOfProps} >
      {optionElements}
    </select>
  )
}

export default Select