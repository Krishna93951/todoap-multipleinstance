function View(rootElementId) {
    var _this = this;
    
    this.rootElement = document.querySelector(rootElementId) ;

    this.createContainer = function () {
        var mainContainer = this.createElements('div',{class: 'main' });
        this.appendToMainContainer(mainContainer);
        return mainContainer;
    }

    this.appendToMainContainer = function (mainContainer) {
        mainContainer.append(this.createInputField());
        mainContainer.append(this.createList());
        mainContainer.append(this.createDeleteCompletedButton())
    }

    this.createTitle = function () {
        var app = _this.rootElement;
        var title = this.createElements('p',{id:'header'});
        var titleText = this.customCreateTextNode("My Todo List");
        this.appendTitle(app, title,titleText);
        return app;
    }

    this.appendTitle = function (app, title,titleText) {
        title.append(titleText);
        app.append(title);
        app.append(this.createContainer());
    }

    this.createInputField = function () {
        var actions = this.createElements('div',{class : 'actions'});
        var textField = this.createElements('input',{class: ' inputField', maxlength: '40', placeholder:'Enter yout Todo ....'});
        this.appendInputField(actions, textField);
        return actions;
    }

    this.appendInputField = function (actions, textField) {
        actions.appendChild(textField);
        actions.append(this.createDropdown(), this.createAddButton());
    }

    this.createDropdown = function () {
        var dropdown = this.createElements('select',{class:'storage'});
        var option = {
        option1 : this.createElements('option',{value:'SessionStorage'}),
        option2 : this.createElements('option',{value:'LocalStorage'}),
        option1TextContent :this.customCreateTextNode("SessionStorage"),
        option2TextContent :this.customCreateTextNode("LocalStorage")
        };
        dropdown.addEventListener('change', function (event){
        event=new Event('onstroageSelection', {bubbles:true});
        dropdown.dispatchEvent(event);
        })
        this.appendToDropdown(dropdown,option)
        return dropdown;
    }

    this.appendToDropdown = function (dropdown,option) {
        option.option1.append(option.option1TextContent);
        option.option2.append(option.option2TextContent);
        dropdown.appendChild(option.option1);
        dropdown.appendChild(option.option2);
    }

    this.createList = function () {
        var container = this.createElements('div');
        var list = this.createElements('ul',{class:'todoList'});
        this.appendListToContainer(container, list)
        return container;
    }

    this.appendListToContainer = function (container, list) {
        container.append(list);
    }

    this.createParagraphElement = function () {
        var taskCount = this.createElements('p',{class:'allTasks'});
        this.appendTaskCount(taskCount);
        return taskCount;
    }

    this.appendTaskCount = function (taskCount) {
        this.createTitle().append(taskCount)
    }

    this.createListElements = function (id, input,status) {
        var li = this.createElements('li',{class:'listItem', id: id});
        _this.createCheckbox(li,status);
        _this.createTask(li, input, id);
        _this.createDeleteButton(li);
        _this.appendToList(li);
    };

    this.appendToList = function (createdElements) {
        var list = _this.rootElement.querySelector('.todoList')
        list.appendChild(createdElements);
    };

    this.appendAddButton = function (addButton, addButtonText) {
        addButton.append(addButtonText);
        addButton.addEventListener('click',function (){
            var event = new Event('add');
            _this.rootElement.dispatchEvent(event);
        })
    };

    this.totalMsg = function (checkedCount, pending,taskData) {
        var totalTodos = _this.rootElement.querySelector('.allTasks');
        var countMessage = {
            all: "All Tasks: ",
            completed: " / Number of Completed Tasks: ",
            pending: " / Number of Pending Tasks: "
        };
        return (totalTodos.innerHTML = countMessage.all + taskData.length + " " + countMessage.completed + checkedCount + " " + countMessage.pending + pending);
    };

    this.displayTasks = function (taskData) {
            var list = _this.rootElement.querySelector('.todoList');
            list.innerHTML = "";
            for (i = 0; i < taskData.length; i++) {
              _this.createListElements(taskData[i].id, taskData[i].name, taskData[i].status);
            }
    };
}


View.prototype = {

    createCheckbox :  function (li, status) {
        var selectionBox = this.createElements('input',{ id:'tick' , type: 'checkbox',class:'tick'});
        selectionBox.checked = status;

        selectionBox.addEventListener('click',function(){
            var event = new Event('checkbox', {bubbles:true});
            selectionBox.dispatchEvent(event);
        })
        li.appendChild(selectionBox);
      
    },

    createTask: function (li, inputField, id) {
        var spanElement = this.createElements('span', { id:id});
        var item = this.customCreateTextNode(inputField);
        spanElement.appendChild(item);
        li.appendChild(spanElement);
    },

    createDeleteButton : function (li) {
            var deleteButton = this.createElements('button', { id:'remove'});
            var deleteButtonText = this.customCreateTextNode("Del");
            deleteButton.appendChild(deleteButtonText);
            deleteButton.addEventListener('click', function(){
                var event = new Event('deleteItem' , {bubbles:true});
                deleteButton.dispatchEvent(event);
            })
            li.appendChild(deleteButton);
        },
    
    createAddButton: function () {
        var addButton = this.createElements('button', { id:'addBtn'});
        var addButtonText = this.customCreateTextNode("Add");
        this.appendAddButton(addButton, addButtonText);
        return addButton;
    },

    emptyList: function () {
        this.createList();
        this.emptyListMessage();
    },

    emptyListMessage: function () {
        var totalTodos = this.createParagraphElement();
        var countMessage = {
            all: "All Tasks: ",
            completed: " / Number of Completed Tasks: ",
            pending: " / Number of Pending Tasks: "
        };
        return (totalTodos.innerText = countMessage.all + "0" + " " + countMessage.completed + "0" + " " + countMessage.pending + "0");
    },

    createDeleteCompletedButton: function () {
        var deleteCompleted = this.createElements('button',{id:'delBtn'});
        var deleteText = this.customCreateTextNode("Delete Completed");
        deleteCompleted.appendChild(deleteText);
        deleteCompleted.addEventListener('click', function (){
            var event = new Event('deleteCompleted',{bubbles:true});
            deleteCompleted.dispatchEvent(event);
        })
        return deleteCompleted;
    },

    createElements: function (elemnt, attribute) {
        var element = document.createElement(elemnt, attribute);
        for (var i in attribute) {
            element.setAttribute(i,attribute[i]);
        }
        return element
    },

    customCreateTextNode : function (ele){
        return document.createTextNode(ele);
    },

    clearAndFocusTextField: function () {
        var todo = this.rootElement.querySelector('.inputField');
        todo.value = "";
        todo.focus();
    }

}
