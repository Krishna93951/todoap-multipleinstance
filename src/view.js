function View(rootElementId) {
  this.rootElement = document.querySelector(rootElementId);
}

View.prototype = {
  countMessage: {
    all: "All Tasks: ",
    completed: " / Number of Completed Tasks: ",
    pending: " / Number of Pending Tasks: "
  },

  initialization: function() {
    this.createTitle();
    this.createAppContainer();
    this.appendToRootElement();
  },

  createAppContainer: function() {
    var appContainer = this.createElements("div", { class: "main" });
    this.appendToAppContainer(appContainer);
    return appContainer;
  },

  appendToAppContainer: function(appContainer) {
    appContainer.append(
      this.createActionsContainer(),
      this.todoList(),
      this.createDeleteButton()
    );
  },

  createTitle: function() {
    var title = this.createElements("p", { id: "header" });
    title.innerText = "To-do List";
    return title;
  },

  taskCount: function() {
    return this.createElements("p", { class: "allTasks" });
  },

  createActionsContainer: function() {
    var actions = this.createElements("div", { class: "actions" });
    this.appendToActionsContainer(actions);
    return actions;
  },

  inputField: function() {
    return this.createElements("input", {
      class: " inputField",
      maxlength: "40",
      placeholder: "Enter yout Todo ...."
    });
  },

  createDropdown: function() {
    var dropdown = this.createElements("select", { class: "storage" });
    this.appendOptionsToDropdown(dropdown);
    this.attachEventToDropdown(dropdown);
    return dropdown;
  },

  appendOptionsToDropdown: function(dropdown) {
    var options = ["LocalStorage", "SessionStorage"];
    for (var i = 0; i < options.length; i++) {
      var option = this.createElements("option", { value: options[i] });
      option.innerText = options[i];
      dropdown.appendChild(option);
    }
  },

  attachEventToDropdown: function(dropdown) {
    var _this = this;
    var dropdownEvent = new Event("onStorageChange");
    dropdown.addEventListener("change", function() {
      _this.rootElement.dispatchEvent(dropdownEvent);
    });
  },

  createAddButton: function() {
    var addButton = this.createElements("button", { id: "addBtn" });
    addButton.innerText = "Add";
    this.attachEventToAddButton(addButton);
    return addButton;
  },

  attachEventToAddButton: function(addButton) {
    var _this = this;
    var addButtonEvent = new Event("onClickOfAdd");
    addButton.addEventListener("click", function() {
      _this.rootElement.dispatchEvent(addButtonEvent);
    });
  },

  appendToActionsContainer: function(actions) {
    actions.append(
      this.inputField(),
      this.createAddButton(),
      this.createDropdown()
    );
  },

  todoList: function() {
    return this.createElements("ul", { class: "todoList" });
  },

  createDeleteButton: function() {
    var deleteCompletedTasks = this.createElements("button", { id: "delBtn" });
    deleteCompletedTasks.innerText = "Delete Completed ";
    this.attachEventToDeleteButton(deleteCompletedTasks);
    return deleteCompletedTasks;
  },

  attachEventToDeleteButton: function(deleteCompletedTasks) {
    var _this = this;
    var deleteEvent = new Event("onCompletedTasks");
    deleteCompletedTasks.addEventListener("click", function() {
      _this.rootElement.dispatchEvent(deleteEvent);
    });
  },

  appendToRootElement: function() {
    var _this = this;
    _this.rootElement.append(
      this.createTitle(),
      this.createAppContainer(),
      this.taskCount()
    );
  },

  createListElements: function(id, input, status) {
    var li = this.createElements("li", { class: "listItem" });
    this.appendListItemToList(li, id, input, status);
  },

  appendListItemToList: function(li, id, input, status) {
    var _this = this;
    li.append(
      this.createCheckbox(status, id),
      this.createTask(input, id),
      this.createTaskDeletionButton(li, id)
    );
    _this.rootElement.querySelector(".todoList").append(li);
  },

  createCheckbox: function(status, id) {
    var selectionBox = this.createElements("input", {
      id: "tick",
      type: "checkbox",
      class: "tick"
    });
    selectionBox.checked = status;
    this.attachEventToCheckbox(selectionBox, id);
    return selectionBox;
  },

  attachEventToCheckbox: function(selectionBox, id) {
    var _this = this;
    var checkboxEvent = new CustomEvent("onCheckbox", { detail: { id: id } });
    selectionBox.addEventListener("change", function() {
      _this.rootElement.dispatchEvent(checkboxEvent);
    });
  },

  createTask: function(inputField, id) {
    var spanElement = this.createElements("span", { id: id });
    spanElement.innerText = inputField;
    return spanElement;
  },

  createTaskDeletionButton: function(li, id) {
    var deleteTask = this.createElements("button", { id: "remove" });
    deleteTask.innerText = "Del";
    this.attachEventToDeleteTask(li, deleteTask, id);
    return deleteTask;
  },

  attachEventToDeleteTask: function(li, deleteTask, id) {
    var _this = this;
    var delTask = new CustomEvent("deleteItem", {
      detail: { id: id, name: li }
    });
    deleteTask.addEventListener("click", function() {
      _this.rootElement.dispatchEvent(delTask);
    });
  },

  createElements: function(elemnt, attribute) {
    var element = document.createElement(elemnt, attribute);
    for (var i in attribute) {
      element.setAttribute(i, attribute[i]);
    }
    return element;
  },

  clearAndFocusTextField: function() {
    var _this = this;
    var todo = _this.rootElement.querySelector(".inputField");
    todo.value = "";
    todo.focus();
  },

  totalTaskCount: function(checkedCount, pending, taskData) {
    var _this = this;
    return (_this.rootElement.querySelector(".allTasks").innerText =
      this.countMessage.all +
      taskData.length +
      " " +
      this.countMessage.completed +
      checkedCount +
      " " +
      this.countMessage.pending +
      pending);
  },

  displayTasks: function(taskData) {
    var _this = this;
    _this.rootElement.querySelector(".todoList").innerText = "";
    for (i = 0; i < taskData.length; i++) {
      this.createListElements(
        taskData[i].id,
        taskData[i].name,
        taskData[i].status
      );
    }
  },

  getStorageType: function() {
    return this.createDropdown().value;
  },

  getInputFieldValue: function() {
    var _this = this;
    return _this.rootElement.querySelector(".inputField").value;
  }
};
