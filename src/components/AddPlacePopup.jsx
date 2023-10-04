import React, {useEffect, useMemo, useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import useValidateText from "../hooks/useValidateText";

const AddPlacePopup = ({isOpen, isLoading, onClose, onAddCard}) => {

  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  const [isNameValid, nameErrorMessage] = useValidateText(name, 2, 30)
  const [isLinkValid, linkErrorMessage] = useValidateText(link)

  const isFormValid = useMemo(() => isLinkValid && isNameValid, [isLinkValid, isNameValid])

  useEffect(() => {
    setName('')
    setLink('')
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
      <input className={`form__field${!isNameValid ? ' form__field_type_error' : ''}`}
             type="text"
             placeholder="Название" autoComplete="off"
             value={name}
             onChange={(evt) => setName(evt.target.value)}/>
      <span className={`form__field-error${(!isNameValid && isOpen) ? ' form__field-error_active' : ''}`}>{nameErrorMessage}</span>
      <input className={`form__field${!isLinkValid ? ' form__field_type_error' : ''}`}
             type="url"
             placeholder="Ссылка на картинку" autoComplete="off"
             value={link}
             onChange={(evt) => setLink(evt.target.value)}/>
      <span className={`form__field-error${(!isLinkValid && isOpen) ? ' form__field-error_active' : ''}`}>{linkErrorMessage}</span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
