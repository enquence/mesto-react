import Header from "./Header";
import Main from './Main';
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
import React from "react";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false)

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  const handleConfirmClick = () => setIsConfirmPopupOpen(!isConfirmPopupOpen)

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsConfirmPopupOpen(false)
    setIsEditProfilePopupOpen(false)
  }

  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
      />
      <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>
      <PopupWithForm title="Новое место" name="new-card" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
      <PopupWithForm title="Редактировать профиль" name="profile" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}/>
      <PopupWithForm title="Вы уверены?" name="confirm" isOpen={isConfirmPopupOpen} onClose={closeAllPopups}/>
      <PopupWithImage />
      <footer className="footer">
        <p className="footer__copyright">© 2023 Mesto Russia</p>
      </footer>
     {/* <div className="popup popup_type_profile">
        <div className="popup__container">
          <button className="popup__close-button" type="button"/>
          <h2 className="popup__title">Редактировать профиль</h2>
          <form className="form form_type_profile" name="profile">
            <input className="form__field form__field_type_name" id="user-name" name="name" type="text"
                   placeholder="Ваше имя" autoComplete="off" required minLength="2" maxLength="40" value="  "/>
            <span className="user-name-error form__field-error"/>
            <input className="form__field form__field_type_occupation" id="user-job" name="about" type="text"
                   placeholder="Что вас определяет?" autoComplete="off" required minLength="2" maxLength="200"
                   value="  "/>
            <span className="user-job-error form__field-error"/>
            <button className="form__save-button" type="submit">Сохранить</button>
          </form>
        </div>
      </div>
      <div className="popup popup_type_avatar">
        <div className="popup__container">
          <button className="popup__close-button" type="button"></button>
          <h2 className="popup__title">Обновить аватар</h2>
          <form className="form form_type_avatar" name="avatar">
            <input className="form__field form__field_type_avatar" id="avatar" name="avatar" type="url"
                   placeholder="Введите ссылку на картинку" autoComplete="off" required/>
            <span className="avatar-error form__field-error"/>
            <button className="form__save-button" type="submit">Сохранить</button>
          </form>
        </div>
      </div>
      <div className="popup popup_type_new-card">
        <div className="popup__container">
          <button className="popup__close-button" type="button"/>
          <h2 className="popup__title">Новое место</h2>
          <form className="form form_type_new-card" name="new-card">
            <input className="form__field form__field_type_place-title" id="place-title" name="name" type="text"
                   placeholder="Название" autoComplete="off" minLength="2" maxLength="30" required/>
            <span className="place-title-error form__field-error"/>
            <input className="form__field form__field_type_place-link" id="place-link" name="link" type="url"
                   placeholder="Ссылка на картинку" autoComplete="off" required/>
            <span className="place-link-error form__field-error"/>
            <button className="form__save-button" type="submit">Создать</button>
          </form>
        </div>
      </div>*/}

      <div className="popup popup_type_confirm">
        <div className="popup__container">
          <button className="popup__close-button" type="button"/>
          <h2 className="popup__title">Вы уверены?</h2>
          <button className="popup__confirm-button" type="button">Да</button>
        </div>
      </div>
      <template id="card">
        <article className="card">
          <img className="card__image" src="#" alt=" "/>
          <button className="card__trash-button" type="button"/>
          <div className="card__text">
            <h2 className="card__title"/>
            <div className="card__like-container">
              <button className="card__like-button" type="button"/>
              <span className="card__like-number">0</span>
            </div>
          </div>
        </article>
      </template>
    </>
  );
}

export default App;
