function Strello() {
  this.lists = [];
  this.cards = [];
}

Strello.prototype.addList = function(title) {
  const listLength = this.lists.length;
  const currentList = {
    id: listLength,
    t: title,
  };
  this.lists.push(currentList);
  return currentList;
};

Strello.prototype.setLists = function(listArray) {
  this.lists = listArray.slice(0);
};

Strello.prototype.deleteList = function(id) {
  if (this.lists[id]) {
    this.lists.splice(id, 1);
  }
  this.cards = this.cards.filter(card => card.l !== id);
};

Strello.prototype.getLists = function() {
  return this.lists;
};

Strello.prototype.printLists = function() {
  console.log(`Lists: ${JSON.stringify(this.lists)}`);
  console.log(`Cards: ${JSON.stringify(this.cards)}`);
};

Strello.prototype.addCard = function(listId, title) {
  const cardLength = this.cards.length;
  const currentCard = {
    id: cardLength,
    l: listId,
    t: title,
  }
  this.cards.push(currentCard);
  return currentCard;
};

Strello.prototype.getCards = function() {
  return this.cards;
};

Strello.prototype.setCards = function(cardsArray) {
  this.cards = cardsArray.slice(0);
};

Strello.prototype.updateCard = function(cardId, cardContent) {
  this.cards[cardId].t = cardContent;
};

Strello.prototype.moveCard = function(cardId, listId) {
  this.cards[cardId].l = listId;
};

Strello.prototype.deleteCard = function(id) {
  if (this.cards[id]) {
    this.cards.splice(id, 1);
  }
};

const strello = new Strello();

export default strello;
