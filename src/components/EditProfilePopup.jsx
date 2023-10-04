import React, {useContext, useEffect, useMemo, useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/currentUser";
import useValidateText from "../hooks/useValidateText";

function EditProfilePopup({isOpen, isLoading, onClose, onUpdateUser}) {

  const currentUser = useContext(CurrentUserContext)
  const [name, setName] = useState(currentUser.name)
  const [about, setAbout] = useState(currentUser.about)

  const [isNameValid, nameErrorMessage] = useValidateText(name, 2, 40)
  const [isAboutValid, aboutErrorMessage] = useValidateText(about, 2, 200)

  const isFormValid = useMemo(() => isAboutValid && isNameValid, [isAboutValid, isNameValid])

  useEffect(() => {
    setName(currentUser.name)
    setAbout(currentUser.about)
  }, [currentUser])

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onUpdateUser({name, about})
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      isLoading={isLoading}
      isValid={isFormValid}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input className={`form__field${!isNameValid ? ' form__field_type_error' : ''}`}
             type="text"
             placeholder="Ваше имя"
             autoComplete="off"
             value={name || ''}
             onChange={(evt) => setName(evt.target.value)}/>
      <span className={`form__field-error${(!isNameValid && isOpen) ? ' form__field-error_active' : ''}`}>{nameErrorMessage}</span>
      <input className={`form__field${!isAboutValid ? ' form__field_type_error' : ''}`}
             type="text"
             placeholder="Что вас определяет?"
             autoComplete="off"
             value={about || ''}
             onChange={(evt) => setAbout(evt.target.value)}/>
      <span className={`form__field-error${(!isAboutValid && isOpen) ? ' form__field-error_active' : ''}`}>{aboutErrorMessage}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
