import React, {useRef} from 'react';
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({isOpen, isLoading, onClose, onUpdateAvatar}) => {

  const avatarInput = useRef(null)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onUpdateAvatar({avatar: avatarInput.current.value})
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input className="form__field form__field_type_avatar" id="avatar" name="avatar" type="url"
             placeholder="Введите ссылку на картинку" autoComplete="off" required ref={avatarInput}/>
      <span className="avatar-error form__field-error"/>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
