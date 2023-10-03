import React, {useState} from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({isOpen, isLoading, onClose, onAddCard}) => {

  const [newCard, setNewCard] = useState({name: '', link: ''})

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onAddCard(newCard)
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="new-card"
      buttonText='Создать'
      isOpen={isOpen}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input className="form__field form__field_type_place-title" id="place-title" name="name" type="text"
             placeholder="Название" autoComplete="off" minLength="2" maxLength="30" required
             value={newCard.name}
             onChange={(evt) => setNewCard({...newCard, name: evt.target.value})}/>
      <span className="place-title-error form__field-error"/>
      <input className="form__field form__field_type_place-link" id="place-link" name="link" type="url"
             placeholder="Ссылка на картинку" autoComplete="off" required
             value={newCard.link}
             onChange={(evt) => setNewCard({...newCard, link: evt.target.value})}/>
      <span className="place-link-error form__field-error"/>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
