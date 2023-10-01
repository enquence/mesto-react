import Header from "./Header";
import Main from './Main';
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {useEffect, useState} from "react";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(isEditAvatarPopupOpen => !isEditAvatarPopupOpen)
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(isEditProfilePopupOpen => !isEditProfilePopupOpen)
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(isAddPlacePopupOpen => !isAddPlacePopupOpen)
  const handleConfirmClick = () => setIsConfirmPopupOpen(isConfirmPopupOpen => !isConfirmPopupOpen)
  const handleCardClick = (card) => setSelectedCard(card)

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsConfirmPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setSelectedCard(null)
  }

  useEffect(() => {

    const handleClosePopupsOnEsc = (evt) => {
      if (evt.key === 'Escape') closeAllPopups()
    }
    window.addEventListener('keyup', handleClosePopupsOnEsc)

    return () => window.removeEventListener('keyup', handleClosePopupsOnEsc)
  })

  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onConfirm={handleConfirmClick}
        onClose={closeAllPopups}
      />
      <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <form className="form form_type_avatar" name="avatar">
          <input className="form__field form__field_type_avatar" id="avatar" name="avatar" type="url"
                 placeholder="Введите ссылку на картинку" autoComplete="off" required/>
            <span className="avatar-error form__field-error"/>
            <button className="form__save-button" type="submit">Сохранить</button>
        </form>
      </PopupWithForm>
      <PopupWithForm title="Новое место" name="new-card" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <form className="form form_type_new-card" name="new-card">
          <input className="form__field form__field_type_place-title" id="place-title" name="name" type="text"
                 placeholder="Название" autoComplete="off" minLength="2" maxLength="30" required/>
            <span className="place-title-error form__field-error"/>
            <input className="form__field form__field_type_place-link" id="place-link" name="link" type="url"
                   placeholder="Ссылка на картинку" autoComplete="off" required/>
              <span className="place-link-error form__field-error"/>
              <button className="form__save-button" type="submit">Создать</button>
        </form>
      </PopupWithForm>
      <PopupWithForm title="Редактировать профиль" name="profile" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <form className="form form_type_profile" name="profile">
          <input className="form__field form__field_type_name" id="user-name" name="name" type="text"
                 placeholder="Ваше имя" autoComplete="off" required minLength="2" maxLength="40" value="  "/>
          <span className="user-name-error form__field-error"/>
          <input className="form__field form__field_type_occupation" id="user-description" name="about" type="text"
                 placeholder="Что вас определяет?" autoComplete="off" required minLength="2" maxLength="200"
                 value="  "/>
          <span className="user-job-error form__field-error"/>
          <button className="form__save-button" type="submit">Сохранить</button>
        </form>
      </PopupWithForm>
      <PopupWithForm title="Вы уверены?" name="confirm" isOpen={isConfirmPopupOpen} onClose={closeAllPopups}>
        <button className="popup__confirm-button" type="button">Да</button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      <Footer />
    </>
  );
}

export default App;
