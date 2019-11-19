function View(rootElementId) {
  this.rootElement = document.querySelector(rootElementId);
}

View.prototype = {
  countMessage: {
    all: "All Tasks: ",
    completed: " / Completed Tasks: ",
    pending: " / Pending Tasks: "
  },

  initialization: function() {
    this.appendAppToRootElement();
  },

  createAppContainer: function() {
    var appContainer = this.createElement("div", { class: "main" });
    this.appendAppElementsToAppContainer(appContainer);
    return appContainer;
  },

  appendAppElementsToAppContainer: function(appContainer) {
    appContainer.append(
      this.createActionsContainer(),
      this.createToDoList(),
      this.createDeleteButton()
    );
  },

  createTitle: function() {
    var title = this.createElement("p", { id: "header" });
    title.innerText = "To-do List";
    return title;
  },

  createTaskCountSpace: function() {
    return this.createElement("p", { class: "allTasks" });
  },

  createActionsContainer: function() {
    var actions = this.createElement("div", { class: "actions" });
    this.appendActionElementsToActionsContainer(actions);
    return actions;
  },

  createInputField: function() {
    return this.createElement("input", {
      class: " inputField",
      maxlength: "40",
      placeholder: "Enter yout Todo ...."
    });
  },

  createDropdown: function() {
    var dropdown = this.createElement("select", { class: "storage" });
    this.appendOptionsToDropdown(dropdown);
    this.attachEventToDropdown(dropdown);
    return dropdown;
  },

  appendOptionsToDropdown: function(dropdown) {
    var options = ["LocalStorage", "SessionStorage"];
    for (var i = 0; i < options.length; i++) {
      var option = this.createElement("option", { value: options[i] });
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
    var addButton = this.createElement("button", { id: "addBtn" });
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

  appendActionElementsToActionsContainer: function(actions) {
    actions.append(
      this.createInputField(),
      this.createAddButton(),
      this.createDropdown()
    );
  },

  createToDoList: function() {
    return this.createElement("ul", { class: "todoList" });
  },

  createDeleteButton: function() {
    var deleteCompletedTasks = this.createElement("button", { id: "delBtn" });
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

  appendAppToRootElement: function() {
    var _this = this;
    _this.rootElement.append(
      this.createTitle(),
      this.createAppContainer(),
      this.createTaskCountSpace()
    );
  },

  createListElements: function(id, input, status) {
    var li = this.createElement("li", { class: "listItem" });
    this.appendItemsToList(li, id, input, status);
  },

  appendItemsToList: function(li, id, input, status) {
    var _this = this;
    li.append(
      this.createCheckbox(status, id),
      this.createTask(input, id),
      this.createTaskDeletionButton(li, id)
    );
    _this.rootElement.querySelector(".todoList").append(li);
  },

  createCheckbox: function(status, id) {
    var selectionBox = this.createElement("input", {
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
    var spanElement = this.createElement("span", { id: id });
    spanElement.innerText = inputField;
    return spanElement;
  },

  createTaskDeletionButton: function(li, id) {
    var deleteTask = this.createElement("button", { id: "remove" });
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

  createElement: function(elemnt, attribute) {
    var element = document.createElement(elemnt, attribute);
    for (var i in attribute) {
      element.setAttribute(i, attribute[i]);
    }
    return element;
  },

  clearTextField: function() {
    var _this = this;
    var textField = _this.rootElement.querySelector(".inputField");
    textField.value = "";
    this.focusTextField(textField);
  },

  focusTextField: function(textField) {
    // var textField = _this.rootElement.querySelector('.inputField');
    textField.focus();
  },

  clearToDoList: function() {
    var _this = this;
    _this.rootElement.querySelector(".todoList").innerText = "";
  },

  displayTotalTasksCount: function(
    allTasks,
    completeTasksCount,
    pendingTasksCount
  ) {
    var _this = this;
    return (_this.rootElement.querySelector(".allTasks").innerText =
      this.countMessage.all +
      allTasks.length +
      " " +
      this.countMessage.completed +
      completeTasksCount +
      " " +
      this.countMessage.pending +
      pendingTasksCount);
  },

  displayTasks: function(taskData) {
    this.clearToDoList();
    for (i = 0; i < taskData.length; i++) {
      this.createListElements(
        taskData[i].id,
        taskData[i].name,
        taskData[i].status
      );
    }
  },

  getStorageType: function() {
    var _this = this;
    return _this.rootElement.querySelector(".storage").value;
  },

  getInputFieldValue: function() {
    var _this = this;
    return _this.rootElement.querySelector(".inputField").value;
  }
};
