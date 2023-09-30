class Api {
  constructor({ url, headers}) {
    this._url = url
    this._headers = headers
  }

  _sendRequest(url, options) {
    return fetch(url, options)
      .then((resp) => {
        if (resp.ok) return resp.json()
        throw new Error(`Ошибка: ${resp.statusText}`)
      })
  }

  getAllCards() {
    return this._sendRequest(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
  }

  addCard({ name, link }) {
    return this._sendRequest(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  likeCard(cardId, isLiked) {
    return this._sendRequest(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers
    })
  }

  deleteCard(cardId) {
    return this._sendRequest(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  getUserInfo() {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
  }

  updateUserInfo({ name, about }) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  updateAvatar({ avatar }) {
    return this._sendRequest(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
  }

}

const optionsApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-75',
  headers: {
    authorization: 'd6407735-ae7a-4c39-ac77-589083b716b5',
    'Content-Type': 'application/json'
  }
}

const api = new Api(optionsApi)

export default api
