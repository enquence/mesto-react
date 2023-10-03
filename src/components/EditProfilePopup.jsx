import React, {useContext, useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/currentUser";

function EditProfilePopup({isOpen, isLoading, onClose, onUpdateUser}) {

  const currentUser = useContext(CurrentUserContext)
  const [name, setName] = useState(currentUser.name)
  const [about, setAbout] = useState(currentUser.about)

  useEffect(() => {
    setName(currentUser.name)
    setAbout(currentUser.about)
  }, [currentUser])


  const handleSubmit = (evt) => {
    evt.preventDefault()
    onUpdateUser({ name, about })
  }

  return (
      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input className="form__field form__field_type_name" id="user-name" name="name" type="text"
               placeholder="Ваше имя" autoComplete="off" required minLength="2" maxLength="40"
               value={name || ''}
               onChange={(evt) => setName(evt.target.value)}/>
        <span className="user-name-error form__field-error"/>
        <input className="form__field form__field_type_occupation" id="user-description" name="about" type="text"
               placeholder="Что вас определяет?" autoComplete="off" required minLength="2" maxLength="200"
               value={about || ''}
               onChange={(evt) => setAbout(evt.target.value)}/>
        <span className="user-job-error form__field-error"/>
      </PopupWithForm>
  );
}

export default EditProfilePopup;
