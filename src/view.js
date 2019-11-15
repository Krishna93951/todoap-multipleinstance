function View(rootElementId, defaultStorage) {
    var _this = this;
    this.countMessage = {
        all: "All Tasks: ",
        completed: " / Number of Completed Tasks: ",
        pending: " / Number of Pending Tasks: "
    };
    this.defaultStorage = defaultStorage;

    this.rootElement = document.querySelector(rootElementId);

    this.mainContainer = this.createElements('div', { class: 'main' });
    this.app = _this.rootElement;
    this.title = this.createElements('p', { id: 'header' });
    this.titleText = this.customCreateTextNode("My Todo List");
    this.title.append(this.titleText);
    this.taskCount = this.createElements('p', { class: 'allTasks' });
    this.app.append(this.title, this.mainContainer, this.taskCount);
    this.actions = this.createElements('div', { class: 'actions' });
    this.textField = this.createElements('input', { class: ' inputField', maxlength: '40', placeholder: 'Enter yout Todo ....' });
    this.dropdown = this.createElements('select', { class: 'storage' });
    this.options = ['LocalStorage', 'SessionStorage'];
    for (var i = 0; i < this.options.length; i++) {
        this.option = this.createElements('option', { value: this.options[i] })
        this.optionText = this.customCreateTextNode(this.options[i])
        this.option.append(this.optionText)
        this.dropdown.appendChild(this.option);
    }
    var dropdownEvent = new CustomEvent('onStroageSelection', { detail: { value: this.dropdown } });
    this.dropdown.addEventListener('change', function () {
        _this.rootElement.dispatchEvent(dropdownEvent);
    })
    this.addButton = this.createElements('button', { id: 'addBtn' });
    this.addButtonText = this.customCreateTextNode("Add");
    this.addButton.append(this.addButtonText);
    var addButtonEvent = new Event('onAdd');
    this.addButton.addEventListener('click', function () {
        _this.rootElement.dispatchEvent(addButtonEvent);
    })
    this.actions.append(this.textField, this.dropdown, this.addButton);
    this.todoListWrapper = this.createElements('div', { class: 'todoListContainer' });
    this.todoList = this.createElements('ul', { class: 'todoList' });
    this.todoListWrapper.append(this.todoList);
    this.deleteCompletedTasks = this.createElements('button', { id: 'delBtn' });
    this.deleteCompletedTasks.innerText = "Delete Completed";
    var deleteCompletedTaskEvent = new Event('deleteCompleted');
    this.deleteCompletedTasks.addEventListener('click', function () {
        _this.rootElement.dispatchEvent(deleteCompletedTaskEvent);
    })
    this.mainContainer.append(this.actions, this.todoListWrapper, this.deleteCompletedTasks);
}


View.prototype = {

    createListElements: function (id, input, status) {
        var li = this.createElements('li', { class: 'listItem', id: id });
        this.createCheckbox(li, status);
        this.createTask(li, input, id);
        this.createDeleteButton(li);
        this.todoList.append(li);
    },

    createCheckbox: function (li, status) {
        var selectionBox = this.createElements('input', { id: 'tick', type: 'checkbox', class: 'tick' });
        var myEvent = new CustomEvent('onCheckbox', { detail: { id: li.id } });
        selectionBox.checked = status;
        selectionBox.addEventListener('change', function () {
            this.rootElement.dispatchEvent(myEvent);
        }.bind(this))
        li.append(selectionBox);

    },

    createTask: function (li, inputField, id) {
        var spanElement = this.createElements('span', { id: id });
        var item = this.customCreateTextNode(inputField);
        spanElement.appendChild(item);
        li.append(spanElement);
    },

    createDeleteButton: function (li) {
        var _this = this;
        var deleteButton = this.createElements('button', { id: 'remove' });
        var deleteButtonText = this.customCreateTextNode("Del");
        var event = new CustomEvent('deleteItem', { detail: { id: li.id, name: li } });
        deleteButton.appendChild(deleteButtonText);
        deleteButton.addEventListener('click', function () {
            _this.rootElement.dispatchEvent(event);
        })
        li.append(deleteButton);
    },

    createElements: function (elemnt, attribute) {
        var element = document.createElement(elemnt, attribute);
        for (var i in attribute) {
            element.setAttribute(i, attribute[i]);
        }
        return element
    },

    customCreateTextNode: function (ele) {
        return document.createTextNode(ele);
    },

    clearAndFocusTextField: function () {
        var todo = this.textField;
        todo.value = "";
        todo.focus();
    },

    totalTaskCount: function (checkedCount, pending, taskData) {
        return this.taskCount.innerText = this.countMessage.all + taskData.length + " " + this.countMessage.completed + checkedCount + " " + this.countMessage.pending + pending;
    },

    displayTasks: function (taskData) {
        this.todoList.innerText = '';
        for (i = 0; i < taskData.length; i++) {
            this.createListElements(taskData[i].id, taskData[i].name, taskData[i].status);
        }
    },

    getStorageType: function () {
        return this.dropdown.value;
    },

    getInputFieldValue: function () {
        return this.textField.value;
    }

}
