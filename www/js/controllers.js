angular.module('starter.controllers', [])

  .controller('SalvationCtrl', function ($scope, settings) {
    $scope.$watch(function () {
      return settings.getStyle()
    }, function (newVal, oldVal) {
      if (typeof newVal !== 'undefined') {
        $scope.curStyle = settings.getStyle();
      }
    });
  })

  .controller('BibleCtrl', function ($scope, $state, settings) {
    $scope.bible = ["New Testament", "Old Testament"];

    $scope.changePage = function (choice) {
      $state.go('tab.books', {testament: choice});
    };
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
    }

    $scope.changePage = function (book) {
      $state.go('tab.chapters', {book: book});
    };
  })

  .controller('BibleChaptersCtrl', function ($scope, $stateParams, getBible, $state, settings) {
    $scope.title = $stateParams.book;
    getBible.getBook($stateParams.book).then(function (fullBook) {
      console.log(fullBook);
      $scope.fullBook = fullBook;
    });

    $scope.changePage = function (book, chapter) {
      $state.go('tab.text', {book: book, chapter: chapter});
    };

  })

  .controller('BibleTextCtrl', function ($scope, $stateParams, getBible, settings) {
    $scope.title = $stateParams.book + ' Chapter: ' + $stateParams.chapter;
    $scope.fullChapter = getBible.getChapter($stateParams.chapter);
    console.log('BibleTextCtrl');
    console.log($stateParams);//:book/:chapter
    console.log($scope.fullChapter);
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

    $scope.$watch("nMod.changed", function (newValue, oldValue) {
      console.log($scope.curStyle);
      $scope.curStyle = settings.getStyle(newValue);
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
