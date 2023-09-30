function ImagePopup({card, onClose}) {

  const handleCloseOnMouseDown = (evt) => {
    if (evt.target.classList.contains('popup_opened')) onClose()
  }

  return (
    <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`} onMouseUp={handleCloseOnMouseDown}>
      <div className="popup__image-container">
        <button className="popup__close-button" type="button" onClick={onClose}/>
        <figure className="popup__image-content">
          <img className="popup__image" src={card?.link} alt={card?.name}/>
          {/*<div className="popup__image" style={{backgroundImage: `url(${card && card.link})`}}/>*/}
          <figcaption className="popup__image-caption">{card?.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup
