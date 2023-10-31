import Header from "./Header";
import Main from './Main';
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {useEffect, useRef, useState} from "react";
import {Route, Routes, useNavigate} from 'react-router-dom';
import {CurrentUserContext} from "../contexts/currentUser";
import {api, authApi} from "../utils/Api";
import {normalizeCard} from "../utils/utils";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import Login from "./Login";
import Register from "./Register";
import NotificationPopup from "./NotificationPopup";

function App() {

  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false)
  const [notification, setNotification] = useState({})
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const confirmAction = useRef()
  const navigate = useNavigate()

  const handleClosePopupsOnEsc = (evt) => {
    if (evt.key === 'Escape') closeAllPopups()
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
    window.addEventListener('keyup', handleClosePopupsOnEsc)
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
    window.addEventListener('keyup', handleClosePopupsOnEsc)
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
    window.addEventListener('keyup', handleClosePopupsOnEsc)
  }

  const showNotificationPopup = ({type, text}) => {
    setNotification({type, text})
    setIsNotificationPopupOpen(true)
    window.addEventListener('keyup', handleClosePopupsOnEsc)
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsConfirmPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsNotificationPopupOpen(false)
    setSelectedCard(null)
    window.removeEventListener('keyup', handleClosePopupsOnEsc)
  }

  const handleCardLike = (card, isLikedByUser) => {
    api.likeCard(card.id, isLikedByUser)
      .then(responseCard => setCards(cards.map(el => el.id === responseCard._id ? normalizeCard(responseCard) : el)))
      .catch((err) => console.log(err))
  }

  const handleCardDelete = (cardId) => {
    setIsConfirmPopupOpen(true)
    window.addEventListener('keyup', handleClosePopupsOnEsc)
    confirmAction.current = () => {
      setIsLoading(true)
      api.deleteCard(cardId)
        .then(() => {
          setCards(cards.filter(card => card.id !== cardId))
          closeAllPopups()
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    }
  }

  const handleSignIn = (data) => {
    setIsLoading(true)
    authApi.signIn(data)
      .then((res) => {
        if (res.ok) return res.json()
        else {
          showNotificationPopup({type: 'cross', text: 'Что-то пошло не так! Попробуйте еще раз.'})
          throw new Error('Ошибка при авторизации пользователя')
        }
      })
      .then((data) => {
        if (data.token) {
          setLoggedIn(true)
          localStorage.setItem('token', data.token);
          navigate('/mesto-react', {replace: true})
          return data;
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }

  const handleSignUp = (data) => {
    setIsLoading(true);
    authApi.signUp(data)
      .then((res) => {
        if (res.ok) {
          showNotificationPopup({type: 'ok', text: 'Вы успешно зарегистрировались!'})
          navigate('/mesto-react/sign-in', {replace: true})
          return res
        } else {
          showNotificationPopup({type: 'cross', text: 'Что-то пошло не так! Попробуйте еще раз.'})
          throw new Error('Ошибка при регистрации пользователя')
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        let userEmail = '';
        authApi.checkToken(token)
          .then((res) => {
            setLoggedIn(res.ok)
            if (res.ok) return res.json()
            throw new Error('Ошибка при проверке токена в локальном хранилище')
          })
          .then(res => userEmail = res.data.email)
          .then(() => api.getUserInfo())
          .then((user) => {
            console.log(currentUser)
            console.log(user)
            setCurrentUser({...currentUser, ...user, email: userEmail})
          })
          .then(() => api.getAllCards())
          .then((data) => setCards(data.map(card => normalizeCard(card))))
          .catch((err) => console.log(err))
      }
    }
    ,
    []
  )

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header/>
      <Routes>
        <Route path='/mesto-react' element={
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={(card) => {
              setSelectedCard(card)
              window.addEventListener('keyup', handleClosePopupsOnEsc)
            }}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onClose={closeAllPopups}
          />
        }/>
        <Route path='/mesto-react/sign-in' element={<Login isLoading={isLoading} onSubmit={handleSignIn}/>}/>
        <Route path='/mesto-react/sign-up' element={<Register isLoading={isLoading} onSubmit={handleSignUp}/>}/>
      </Routes>
      <EditProfilePopup isOpen={isEditProfilePopupOpen}
                        isLoading={isLoading}
                        onClose={closeAllPopups}
                        onUpdateUser={({name, about}) => {
                          setIsLoading(true)
                          api.updateUserInfo({name, about})
                            .then((user) => {
                              setCurrentUser({...currentUser, ...user})
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
                             setCurrentUser({...currentUser, ...user})
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
        onConfirm={() => confirmAction.current()}
        onClose={closeAllPopups}
      />
      <NotificationPopup
        isOpen={isNotificationPopupOpen}
        notification={notification}
        text="Вы успешно зарегистрировались!"
        type="ok"
        onClose={closeAllPopups}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      {loggedIn && <Footer/>}
    </CurrentUserContext.Provider>
  )
}

export default App;
