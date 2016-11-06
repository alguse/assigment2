  (function () {
  'use strict';
  var m = [{name: "Cookie", quantity: "10"},{name: "Tea", quantity: "1"},{name: "Ramen", quantity: "12"},{name: "Apples", quantity: "20"},{name: "Fried Fish", quantity: "8"}];
  var m2 = [];
  angular.module('ShoppingListApp', [])
  .controller('ShoppingListController1',ShoppingListController1)
  .provider('ShoppingListService', ShoppingListServiceProvider)
  .controller('ShoppingListController2', ShoppingListController2);


// LIST #1 - controller
ShoppingListController1.$inject = ['ShoppingListService'];
function ShoppingListController1(ShoppingListService) {
  var list = this;
  list.shoppingList1 = m;
  list.removeItem = function (itemIndex, item){
      ShoppingListService.removeItem(itemIndex);
      ShoppingListService.boughtItem(item);
  };

  list.getItemstoBuy = function(){
    return ShoppingListService.getItemstoBuy();
  }
}
// LIST #2 - controller
ShoppingListController2.$inject = ['ShoppingListService'];
function ShoppingListController2(ShoppingListService) {
  var list2 = this;
  list2.shoppingList2 = m2;
  list2.getItemsBought = function(){
    return ShoppingListService.getItemsBought();
  }

}

// If not specified, maxItems assumed unlimited
function ShoppingListService() {
  var service = this;

  service.addItem = function (item) {
    m.push(item);
  };

    service.boughtItem = function (item) {
      m2.push(item);
    };

  service.removeItem = function (itemIndex) {
    m.splice(itemIndex, 1);
  };

  service.getItemstoBuy = function () {
    console.log(m.length);
    return m.length;
  };

  service.getItemsBought = function () {
    return m2.length;
  };
}

function ShoppingListServiceProvider() {
  var provider = this;

  provider.defaults = {
    maxItems: 10
  };

  provider.$get = function () {
    var shoppingList = new ShoppingListService(provider.defaults.maxItems);

    return shoppingList;
  };
}

  })();
