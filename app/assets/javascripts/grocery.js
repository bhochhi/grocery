/**
 * Created by JetBrains RubyMine.
 * User: RBhochhibhoya
 * Date: 4/2/12
 * Time: 9:19 PM
 * To change this template use File | Settings | File Templates.
 */


$(function () {
    //Model
    window.Grocery = Backbone.Model.extend({

    });

    //Collection
    window.GroceryList = Backbone.Collection.extend({
        model:Grocery,
        url:'/groceries'
    });
    window.Groceries = new GroceryList;

    window.GroceryView = Backbone.View.extend({
        el:$("#grocery-app"),
        events:{
            "click .add-item":"addOneItem",
            "click .check-item":"togglePurchased",
            "click .destory-item a":"deleteItem"
        },
        addOneItem:function () {
            if ($(".new-item").val()) {
                Groceries.create(
                    {
                       name:$(".new-item").val,
                       purchased:false
                    });
                $(".grocery-list").append("<li><input class='check-item' type='checkbox'><div class='each-item'>" + $(".new-item").val() + "</div><div class='destory-item'><a href='#'>[X]</a></div></li>");
            }
            else
                alert("Enter an item first");
        },
        deleteItem:function () {

                   alert("Your item will be deleted");
        },
        togglePurchased:function () {
            alert("Got it");
        }


    });
    window.App = new GroceryView;
});

