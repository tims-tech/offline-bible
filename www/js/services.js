angular.module('starter.services', [])

  .factory('getBible', ['$http', function ($http) {
    // Might use a resource here that returns a JSON array
    var bible = {};
    bible.loaded = false;
    bible.bookName = false;
    /**
     * the books of the Bible are loaded into an array
     */
    function getBookNames() {
      return $http.get("..\\bible\\Books.json")
        .then(function (data) {//if success than do
          bible.books = data.data;
          bible.bookName = true;
          return data.data;
        }, function (reason) {// if fail than do
          // maybe tell the user what happened...
        });
    }

    //C:\ionic\offlineBible\www\bible\kjv\1Chronicles.json
    /**
     * @param book the current book that has been selected by the user
     * @returns {*} an object of the book and all the text of that book
     */
    function getBook(book) {

      book = book.replace(/\s/g, '');

      return $http.get("..\\bible\\kjv\\" + book + ".json")
        .then(function (data) {//if success than do
          bible.curBook = data.data;
          bible.loaded = true;
          return data.data;
        }, function (reason) {// if fail than do

          return "failed to load book";
        });
    }

    /**
     * this assumes that the curBook is the right book the user is looking for...
     * @param curChap the chapter number/integer
     * @returns {*} the chapter of the curBook
     */
    function getChapter(curChap) {
      return bible.curBook.chapters[curChap - 1];
    }

    /**
     * @returns {Array.<T>|string|Blob|ArrayBuffer} this is an array with the listing the names of every new testament book
     */
    function newTestament() {
      return getBookNames().then(function (books) {
        return books.slice(39, books.size);
      });
    }

    /**
     * @returns {Array.<T>|string|Blob|ArrayBuffer} this is an array with the listing the names of every old testament book
     */
    function oldTestament() {
      return getBookNames().then(function (books) {
        return books.slice(0, 39);
      });
    }

    function Bible() {
      return bible;
    }

    return {
      "getBook": getBook,
      "Bible": Bible,
      newTestament: newTestament,
      oldTestament: oldTestament,
      getChapter: getChapter
    }

  }])

.factory('settings', function () {

    var style = {};

    function setStyle(){}
   style =  {
     'background-color':'blue',
     'color':'red',
     'font-size': '200%'

   };

    return true;
  });
