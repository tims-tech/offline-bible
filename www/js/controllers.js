angular.module('starter.controllers', [])

  .controller('SalvationCtrl', function ($scope, settings) {
     $scope.curStyle = settings.getStyle();
    $scope.$on('css:changed', function () {
      $scope.curStyle = settings.getStyle();
    });
  })

  .controller('BibleCtrl', function ($scope, $state, settings) {
    $scope.bible = ["New Testament", "Old Testament"];

    $scope.changePage = function (choice) {
      $state.go('tab.books', {testament: choice});
    };

    $scope.curStyle = settings.getStyle();
    $scope.$on('css:changed', function () {
      $scope.curStyle = settings.getStyle();
    });
  })
  
  .controller('BibleBooksCtrl', function ($scope, $stateParams, getBible, $state, settings) {

    if ($stateParams.testament == "New Testament") {
      $scope.title = "New Testament Books";
      getBible.newTestament().then(function (books) {
        $scope.bible = books;
      });
    } else if ($stateParams.testament == "Old Testament") {
      $scope.title = "Old Testament Books";
      $scope.bible = getBible.oldTestament().then(function (books) {
        $scope.bible = books;
      });
    }else{
        $state.go('tab.chapters', {book: $stateParams.testament});
    }

    $scope.changePage = function (book) {
      $state.go('tab.chapters', {book: book});
    };

    $scope.curStyle = settings.getStyle();
    $scope.$on('css:changed', function () {
      $scope.curStyle = settings.getStyle();
    });
  })

  .controller('BibleChaptersCtrl', function ($scope, $stateParams, getBible, $state, settings) {
    $scope.title = $stateParams.book;
    if (getBible.isBibleLoaded() && getBible.currentBook() == $stateParams.book) {
      $scope.fullBook = getBible.Bible();
    } else{
      getBible.getBook($stateParams.book).then(function (fullBook) {
        $scope.fullBook = fullBook;
      });
    }

    $scope.changePage = function (book, chapter) {
      $state.go('tab.text', {book: book, chapter: chapter});
    };

    $scope.curStyle = settings.getStyle();
    $scope.$on('css:changed', function () {
      $scope.curStyle = settings.getStyle();
    });

  })

  .controller('BibleTextCtrl', function ($window,$location, $scope, $stateParams, getBible, settings) {

    $scope.title = $stateParams.book + ' Chapter: ' + $stateParams.chapter;

    if (!getBible.isBibleLoaded()) {
      console.log($stateParams);
      console.log(getBible.isBibleLoaded());
      getBible.getBook($stateParams.book).then(function (fullBook) {
        $scope.fullChapter = getBible.getChapter($stateParams.chapter);
      });
    }else{
      $scope.fullChapter = getBible.getChapter($stateParams.chapter);
    }

    $scope.goodText = function(text){
      return text;
      //return getBible.cleanString(text);
    };

    $scope.curStyle = settings.getStyle();
    $scope.$on('css:changed', function () {
      $scope.curStyle = settings.getStyle();
    });

  })

  .controller('SettingsCtrl', function ($scope, settings) {

    $scope.nMod = {
      nightMode: false
    };

    $scope.them = 'bar-stable';

    $scope.curStyle = settings.getStyle();

    var sizeer = 16;

    $scope.$watch("nMod.nightMode", function (newValue, oldValue) {
      if ($scope.nMod.nightMode) {
        $scope.them = 'bar-dark';
      } else {
        $scope.them = 'bar-stable';
      }
      $scope.curStyle = settings.setStyle(newValue);
    });

    $scope.plusSize = function () {
      $scope.curStyle = settings.incTextSize();
    };

    $scope.minSize = function () {
      $scope.curStyle = settings.decTextSize();
    };


  });

/*    $scope.$on('$ionicView.enter', function(e) {
 console.log(e);
 console.log('test');
 console.log($stateParams);
 });*/
// console.log(e);

/*$timeout(function () {
 }, 3000);*/

// With the new view caching in Ionic, Controllers are only called
// when they are recreated or on app start, instead of every page change.
// To listen for when this page is active (for example, to refresh data),
// listen for the $ionicView.enter event:
//
//$scope.$on('$ionicView.enter', function(e) {
//});


/*
 $scope.title = "Holy Bible";

 $scope.readText = function (book, chapter) {
 $state.go(bible - text({book: book, chapter: chapter}));
 };

 $scope.testament = function (choice) {
 if (choice == "New Testament" || choice == "Old Testament") {
 $state.go('tab.testament', {testament: choice});
 } else if (choice === "Old Testament") {
 $state.go('tab.testament', {testament: choice});
 } else {
 $state.go('tab.book', {book: choice});
 //$state.go('tab.bible.book',{ book: choice, chapter: chapter });
 }
 };*/
