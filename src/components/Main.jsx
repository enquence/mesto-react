import api from '../utils/Api.js'
import defaultAvatar from '../images/noavatar.jpg'
import { useState, useEffect } from 'react'
import Card from './Card';

function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick, onClose}) {

  const [userName, setUserName] = useState('Пользователь')
  const [userDescription, setUserDescription] = useState('Мы потеряли бумажку с вашим описанием')
  const [userAvatar, setUserAvatar] = useState(defaultAvatar)
  const [cards, setCards] = useState([])

  useEffect(() => {

    const mapCards = (cards) => cards.reverse().map(card => {
      return {
        name: card.name,
        link: card.link,
        id: card._id,
        likes: card.likes
      }
    })

    api.getUserInfo()
      .then((user) => {
        setUserName(user.name)
        setUserDescription(user.about)
        setUserAvatar(user.avatar)
      })
      .then(() => api.getAllCards())
      .then((data) => setCards(mapCards(data)))
      .catch((err) => console.log(err))

  }, [])

  useEffect(() => {

    const handleClosePopupsOnEsc = (evt) => {
      if (evt.key === 'Escape') onClose()
    }
    window.addEventListener('keyup', handleClosePopupsOnEsc)

    return () => window.removeEventListener('keyup', handleClosePopupsOnEsc)
  })

  return (
    <main className="page__content">
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__avatar" style={{backgroundImage: `url(${userAvatar})`}}/>
          <button className="profile__avatar-edit" onClick={onEditAvatar}/>
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__user-name">{userName}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}/>
          </div>
          <p className="profile__user-occupation">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}/>
      </section>
      <section className="elements">
        {
          cards.map((card) => <Card key={card.id} card={card} onCardClick={onCardClick} />)
        }
      </section>
    </main>
  )
}

export default Main;
