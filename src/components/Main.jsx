function Main(props) {
  return (
    <main className="page__content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src="<%=require('../images/avatar.png')%>" alt="Аватар профиля"/>
          <button className="profile__avatar-edit" onClick={props.onEditAvatar}/>
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__user-name">Андрей Огнев</h1>
            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}/>
          </div>
          <p className="profile__user-occupation">Студент Яндекс.Практикум</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}/>
      </section>
      <section className="elements"/>
    </main>
  )
}

export default Main;
