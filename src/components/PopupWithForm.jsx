import React from "react";

function PopupWithForm(props) {

  React.useEffect(() => {
    const popupElement = document.querySelector(`.popup_type_${props.name}`)
    const handleCloseOnMouseDown = (evt) => {
      if (evt.target.classList.contains('popup_opened')) props.onClose()
    }
    const handleCloseOnEsc = (evt) => {
      if (evt.key === 'Escape') props.onClose()
    }
    popupElement.addEventListener('mousedown', handleCloseOnMouseDown)
    window.addEventListener('keyup', handleCloseOnEsc)

    return () => {
      popupElement.removeEventListener('mousedown', handleCloseOnMouseDown)
      window.removeEventListener('keyup', handleCloseOnEsc)
    }
  })

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={props.onClose}/>
        <h2 className="popup__title">{props.title}</h2>
      </div>
    </div>
  )
}

export default PopupWithForm;
