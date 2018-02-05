import strello from './strello';

/*
* Utility functions
*/

function persistData() {
  try {
    localStorage.setItem('lists', JSON.stringify(strello.getLists()));
    localStorage.setItem('cards', JSON.stringify(strello.getCards()));
  }
  catch (e) {
    console.log(e);
  }
}

function deleteList(id) {
  const listNode = document.getElementById(`list-${id}`);
  strello.deleteList(id);
  document.getElementById('list-container').removeChild(listNode);
  persistData();
}

function deleteCard(listId, cardId) {
  const listNode = document.getElementById(`list-${listId}-card-${cardId}`);
  strello.deleteCard(cardId);
  document.getElementById(`list-${listId}-cards`).removeChild(listNode);
  persistData();
}

function updateCard(cardId, updatedContent) {
  strello.updateCard(cardId, updatedContent);
  persistData();
}

function moveCard(cardId, listId) {
  strello.moveCard(cardId, listId);
  persistData();
}

function renderCard(listId, cardContent, cardId) {
  const card = document.createElement('li');
  card.id = `list-${listId}-card-${cardId}`;
  card.className = 'list-group-item';
  card.innerHTML = cardContent;
  card.dataset.id = cardId;
  card.setAttribute('contenteditable', true);
  card.addEventListener('input', function() {
    if(this.className.indexOf('editing') === -1) {
      this.className += ' editing';      
    }
    updateCard(cardId, this.innerText);
  });
  card.addEventListener('keydown', function(e) {
    if(e.keyCode === 13) {
      this.className = 'list-group-item'; //remove 'editing'
      this.blur();
      e.preventDefault();
    }
  });
  card.setAttribute('draggable', true);
  card.addEventListener('dragstart', ev => {
    ev.dataTransfer.setData('text/plain', ev.target.id);
    // ev.dataTransfer.dropEffect = 'move';
  });
  card.addEventListener('dragend', ev => {
    const currentParent = ev.toElement;
    const currentCardId = currentParent.dataset.id;
    const newListId = currentParent.parentNode.dataset.id;
    moveCard(currentCardId, newListId);
  });

  const deleteCardIcon = document.createElement('a');
  deleteCardIcon.id = listId;
  deleteCardIcon.className = 'close';
  deleteCardIcon.innerHTML = `<span class="oi" data-glyph="x"></span>`;
  deleteCardIcon.onclick = function() {
    deleteCard(listId, cardId);
  };
  card.appendChild(deleteCardIcon);

  const list = document.getElementById(`list-${listId}`);
  list.querySelector('ul.list-group').appendChild(card);
}

function addCard(listId) {  // eslint-disable-line no-unused-vars
  const cardContent = document.getElementById(`add-card-area-${listId}`).value;
  if(cardContent.trim().length > 0) {
    const currentCard = strello.addCard(listId, cardContent);
    renderCard(listId, currentCard.t, currentCard.id);
    document.getElementById(`add-card-area-${listId}`).value = '';
    persistData();
  }
}

function renderList(id, title) {
  const list = document.createElement('div');
  list.id = `list-${id}`;
  list.className = 'card bg-white box-shadow';

  const listHeader = document.createElement('div');
  listHeader.className = 'card-header';
  listHeader.innerText = title;

  const deleteListIcon = document.createElement('a');
  deleteListIcon.id = id;
  deleteListIcon.className = 'close';
  deleteListIcon.innerHTML = `<span class="oi" data-glyph="x"></span>`;
  deleteListIcon.onclick = function() {
    deleteList(id);
  };

  listHeader.appendChild(deleteListIcon);

  const cards = document.createElement('ul');
  cards.id = `list-${id}-cards`;
  cards.className = 'list-group list-group-flush';
  cards.dataset.id = id;
  cards.addEventListener('drop', ev => {
    const data = ev.dataTransfer.getData('text');
    ev.target.parentNode.appendChild(document.getElementById(data));
  });
  cards.addEventListener('dragover', ev => {
    ev.preventDefault();
    // ev.dataTransfer.dropEffect = 'move';
  });
  

  const listFooter = document.createElement('div');
  listFooter.className = 'card-footer text-muted';

  const addCardForm = document.createElement('form');
  addCardForm.onsubmit = function() {
    addCard(id);
    return false;
  };
  addCardForm.innerHTML = `
    <div class="form-group mb-0">
      <textarea class="form-control box-shadow" id="add-card-area-${id}" 
      name="add-card-area-${id} minlength="3" maxlength="100" 
      placeholder="Enter text here" rows="2"></textarea>
      <div class="d-flex justify-content-between align-items-center pt-3">
        <div class="btn-group">
          <button type="submit" class="btn btn-sm btn-outline-primary">
          Add Card</button>
          <button type="button"  
          class="btn btn-sm btn-outline-primary">
            <span class="oi" data-glyph="delete"></span>
          </button>
        </div>
      </div>`;
  listFooter.appendChild(addCardForm);
  listFooter.setAttribute('draggable', false);

  list.appendChild(listHeader);
  list.appendChild(cards);
  list.appendChild(listFooter);

  document.getElementById('list-container').appendChild(list);
}

function populateBoard() {
  try {
    const localLists = JSON.parse(localStorage.getItem('lists'));
    const localCards = JSON.parse(localStorage.getItem('cards'));
    if(localLists) {
      strello.setLists(localLists);
      strello.setCards(localCards);

      strello.getLists().forEach(listItem => {
        renderList(listItem.id, listItem.t);
      });
      strello.getCards().forEach(cardItem => {
        renderCard(cardItem.l, cardItem.t, cardItem.id);
      });
    }
  }
  catch (e) {
    console.log(e);
  }
}

/*
* Event listeners
*/

document.getElementById('add-list-form').onsubmit = function() {
  const listTitle = document.getElementById('add-list-text').value;
  document.getElementById('add-list-text').value = '';
  const currentList = strello.addList(listTitle);
  renderList(currentList.id, currentList.t);
  persistData();
  return false;
};

/*
* Init
*/

populateBoard();
persistData();
