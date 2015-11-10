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

    /*
     Set all defaults here variables here
     */

    var style = {};
    style.size = 16;

    var css = {};

    css.main = {
      'background-color': '#fff',
      'color': 'black',
      'font-size': '16px'
    };

    css.smallText = {'font-size': (style.size - 4) + 'px'};
    css.header = {};
    css.noneTextBG = {};
    css.listItem = {};
    css.button = {};

    /*
     All Action Functions here
     */

    /**
     * Increments text size by one pixel
     * @returns {{}} css abject with the new text size
     */
    function incTextSize() {
      if (style.size < 60) {
        style.size = style.size + 1;
        setTextSize();
      }
      return css;
    }

//in order to have a dash - in a variable name of an object the name must be put obj['var-name']
    /**
     * Decrements text size by one pixel
     * @returns {{}} css abject with the new text size
     */
    function decTextSize() {
      if (style.size > 1) {
        style.size = style.size - 1;
        setTextSize();
      }
      return css;
    }

    /*
     All getter and setter functions here
     */

    function getTextSize() {
      return style.size;
    }

    function getStyle() {
      return css;
    }

    /**
     *  Toggles between day and night them
     * @param styler this is a bool if true than night them will be set else day them
     * @returns {{}} css file with either night them set or day them
     */
    function setStyle(styler) {
      if (styler) {//night time them
        setNight();
      } else {//day light them
        setDay();
      }
      return css;
    }

    function setNight() {
      css.main['background-color'] = '#444';
      css.main['color'] = '#fff';
      css.header['background-color'] = '#2C2C2C';
      css.header['color'] = '#fe9241';
      css.button['background-color'] = '#696969';
      css.button['color'] = '#D2691E';
      css.listItem['background-color'] = '#387ef5';
      css.listItem['color'] = '#FFFFFF';
      css.noneTextBG['background-color'] = '#2F4F4F';
    }

    function setDay() {
      css.main['background-color'] = '!default';
      css.main['color'] = '!default';
      css.header['background-color'] = '!default';
      css.header['color'] = '!default';
      css.button['background-color'] = '!default';
      css.button['color'] = '!default';
      css.listItem['background-color'] = '!default';
      css.listItem['color'] = '!default';
      css.noneTextBG['background-color'] = '!default';
    }

    /**
     * sets text size to what ever current size is -- (style.size)
     */
    function setTextSize() {
      css.header['font-size'] = (style.size + 2) + 'px';
      css.smallText['font-size'] = (style.size - 4) + 'px';
      css.main['font-size'] = style.size + 'px';
      css.listItem['font-size'] = style.size + 'px';
      css.button['font-size'] = style.size + 'px';
    }


    return {
      "incTextSize": incTextSize,
      "decTextSize": decTextSize,
      getTextSize: getTextSize,
      setStyle: setStyle,
      getStyle: getStyle
    }
  });
