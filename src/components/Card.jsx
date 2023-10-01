export default function Card({card, onCardClick, onCardDelete}) {

  const handleCardClick = () => onCardClick(card)

  return (
    <article className="card" key={card.id}>
      <div className="card__image" style={{backgroundImage: `url(${card.link})`}} onClick={handleCardClick}/>
      <button className="card__trash-button" type="button" onClick={onCardDelete}/>
      <div className="card__text">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className="card__like-button" type="button"/>
          <span className="card__like-number">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}
