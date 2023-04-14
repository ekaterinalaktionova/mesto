class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getMe() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(res => this._resToJson(res));
  }

  updateProfile({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    }).then(res => this._resToJson(res));
  }

  updateProfileAvatar(newAvatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: newAvatarUrl})
    }).then(res => this._resToJson(res));
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(res => this._resToJson(res));
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, link})
    }).then(res => this._resToJson(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this._resToJson(res));
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    }).then(res => this._resToJson(res));
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this._resToJson(res));
  }

  _resToJson = res => {
    if (res.ok) return res.json();
    return Promise.reject(`Response error: ${res.status}`)
  }
}

const apiConfig = {
  authorizationToken: '7f3c1e54-a29a-41ba-a3b1-6a093cb3986f',
  cohortId: 'cohort-63',
}

export const API = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/${apiConfig.cohortId}`,
  headers: {
    authorization: apiConfig.authorizationToken,
    'Content-Type': 'application/json'
  }
});
