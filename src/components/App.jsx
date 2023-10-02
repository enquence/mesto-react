import Header from "./Header";
import Main from './Main';
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/currentUser";
import api from "../utils/Api";

function App() {

  const [currentUser, setCurrentUser] = useState({})
  const [modifiedUser, setModifiedUser] = useState({})
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)

  const handleEditProfileClick = () => {
    setModifiedUser(currentUser)
    setIsEditProfilePopupOpen(true)
  }

  const handleEditAvatarClick = () => {
    setModifiedUser(currentUser)
    setIsEditAvatarPopupOpen(true)
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsConfirmPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setSelectedCard(null)
  }

  const normalizeCard = (card) => {
    return {
      name: card.name,
      link: card.link,
      id: card._id,
      likes: card.likes
    }
  }

  const handleCardLike = (card, isLikedByUser) => {
    api.likeCard(card.id, isLikedByUser)
      .then(responseCard => setCards(cards.map(el => el.id === responseCard._id ? normalizeCard(responseCard) : el)))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    api.getUserInfo()
      .then((user) => setCurrentUser(user))
      .then(() => api.getAllCards())
      .then((data) => setCards(data.reverse().map(card => normalizeCard(card))))
      .catch((err) => console.log(err))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    const handleClosePopupsOnEsc = (evt) => {
      if (evt.key === 'Escape') closeAllPopups()
    }
    window.addEventListener('keyup', handleClosePopupsOnEsc)
    return () => window.removeEventListener('keyup', handleClosePopupsOnEsc)
  })

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header/>
      <Main
        cards={cards}
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={() => setIsAddPlacePopupOpen(true)}
        onCardClick={(card) => setSelectedCard(card)}
        onCardLike={handleCardLike}
        onCardDelete={(cardId) => setIsConfirmPopupOpen(true)}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        isOpen={isEditAvatarPopupOpen}
        onFormSubmit={() => {
          api.updateAvatar(modifiedUser)
            .then((user) => {
              setCurrentUser(user)
              closeAllPopups()
              setModifiedUser({})
            })
            .catch((err) => console.log(err))
        }}
        onClose={closeAllPopups}
      >
        <input className="form__field form__field_type_avatar" id="avatar" name="avatar" type="url"
               placeholder="Введите ссылку на картинку" autoComplete="off" required value={modifiedUser.avatar}
               onChange={(evt) => setModifiedUser({...modifiedUser, avatar: evt.target.value})}/>
        <span className="avatar-error form__field-error"/>
      </PopupWithForm>
      <PopupWithForm
        title="Новое место"
        name="new-card"
        buttonText='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input className="form__field form__field_type_place-title" id="place-title" name="name" type="text"
               placeholder="Название" autoComplete="off" minLength="2" maxLength="30" required/>
        <span className="place-title-error form__field-error"/>
        <input className="form__field form__field_type_place-link" id="place-link" name="link" type="url"
               placeholder="Ссылка на картинку" autoComplete="off" required/>
        <span className="place-link-error form__field-error"/>
      </PopupWithForm>
      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        isOpen={isEditProfilePopupOpen}
        onFormSubmit={() => {
          api.updateUserInfo(modifiedUser)
            .then((user) => {
              setCurrentUser(user)
              closeAllPopups()
              setModifiedUser({})
            })
            .catch((err) => console.log(err))
        }}
        onClose={closeAllPopups}
      >
        <input className="form__field form__field_type_name" id="user-name" name="name" type="text"
               placeholder="Ваше имя" autoComplete="off" required minLength="2" maxLength="40" value={modifiedUser.name}
               onChange={(evt) => setModifiedUser({...modifiedUser, name: evt.target.value})}/>
        <span className="user-name-error form__field-error"/>
        <input className="form__field form__field_type_occupation" id="user-description" name="about" type="text"
               placeholder="Что вас определяет?" autoComplete="off" required minLength="2" maxLength="200"
               value={modifiedUser.about}
               onChange={(evt) => setModifiedUser({...modifiedUser, about: evt.target.value})}/>
        <span className="user-job-error form__field-error"/>
      </PopupWithForm>
      <PopupWithForm
        title="Вы уверены?"
        name="confirm"
        buttonText='Да'
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      <Footer/>
    </CurrentUserContext.Provider>
  );
}

export default App;
