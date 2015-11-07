angular.module('starter.controllers', [])

  .controller('SalvationCtrl', function ($scope) {
  })

  .controller('BibleCtrl', function ($scope, $state) {
    $scope.bible = ["New Testament", "Old Testament"];

    $scope.changePage = function (choice) {
      $state.go('tab.books', {testament: choice});
    };
  })

  .controller('BibleBooksCtrl', function ($scope, $stateParams, getBible, $state) {
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

  .controller('BibleChaptersCtrl', function ($scope, $stateParams, getBible, $state) {
    $scope.title = $stateParams.book;
    getBible.getBook($stateParams.book).then(function (fullBook) {
      console.log(fullBook);
      $scope.fullBook = fullBook;
    });

    $scope.changePage = function (book, chapter) {
      $state.go('tab.text', {book: book, chapter: chapter});
    };

  })

  .controller('BibleTextCtrl', function ($scope, $stateParams, getBible) {
    $scope.title = $stateParams.book + ' Chapter: ' + $stateParams.chapter;
   $scope.fullChapter = getBible.getChapter($stateParams.chapter);
    console.log('BibleTextCtrl');
    console.log($stateParams);//:book/:chapter
    console.log( $scope.fullChapter);
  })

  .controller('SettingsCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };

    var bool = true;
    $scope.change = function(){

     if(bool){
       bool = false;
       return 'positive';
     } else{
       bool = true;
       return 'dark';
     }
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
