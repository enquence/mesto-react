import React, {useEffect, useRef, useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import useValidateUrl from "../hooks/useValidateUrl";

const EditAvatarPopup = ({isOpen, isLoading, onClose, onUpdateAvatar}) => {

  const avatarInput = useRef(null)
  const [link, setLink] = useState('')
  const [isLinkValid, linkErrorMessage] = useValidateUrl(link)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onUpdateAvatar({avatar: avatarInput.current.value})
  }

  useEffect(() => {
    avatarInput.current.value = ''
    setLink('')
    if (isOpen) setTimeout( () => avatarInput.current.focus(), 100)
  }, [isOpen])

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      isLoading={isLoading}
      isValid={isLinkValid}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input className={`form__field${!isLinkValid ? ' form__field_type_error' : ''}`}
             type="url"
             placeholder="Введите ссылку на картинку"
             autoComplete="off"
             ref={avatarInput}
             onChange={(evt) => setLink(evt.target.value)}
      />
      <span className={`form__field-error${(!isLinkValid && isOpen) ? ' form__field-error_active' : ''}`}>{linkErrorMessage}</span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
