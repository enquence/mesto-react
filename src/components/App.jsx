import Header from "./Header";
import Main from './Main';
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
import { useState } from "react";

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
      <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>
      <PopupWithForm title="Новое место" name="new-card" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
      <PopupWithForm title="Редактировать профиль" name="profile" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}/>
      <PopupWithForm title="Вы уверены?" name="confirm" isOpen={isConfirmPopupOpen} onClose={closeAllPopups}/>
      <PopupWithImage card={selectedCard} onClose={closeAllPopups}/>
      <Footer />
    </>
  );
}

export default App;
