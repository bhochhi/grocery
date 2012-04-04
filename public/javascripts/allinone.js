/**
 * Created by JetBrains RubyMine.
 * User: RBhochhibhoya
 * Date: 4/3/12
 * Time: 4:23 PM
 * To change this template use File | Settings | File Templates.
 */

$(function () {

    window.Controller = Backbone.Router.extend({
        routes:{
            "":"index",
            "/hide":"hide"
        },
        index:function () {
            alert("ddddddddddddHello world");
        },
        hide:function () {
            alert("Hello world");
            $('#name-list').hide();
        }
    });
    window.router = new Controller();
    Backbone.history.start();
    //model
    window.Employee = Backbone.Model.extend({

    });
    //collection
    window.EmployeeList = Backbone.Collection.extend({
        model:Employee,
        url:'/employees'
    });
    window.employees = new EmployeeList();

    //mainView
    window.MainView = Backbone.View.extend({
        el:$('body'),
        initialize:function () {
            this.input = $("#add-employee");
            employees.bind('add', this.addEmployee, this);
            employees.bind('all', this.render, this);
            employees.bind('reset', this.addEmployees, this);
            employees.fetch();
        },
        events:{
            "click #submit-employee":"createEmployee"
        },
        createEmployee:function () {
            employees.create({name:this.input.val()});
            this.input.val('');
        },
        addEmployee:function (employee) {
            var eView = new EmployeeView({model:employee});
            this.$('.name-list').append(eView.render().el);
            // this.$('.name-list').append("<li>" + $("#add-employee").val() + "<span id='delete-employee'><a href='#'>[X]</a></span></li>");
        },
        render:function () {
//            alert("Starting App");
        },
        addEmployees:function () {
            employees.each(this.addEmployee);
        }
//        ,
//        removeEmployee:function () {
//            $(event.target).parent().parent().remove();
//        }
    });
    var mainApp = new MainView();


    window.EmployeeView = Backbone.View.extend({
        tagName:'li',
        initialize:function () {
            this.model.bind('destroy', this.remove, this);
        },
        render:function () {
            $(this.el).html(this.model.get("name") + "<span id='delete-employee'><a href='#'>[X]</a></span>");
            return this;
        },
        events:{
            "click #delete-employee a":"clear"
        },
        clear:function () {
            this.model.destroy();
        },
        remove:function () {
            $(this.el).remove();
        }
    });
});