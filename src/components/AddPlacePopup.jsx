import React, {useEffect, useState, useRef} from 'react';
import PopupWithForm from "./PopupWithForm";
import useValidateText from "../hooks/useValidateText";
import useValidateUrl from "../hooks/useValidateUrl";

const AddPlacePopup = ({isOpen, isLoading, onClose, onAddCard}) => {

  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  const nameInput = useRef()

  const [isNameValid, nameErrorMessage] = useValidateText(name, 2, 30)
  const [isLinkValid, linkErrorMessage] = useValidateUrl(link)
  const [isDelayedValidation, setIsDelayedValidation] = useState(true)

  const isFormValid = !isDelayedValidation && isLinkValid && isNameValid

  useEffect(() => {
    setName('')
    setLink('')
    if (isOpen) {
      setTimeout( () => nameInput.current.focus(), 100)
      setIsDelayedValidation(true)
    }
  }, [isOpen])

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onAddCard({name, link})
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="new-card"
      buttonText='Создать'
      isOpen={isOpen}
      isLoading={isLoading}
      isValid={isFormValid}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input className={`form__field${!isNameValid && !isDelayedValidation ? ' form__field_type_error' : ''}`}
             type="text"
             ref={nameInput}
             placeholder="Название" autoComplete="off"
             value={name}
             onChange={(evt) => {
               setName(evt.target.value)
               setIsDelayedValidation(false)
             }}
      />
      <span className={`form__field-error${(!isNameValid && !isDelayedValidation && isOpen) ? ' form__field-error_active' : ''}`}>{nameErrorMessage}</span>
      <input className={`form__field${!isLinkValid && !isDelayedValidation ? ' form__field_type_error' : ''}`}
             type="url"
             placeholder="Ссылка на картинку" autoComplete="off"
             value={link}
             onChange={(evt) => {
               setLink(evt.target.value)
               setIsDelayedValidation(false)
             }}/>
      <span className={`form__field-error${(!isLinkValid && !isDelayedValidation && isOpen) ? ' form__field-error_active' : ''}`}>{linkErrorMessage}</span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
