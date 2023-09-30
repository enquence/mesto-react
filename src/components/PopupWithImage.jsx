import React from "react";

function PopupWithImage({card, onClose}) {

  React.useEffect(() => {
    const popupElement = document.querySelector('.popup_type_image')
    const handleCloseOnMouseDown = (evt) => {
      if (evt.target.classList.contains('popup_opened')) onClose()
    }

    popupElement.addEventListener('mousedown', handleCloseOnMouseDown)

    return () => popupElement.removeEventListener('mousedown', handleCloseOnMouseDown)
  },[onClose])

  return (
    <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <button className="popup__close-button" type="button" onClick={onClose}/>
        <figure className="popup__image-content">
          <img className="popup__image" src={card && card.link} alt={card && card.name}/>
          {/*<div className="popup__image" style={{backgroundImage: `url(${card && card.link})`}}/>*/}
          <figcaption className="popup__image-caption">{card && card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default PopupWithImage
