function PopupWithForm({name, title, isOpen, onClose, children}) {

  const handleCloseOnMouseDown = (evt) => {
    if (evt.target.classList.contains('popup_opened')) onClose()
  }

  return (
    <div className={`popup${isOpen ? ' popup_opened' : ''}`} onMouseUp={handleCloseOnMouseDown}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}/>
        <h2 className="popup__title">{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default PopupWithForm;
