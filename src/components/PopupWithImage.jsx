function PopupWithImage() {
  return (
    <div className="popup popup_type_image">
      <div className="popup__image-container">
        <button className="popup__close-button" type="button"/>
        <figure className="popup__image-content">
          <img className="popup__image" src="#" alt=" "/>
          <figcaption className="popup__image-caption"/>
        </figure>
      </div>
    </div>
  )
}

export default PopupWithImage
