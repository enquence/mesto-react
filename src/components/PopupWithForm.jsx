import React from "react";

function PopupWithForm({name, title, isOpen, onClose}) {

  React.useEffect(() => {
    const popupElement = document.querySelector(`.popup_type_${name}`)
    const handleCloseOnMouseDown = (evt) => {
      if (evt.target.classList.contains('popup_opened')) onClose()
    }

    popupElement.addEventListener('mousedown', handleCloseOnMouseDown)

    return () => popupElement.removeEventListener('mousedown', handleCloseOnMouseDown)
  })

  return (
    <div className={`popup popup_type_${name}${isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}/>
        <h2 className="popup__title">{title}</h2>
      </div>
    </div>
  )
}

export default PopupWithForm;
