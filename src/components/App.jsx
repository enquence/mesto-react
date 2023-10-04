import Header from "./Header";
import Main from './Main';
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import React, {useEffect, useRef, useState} from "react";
import {CurrentUserContext} from "../contexts/currentUser";
import api from "../utils/Api";
import {normalizeCard} from "../utils/utils";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";

function App() {

  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const confirmAction = useRef()

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true)
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true)
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true)

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsConfirmPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setSelectedCard(null)
  }

  const handleCardLike = (card, isLikedByUser) => {
    api.likeCard(card.id, isLikedByUser)
      .then(responseCard => setCards(cards.map(el => el.id === responseCard._id ? normalizeCard(responseCard) : el)))
      .catch((err) => console.log(err))
  }

  const handleCardDelete = (cardId) => {
    setIsConfirmPopupOpen(true)
    confirmAction.current = () => {
      setIsLoading(true)
      api.deleteCard(cardId)
        .then(() => setCards(cards.filter(card => card.id !== cardId)))
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    }
  }

  useEffect(() => {
    api.getUserInfo()
      .then((user) => setCurrentUser(user))
      .then(() => api.getAllCards())
      .then((data) => setCards(data.map(card => normalizeCard(card))))
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
        onAddPlace={handleAddPlaceClick}
        onCardClick={(card) => setSelectedCard(card)}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        onClose={closeAllPopups}
      />
      <EditProfilePopup isOpen={isEditProfilePopupOpen}
                        isLoading={isLoading}
                        onClose={closeAllPopups}
                        onUpdateUser={({name, about}) => {
                          setIsLoading(true)
                          api.updateUserInfo({name, about})
                            .then((user) => {
                              setCurrentUser(user)
                              closeAllPopups()
                            })
                            .catch((err) => console.log(err))
                            .finally(() => setIsLoading(false))
                        }}
      />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                       isLoading={isLoading}
                       onClose={closeAllPopups}
                       onUpdateAvatar={({avatar}) => {
                         setIsLoading(true)
                         api.updateAvatar({avatar})
                           .then((user) => {
                             setCurrentUser(user)
                             closeAllPopups()
                           })
                           .catch((err) => console.log(err))
                           .finally(() => setIsLoading(false))
                       }}
      />
      <AddPlacePopup isOpen={isAddPlacePopupOpen}
                     isLoading={isLoading}
                     onClose={closeAllPopups}
                     onAddCard={(newCard) => {
                       setIsLoading(true)
                       api.addCard(newCard)
                         .then((card) => {
                           setCards([normalizeCard(card)].concat(cards))
                           closeAllPopups()
                         })
                         .catch((err) => console.log(err))
                         .finally(() => setIsLoading(false))
                     }}
      />
      <ConfirmPopup
        isOpen={isConfirmPopupOpen}
        isLoading={isLoading}
        onConfirm={() => {
          confirmAction.current()
          closeAllPopups()
        }}
        onClose={closeAllPopups}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      <Footer/>
    </CurrentUserContext.Provider>
  )
}

export default App;
