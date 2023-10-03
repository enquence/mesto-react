function PopupWithForm({name, title, buttonText, isOpen, isLoading, onClose, onSubmit, children}) {

  return (
    <div className={`popup${isOpen ? ' popup_opened': ''}`} onMouseDown={onClose}>
      <div className="popup__container" onMouseDown={(evt) => evt.stopPropagation()}>
        <button className="popup__close-button" type="button" onClick={onClose}/>
        <h2 className="popup__title">{title}</h2>
        <form className={`form form_type_${name}`} name={name} onSubmit={onSubmit}>
          {children}
          <button className="form__save-button" type="submit">
            { (isOpen && isLoading)
              ? <span className="form__button-spinner"/>
              : buttonText || 'Сохранить'
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
