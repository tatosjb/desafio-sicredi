import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faSave } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.module.scss'

function Editable({onUpdate, onCancel, value}) {
  const [inputValue, setInputValue] = useState(value)

  function onInputChange(e) {
    setInputValue(e.target.value)
  }

  return (
    <div className={`${styles.edit} ${styles.showContainer}`}>
      <form onSubmit={() => onUpdate(inputValue)}>
        <input length="20" value={inputValue} onChange={onInputChange} onBlur={() => onUpdate(inputValue)} />
      </form>

        <a onClick={() => onUpdate(inputValue)}><FontAwesomeIcon icon={faSave} color="gray"/></a>
    </div>
  )
}

function ReadOnly({ value, onEdit, success, failure }) {
  let animation = (success && styles.success) || (failure && styles.failure) || ''

  return (
    <div onClick={onEdit} className={`${animation} ${styles.showContainer}`}>
      <label>
        {value}
      </label>

      <span>
        <FontAwesomeIcon icon={faPen} color="gray"/>
      </span>
    </div>
  )
}

export default function EditableTextInput({ value, onUpdate, editMode }) {
  const [editting, setEditing] = useState(editMode)
  const [animateSuccess, setAnimateSuccess] = useState(false)
  const [animateFailure, setAnimateFailure] = useState(false)

  function edit() {
    setEditing(true)
  }

  function show() {
    setEditing(false)
  }

  function success(){
    setAnimateSuccess(true)
    setTimeout(function(){
      setAnimateSuccess(false)
    }, 3000)
  }

  function failure(){
    setAnimateFailure(true)
    setTimeout(function(){
      setAnimateFailure(false)
    }, 3000)
  }

  async function update(value) {
    show()

    const succeded = await onUpdate(value)
    succeded ? success() : failure()
  }

  return editting
    ? (<Editable value={value} onUpdate={update} />)
    : (<ReadOnly failure={animateFailure} success={animateSuccess} onEdit={edit} value={value} />)
}
