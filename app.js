  (function () {
  'use strict';
  /**
   * Arrays used in lists
   */

  var m = [{name: "Cookie", quantity: "10"},{name: "Tea", quantity: "1"},{name: "Ramen", quantity: "12"},{name: "Apples", quantity: "20"},{name: "Fried Fish", quantity: "8"}];
  var m2 = [];
  /**
   * Initial configuration and declare of module, provider and controllers
   * Created by Sergio Albarran
   * Last modified: November 3 2016
   */

  angular.module('ShoppingListApp', [])
  .controller('ShoppingListController1',ShoppingListController1)
  .provider('ShoppingListService', ShoppingListServiceProvider)
  .controller('ShoppingListController2', ShoppingListController2);ter

  /**
   * Controller 1: Controller for the first list
   * Created by Sergio Albarran
   * Last modified: November 3 2016
   */
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

/**
 * Controller 2: Controller for the second list
 * Created by Sergio Albarran
 * Last modified: November 3 2016
 */
ShoppingListController2.$inject = ['ShoppingListService'];
function ShoppingListController2(ShoppingListService) {
  var list2 = this;
  list2.shoppingList2 = m2;
  list2.getItemsBought = function(){
    return ShoppingListService.getItemsBought();
  }

}

/**
 * Service for the removing and moving items in lists
 * Returns also how many items we have in both lists
 * Created by Sergio Albarran
 * Last modified: November 3 2016
 */
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

  /**
   * Provider
   * Created by Sergio Albarran
   * Last modified: November 3 2016
   */

  provider.$get = function () {
    var shoppingList = new ShoppingListService(provider.defaults.maxItems);

    return shoppingList;
  };
}

  })();
