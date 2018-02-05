/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strello__ = __webpack_require__(/*! ./strello */ 1);\n\n\n/*\n* Utility functions\n*/\n\nfunction persistData() {\n  try {\n    localStorage.setItem('lists', JSON.stringify(__WEBPACK_IMPORTED_MODULE_0__strello__[\"a\" /* default */].getLists()));\n    localStorage.setItem('cards', JSON.stringify(__WEBPACK_IMPORTED_MODULE_0__strello__[\"a\" /* default */].getCards()));\n  } catch (e) {\n    console.log(e);\n  }\n}\n\nfunction deleteList(id) {\n  var listNode = document.getElementById('list-' + id);\n  __WEBPACK_IMPORTED_MODULE_0__strello__[\"a\" /* default */].deleteList(id);\n  document.getElementById('list-container').removeChild(listNode);\n  persistData();\n}\n\nfunction deleteCard(listId, cardId) {\n  var listNode = document.getElementById('list-' + listId + '-card-' + cardId);\n  __WEBPACK_IMPORTED_MODULE_0__strello__[\"a\" /* default */].deleteCard(cardId);\n  document.getElementById('list-' + listId + '-cards').removeChild(listNode);\n  persistData();\n}\n\nfunction updateCard(cardId, updatedContent) {\n  __WEBPACK_IMPORTED_MODULE_0__strello__[\"a\" /* default */].updateCard(cardId, updatedContent);\n  persistData();\n}\n\nfunction moveCard(cardId, listId) {\n  __WEBPACK_IMPORTED_MODULE_0__strello__[\"a\" /* default */].moveCard(cardId, listId);\n  persistData();\n}\n\nfunction renderCard(listId, cardContent, cardId) {\n  var card = document.createElement('li');\n  card.id = 'list-' + listId + '-card-' + cardId;\n  card.className = 'list-group-item';\n  card.innerHTML = cardContent;\n  card.dataset.id = cardId;\n  card.setAttribute('contenteditable', true);\n  card.addEventListener('input', function () {\n    if (this.className.indexOf('editing') === -1) {\n      this.className += ' editing';\n    }\n    updateCard(cardId, this.innerText);\n  });\n  card.addEventListener('keydown', function (e) {\n    if (e.keyCode === 13) {\n      this.className = 'list-group-item'; //remove 'editing'\n      this.blur();\n      e.preventDefault();\n    }\n  });\n  card.setAttribute('draggable', true);\n  card.addEventListener('dragstart', function (ev) {\n    ev.dataTransfer.setData('text/plain', ev.target.id);\n    // ev.dataTransfer.dropEffect = 'move';\n  });\n  card.addEventListener('dragend', function (ev) {\n    var currentParent = ev.toElement;\n    var currentCardId = currentParent.dataset.id;\n    var newListId = currentParent.parentNode.dataset.id;\n    moveCard(currentCardId, newListId);\n  });\n\n  var deleteCardIcon = document.createElement('a');\n  deleteCardIcon.id = listId;\n  deleteCardIcon.className = 'close';\n  deleteCardIcon.innerHTML = '<span class=\"oi\" data-glyph=\"x\"></span>';\n  deleteCardIcon.onclick = function () {\n    deleteCard(listId, cardId);\n  };\n  card.appendChild(deleteCardIcon);\n\n  var list = document.getElementById('list-' + listId);\n  list.querySelector('ul.list-group').appendChild(card);\n}\n\nfunction addCard(listId) {\n  // eslint-disable-line no-unused-vars\n  var cardContent = document.getElementById('add-card-area-' + listId).value;\n  if (cardContent.trim().length > 0) {\n    var currentCard = __WEBPACK_IMPORTED_MODULE_0__strello__[\"a\" /* default */].addCard(listId, cardContent);\n    renderCard(listId, currentCard.t, currentCard.id);\n    document.getElementById('add-card-area-' + listId).value = '';\n    persistData();\n  }\n}\n\nfunction renderList(id, title) {\n  var list = document.createElement('div');\n  list.id = 'list-' + id;\n  list.className = 'card bg-white box-shadow';\n\n  var listHeader = document.createElement('div');\n  listHeader.className = 'card-header';\n  listHeader.innerText = title;\n\n  var deleteListIcon = document.createElement('a');\n  deleteListIcon.id = id;\n  deleteListIcon.className = 'close';\n  deleteListIcon.innerHTML = '<span class=\"oi\" data-glyph=\"x\"></span>';\n  deleteListIcon.onclick = function () {\n    deleteList(id);\n  };\n\n  listHeader.appendChild(deleteListIcon);\n\n  var cards = document.createElement('ul');\n  cards.id = 'list-' + id + '-cards';\n  cards.className = 'list-group list-group-flush';\n  cards.dataset.id = id;\n  cards.addEventListener('drop', function (ev) {\n    var data = ev.dataTransfer.getData('text');\n    ev.target.parentNode.appendChild(document.getElementById(data));\n  });\n  cards.addEventListener('dragover', function (ev) {\n    ev.preventDefault();\n    // ev.dataTransfer.dropEffect = 'move';\n  });\n\n  var listFooter = document.createElement('div');\n  listFooter.className = 'card-footer text-muted';\n\n  var addCardForm = document.createElement('form');\n  addCardForm.onsubmit = function () {\n    addCard(id);\n    return false;\n  };\n  addCardForm.innerHTML = '\\n    <div class=\"form-group mb-0\">\\n      <textarea class=\"form-control box-shadow\" id=\"add-card-area-' + id + '\" \\n      name=\"add-card-area-' + id + ' minlength=\"3\" maxlength=\"100\" \\n      placeholder=\"Enter text here\" rows=\"2\"></textarea>\\n      <div class=\"d-flex justify-content-between align-items-center pt-3\">\\n        <div class=\"btn-group\">\\n          <button type=\"submit\" class=\"btn btn-sm btn-outline-primary\">\\n          Add Card</button>\\n          <button type=\"button\"  \\n          class=\"btn btn-sm btn-outline-primary\">\\n            <span class=\"oi\" data-glyph=\"delete\"></span>\\n          </button>\\n        </div>\\n      </div>';\n  listFooter.appendChild(addCardForm);\n  listFooter.setAttribute('draggable', false);\n\n  list.appendChild(listHeader);\n  list.appendChild(cards);\n  list.appendChild(listFooter);\n\n  document.getElementById('list-container').appendChild(list);\n}\n\nfunction populateBoard() {\n  try {\n    var localLists = JSON.parse(localStorage.getItem('lists'));\n    var localCards = JSON.parse(localStorage.getItem('cards'));\n    if (localLists) {\n      __WEBPACK_IMPORTED_MODULE_0__strello__[\"a\" /* default */].setLists(localLists);\n      __WEBPACK_IMPORTED_MODULE_0__strello__[\"a\" /* default */].setCards(localCards);\n\n      __WEBPACK_IMPORTED_MODULE_0__strello__[\"a\" /* default */].getLists().forEach(function (listItem) {\n        renderList(listItem.id, listItem.t);\n      });\n      __WEBPACK_IMPORTED_MODULE_0__strello__[\"a\" /* default */].getCards().forEach(function (cardItem) {\n        renderCard(cardItem.l, cardItem.t, cardItem.id);\n      });\n    }\n  } catch (e) {\n    console.log(e);\n  }\n}\n\n/*\n* Event listeners\n*/\n\ndocument.getElementById('add-list-form').onsubmit = function () {\n  var listTitle = document.getElementById('add-list-text').value;\n  document.getElementById('add-list-text').value = '';\n  var currentList = __WEBPACK_IMPORTED_MODULE_0__strello__[\"a\" /* default */].addList(listTitle);\n  renderList(currentList.id, currentList.t);\n  persistData();\n  return false;\n};\n\n/*\n* Init\n*/\n\npopulateBoard();\npersistData();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvaW5kZXguanM/MWZkZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3RyZWxsbyBmcm9tICcuL3N0cmVsbG8nO1xuXG4vKlxuKiBVdGlsaXR5IGZ1bmN0aW9uc1xuKi9cblxuZnVuY3Rpb24gcGVyc2lzdERhdGEoKSB7XG4gIHRyeSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpc3RzJywgSlNPTi5zdHJpbmdpZnkoc3RyZWxsby5nZXRMaXN0cygpKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NhcmRzJywgSlNPTi5zdHJpbmdpZnkoc3RyZWxsby5nZXRDYXJkcygpKSk7XG4gIH1cbiAgY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWxldGVMaXN0KGlkKSB7XG4gIGNvbnN0IGxpc3ROb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGxpc3QtJHtpZH1gKTtcbiAgc3RyZWxsby5kZWxldGVMaXN0KGlkKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3QtY29udGFpbmVyJykucmVtb3ZlQ2hpbGQobGlzdE5vZGUpO1xuICBwZXJzaXN0RGF0YSgpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVDYXJkKGxpc3RJZCwgY2FyZElkKSB7XG4gIGNvbnN0IGxpc3ROb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGxpc3QtJHtsaXN0SWR9LWNhcmQtJHtjYXJkSWR9YCk7XG4gIHN0cmVsbG8uZGVsZXRlQ2FyZChjYXJkSWQpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbGlzdC0ke2xpc3RJZH0tY2FyZHNgKS5yZW1vdmVDaGlsZChsaXN0Tm9kZSk7XG4gIHBlcnNpc3REYXRhKCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNhcmQoY2FyZElkLCB1cGRhdGVkQ29udGVudCkge1xuICBzdHJlbGxvLnVwZGF0ZUNhcmQoY2FyZElkLCB1cGRhdGVkQ29udGVudCk7XG4gIHBlcnNpc3REYXRhKCk7XG59XG5cbmZ1bmN0aW9uIG1vdmVDYXJkKGNhcmRJZCwgbGlzdElkKSB7XG4gIHN0cmVsbG8ubW92ZUNhcmQoY2FyZElkLCBsaXN0SWQpO1xuICBwZXJzaXN0RGF0YSgpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJDYXJkKGxpc3RJZCwgY2FyZENvbnRlbnQsIGNhcmRJZCkge1xuICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgY2FyZC5pZCA9IGBsaXN0LSR7bGlzdElkfS1jYXJkLSR7Y2FyZElkfWA7XG4gIGNhcmQuY2xhc3NOYW1lID0gJ2xpc3QtZ3JvdXAtaXRlbSc7XG4gIGNhcmQuaW5uZXJIVE1MID0gY2FyZENvbnRlbnQ7XG4gIGNhcmQuZGF0YXNldC5pZCA9IGNhcmRJZDtcbiAgY2FyZC5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsIHRydWUpO1xuICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5jbGFzc05hbWUuaW5kZXhPZignZWRpdGluZycpID09PSAtMSkge1xuICAgICAgdGhpcy5jbGFzc05hbWUgKz0gJyBlZGl0aW5nJzsgICAgICBcbiAgICB9XG4gICAgdXBkYXRlQ2FyZChjYXJkSWQsIHRoaXMuaW5uZXJUZXh0KTtcbiAgfSk7XG4gIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICBpZihlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICB0aGlzLmNsYXNzTmFtZSA9ICdsaXN0LWdyb3VwLWl0ZW0nOyAvL3JlbW92ZSAnZWRpdGluZydcbiAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG4gIGNhcmQuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCB0cnVlKTtcbiAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBldiA9PiB7XG4gICAgZXYuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCBldi50YXJnZXQuaWQpO1xuICAgIC8vIGV2LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICB9KTtcbiAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgZXYgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRQYXJlbnQgPSBldi50b0VsZW1lbnQ7XG4gICAgY29uc3QgY3VycmVudENhcmRJZCA9IGN1cnJlbnRQYXJlbnQuZGF0YXNldC5pZDtcbiAgICBjb25zdCBuZXdMaXN0SWQgPSBjdXJyZW50UGFyZW50LnBhcmVudE5vZGUuZGF0YXNldC5pZDtcbiAgICBtb3ZlQ2FyZChjdXJyZW50Q2FyZElkLCBuZXdMaXN0SWQpO1xuICB9KTtcblxuICBjb25zdCBkZWxldGVDYXJkSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgZGVsZXRlQ2FyZEljb24uaWQgPSBsaXN0SWQ7XG4gIGRlbGV0ZUNhcmRJY29uLmNsYXNzTmFtZSA9ICdjbG9zZSc7XG4gIGRlbGV0ZUNhcmRJY29uLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cIm9pXCIgZGF0YS1nbHlwaD1cInhcIj48L3NwYW4+YDtcbiAgZGVsZXRlQ2FyZEljb24ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgIGRlbGV0ZUNhcmQobGlzdElkLCBjYXJkSWQpO1xuICB9O1xuICBjYXJkLmFwcGVuZENoaWxkKGRlbGV0ZUNhcmRJY29uKTtcblxuICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGxpc3QtJHtsaXN0SWR9YCk7XG4gIGxpc3QucXVlcnlTZWxlY3RvcigndWwubGlzdC1ncm91cCcpLmFwcGVuZENoaWxkKGNhcmQpO1xufVxuXG5mdW5jdGlvbiBhZGRDYXJkKGxpc3RJZCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICBjb25zdCBjYXJkQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhZGQtY2FyZC1hcmVhLSR7bGlzdElkfWApLnZhbHVlO1xuICBpZihjYXJkQ29udGVudC50cmltKCkubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGN1cnJlbnRDYXJkID0gc3RyZWxsby5hZGRDYXJkKGxpc3RJZCwgY2FyZENvbnRlbnQpO1xuICAgIHJlbmRlckNhcmQobGlzdElkLCBjdXJyZW50Q2FyZC50LCBjdXJyZW50Q2FyZC5pZCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGFkZC1jYXJkLWFyZWEtJHtsaXN0SWR9YCkudmFsdWUgPSAnJztcbiAgICBwZXJzaXN0RGF0YSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlckxpc3QoaWQsIHRpdGxlKSB7XG4gIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbGlzdC5pZCA9IGBsaXN0LSR7aWR9YDtcbiAgbGlzdC5jbGFzc05hbWUgPSAnY2FyZCBiZy13aGl0ZSBib3gtc2hhZG93JztcblxuICBjb25zdCBsaXN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxpc3RIZWFkZXIuY2xhc3NOYW1lID0gJ2NhcmQtaGVhZGVyJztcbiAgbGlzdEhlYWRlci5pbm5lclRleHQgPSB0aXRsZTtcblxuICBjb25zdCBkZWxldGVMaXN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgZGVsZXRlTGlzdEljb24uaWQgPSBpZDtcbiAgZGVsZXRlTGlzdEljb24uY2xhc3NOYW1lID0gJ2Nsb3NlJztcbiAgZGVsZXRlTGlzdEljb24uaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwib2lcIiBkYXRhLWdseXBoPVwieFwiPjwvc3Bhbj5gO1xuICBkZWxldGVMaXN0SWNvbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgZGVsZXRlTGlzdChpZCk7XG4gIH07XG5cbiAgbGlzdEhlYWRlci5hcHBlbmRDaGlsZChkZWxldGVMaXN0SWNvbik7XG5cbiAgY29uc3QgY2FyZHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICBjYXJkcy5pZCA9IGBsaXN0LSR7aWR9LWNhcmRzYDtcbiAgY2FyZHMuY2xhc3NOYW1lID0gJ2xpc3QtZ3JvdXAgbGlzdC1ncm91cC1mbHVzaCc7XG4gIGNhcmRzLmRhdGFzZXQuaWQgPSBpZDtcbiAgY2FyZHMuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGV2ID0+IHtcbiAgICBjb25zdCBkYXRhID0gZXYuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQnKTtcbiAgICBldi50YXJnZXQucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhKSk7XG4gIH0pO1xuICBjYXJkcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGV2ID0+IHtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIGV2LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICB9KTtcbiAgXG5cbiAgY29uc3QgbGlzdEZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBsaXN0Rm9vdGVyLmNsYXNzTmFtZSA9ICdjYXJkLWZvb3RlciB0ZXh0LW11dGVkJztcblxuICBjb25zdCBhZGRDYXJkRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgYWRkQ2FyZEZvcm0ub25zdWJtaXQgPSBmdW5jdGlvbigpIHtcbiAgICBhZGRDYXJkKGlkKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG4gIGFkZENhcmRGb3JtLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0wXCI+XG4gICAgICA8dGV4dGFyZWEgY2xhc3M9XCJmb3JtLWNvbnRyb2wgYm94LXNoYWRvd1wiIGlkPVwiYWRkLWNhcmQtYXJlYS0ke2lkfVwiIFxuICAgICAgbmFtZT1cImFkZC1jYXJkLWFyZWEtJHtpZH0gbWlubGVuZ3RoPVwiM1wiIG1heGxlbmd0aD1cIjEwMFwiIFxuICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB0ZXh0IGhlcmVcIiByb3dzPVwiMlwiPjwvdGV4dGFyZWE+XG4gICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGFsaWduLWl0ZW1zLWNlbnRlciBwdC0zXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tc20gYnRuLW91dGxpbmUtcHJpbWFyeVwiPlxuICAgICAgICAgIEFkZCBDYXJkPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgIFxuICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1wcmltYXJ5XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm9pXCIgZGF0YS1nbHlwaD1cImRlbGV0ZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuICBsaXN0Rm9vdGVyLmFwcGVuZENoaWxkKGFkZENhcmRGb3JtKTtcbiAgbGlzdEZvb3Rlci5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsIGZhbHNlKTtcblxuICBsaXN0LmFwcGVuZENoaWxkKGxpc3RIZWFkZXIpO1xuICBsaXN0LmFwcGVuZENoaWxkKGNhcmRzKTtcbiAgbGlzdC5hcHBlbmRDaGlsZChsaXN0Rm9vdGVyKTtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdC1jb250YWluZXInKS5hcHBlbmRDaGlsZChsaXN0KTtcbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVCb2FyZCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBsb2NhbExpc3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGlzdHMnKSk7XG4gICAgY29uc3QgbG9jYWxDYXJkcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NhcmRzJykpO1xuICAgIGlmKGxvY2FsTGlzdHMpIHtcbiAgICAgIHN0cmVsbG8uc2V0TGlzdHMobG9jYWxMaXN0cyk7XG4gICAgICBzdHJlbGxvLnNldENhcmRzKGxvY2FsQ2FyZHMpO1xuXG4gICAgICBzdHJlbGxvLmdldExpc3RzKCkuZm9yRWFjaChsaXN0SXRlbSA9PiB7XG4gICAgICAgIHJlbmRlckxpc3QobGlzdEl0ZW0uaWQsIGxpc3RJdGVtLnQpO1xuICAgICAgfSk7XG4gICAgICBzdHJlbGxvLmdldENhcmRzKCkuZm9yRWFjaChjYXJkSXRlbSA9PiB7XG4gICAgICAgIHJlbmRlckNhcmQoY2FyZEl0ZW0ubCwgY2FyZEl0ZW0udCwgY2FyZEl0ZW0uaWQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gIH1cbn1cblxuLypcbiogRXZlbnQgbGlzdGVuZXJzXG4qL1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLWxpc3QtZm9ybScpLm9uc3VibWl0ID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGxpc3RUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtbGlzdC10ZXh0JykudmFsdWU7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtbGlzdC10ZXh0JykudmFsdWUgPSAnJztcbiAgY29uc3QgY3VycmVudExpc3QgPSBzdHJlbGxvLmFkZExpc3QobGlzdFRpdGxlKTtcbiAgcmVuZGVyTGlzdChjdXJyZW50TGlzdC5pZCwgY3VycmVudExpc3QudCk7XG4gIHBlcnNpc3REYXRhKCk7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qXG4qIEluaXRcbiovXG5cbnBvcHVsYXRlQm9hcmQoKTtcbnBlcnNpc3REYXRhKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2luZGV4LmpzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/*!************************!*\
  !*** ./src/strello.js ***!
  \************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("function Strello() {\n  this.lists = [];\n  this.cards = [];\n}\n\nStrello.prototype.addList = function (title) {\n  var listLength = this.lists.length;\n  var currentList = {\n    id: listLength,\n    t: title\n  };\n  this.lists.push(currentList);\n  return currentList;\n};\n\nStrello.prototype.setLists = function (listArray) {\n  this.lists = listArray.slice(0);\n};\n\nStrello.prototype.deleteList = function (id) {\n  if (id < this.lists.length) {\n    this.lists.splice(id, 1);\n  }\n  this.cards = this.cards.filter(function (card) {\n    return card.l !== id;\n  });\n};\n\nStrello.prototype.getLists = function () {\n  return this.lists;\n};\n\nStrello.prototype.printLists = function () {\n  console.log(\"Lists: \" + JSON.stringify(this.lists));\n  console.log(\"Cards: \" + JSON.stringify(this.cards));\n};\n\nStrello.prototype.addCard = function (listId, title) {\n  var cardLength = this.cards.length;\n  var currentCard = {\n    id: cardLength,\n    l: listId,\n    t: title\n  };\n  this.cards.push(currentCard);\n  return currentCard;\n};\n\nStrello.prototype.getCards = function () {\n  return this.cards;\n};\n\nStrello.prototype.setCards = function (cardsArray) {\n  this.cards = cardsArray.slice(0);\n};\n\nStrello.prototype.updateCard = function (cardId, cardContent) {\n  this.cards[cardId].t = cardContent;\n};\n\nStrello.prototype.moveCard = function (cardId, listId) {\n  this.cards[cardId].l = listId;\n};\n\nStrello.prototype.deleteCard = function (id) {\n  if (id < this.cards.length) {\n    this.cards.splice(id, 1);\n  }\n};\n\nvar strello = new Strello();\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (strello);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvc3RyZWxsby5qcz8zNzU5Il0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIFN0cmVsbG8oKSB7XG4gIHRoaXMubGlzdHMgPSBbXTtcbiAgdGhpcy5jYXJkcyA9IFtdO1xufVxuXG5TdHJlbGxvLnByb3RvdHlwZS5hZGRMaXN0ID0gZnVuY3Rpb24odGl0bGUpIHtcbiAgY29uc3QgbGlzdExlbmd0aCA9IHRoaXMubGlzdHMubGVuZ3RoO1xuICBjb25zdCBjdXJyZW50TGlzdCA9IHtcbiAgICBpZDogbGlzdExlbmd0aCxcbiAgICB0OiB0aXRsZSxcbiAgfTtcbiAgdGhpcy5saXN0cy5wdXNoKGN1cnJlbnRMaXN0KTtcbiAgcmV0dXJuIGN1cnJlbnRMaXN0O1xufTtcblxuU3RyZWxsby5wcm90b3R5cGUuc2V0TGlzdHMgPSBmdW5jdGlvbihsaXN0QXJyYXkpIHtcbiAgdGhpcy5saXN0cyA9IGxpc3RBcnJheS5zbGljZSgwKTtcbn07XG5cblN0cmVsbG8ucHJvdG90eXBlLmRlbGV0ZUxpc3QgPSBmdW5jdGlvbihpZCkge1xuICBpZiAoaWQgPCB0aGlzLmxpc3RzLmxlbmd0aCkge1xuICAgIHRoaXMubGlzdHMuc3BsaWNlKGlkLCAxKTtcbiAgfVxuICB0aGlzLmNhcmRzID0gdGhpcy5jYXJkcy5maWx0ZXIoY2FyZCA9PiBjYXJkLmwgIT09IGlkKTtcbn07XG5cblN0cmVsbG8ucHJvdG90eXBlLmdldExpc3RzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmxpc3RzO1xufTtcblxuU3RyZWxsby5wcm90b3R5cGUucHJpbnRMaXN0cyA9IGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZyhgTGlzdHM6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5saXN0cyl9YCk7XG4gIGNvbnNvbGUubG9nKGBDYXJkczogJHtKU09OLnN0cmluZ2lmeSh0aGlzLmNhcmRzKX1gKTtcbn07XG5cblN0cmVsbG8ucHJvdG90eXBlLmFkZENhcmQgPSBmdW5jdGlvbihsaXN0SWQsIHRpdGxlKSB7XG4gIGNvbnN0IGNhcmRMZW5ndGggPSB0aGlzLmNhcmRzLmxlbmd0aDtcbiAgY29uc3QgY3VycmVudENhcmQgPSB7XG4gICAgaWQ6IGNhcmRMZW5ndGgsXG4gICAgbDogbGlzdElkLFxuICAgIHQ6IHRpdGxlLFxuICB9XG4gIHRoaXMuY2FyZHMucHVzaChjdXJyZW50Q2FyZCk7XG4gIHJldHVybiBjdXJyZW50Q2FyZDtcbn07XG5cblN0cmVsbG8ucHJvdG90eXBlLmdldENhcmRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNhcmRzO1xufTtcblxuU3RyZWxsby5wcm90b3R5cGUuc2V0Q2FyZHMgPSBmdW5jdGlvbihjYXJkc0FycmF5KSB7XG4gIHRoaXMuY2FyZHMgPSBjYXJkc0FycmF5LnNsaWNlKDApO1xufTtcblxuU3RyZWxsby5wcm90b3R5cGUudXBkYXRlQ2FyZCA9IGZ1bmN0aW9uKGNhcmRJZCwgY2FyZENvbnRlbnQpIHtcbiAgdGhpcy5jYXJkc1tjYXJkSWRdLnQgPSBjYXJkQ29udGVudDtcbn07XG5cblN0cmVsbG8ucHJvdG90eXBlLm1vdmVDYXJkID0gZnVuY3Rpb24oY2FyZElkLCBsaXN0SWQpIHtcbiAgdGhpcy5jYXJkc1tjYXJkSWRdLmwgPSBsaXN0SWQ7XG59O1xuXG5TdHJlbGxvLnByb3RvdHlwZS5kZWxldGVDYXJkID0gZnVuY3Rpb24oaWQpIHtcbiAgaWYgKGlkIDwgdGhpcy5jYXJkcy5sZW5ndGgpIHtcbiAgICB0aGlzLmNhcmRzLnNwbGljZShpZCwgMSk7XG4gIH1cbn07XG5cbmNvbnN0IHN0cmVsbG8gPSBuZXcgU3RyZWxsbygpO1xuXG5leHBvcnQgZGVmYXVsdCBzdHJlbGxvO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9zdHJlbGxvLmpzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///1\n");

/***/ })
/******/ ]);