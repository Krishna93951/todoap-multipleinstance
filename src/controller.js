function App(viewInstance, modalInstance) {
  var this_ = this;
  this.view = viewInstance;
  this.modal = modalInstance;
  this.root = this_.view.rootElement;
  this.selectedOption = this_.view.getStorageType();
}

App.prototype = {
  init: function() {
    this.view.initialization();
    this.view.displayTasks(this.modal.getData(this.selectedOption));
    this.selectStorageType();
    this.tasksCount();
    this.deleteCompletedButtonEvent();
    this.attachEvents();
    this.addButtonEvent();
    this.attachCheckboxEvent();
    this.deleteItemEvent();
  },

  attachEvents: function() {
    var this_ = this;
    this_.root.addEventListener("keypress", function(e) {
      if (e.keyCode === 13) {
        this_.addTasksToList();
      }
    });
  },

  onSelectionOfStorageType: function() {
    this.view.clearAndFocusTextField();
    this.modal.createStorageInstance();
  },

  deleteTaskFromList: function(e) {
    var itemId = e.detail.id;
    e.detail.name.remove();
    this.modal.updateStorage(itemId, this.selectedOption);
    this.tasksCount();
  },

  toggleStatus: function(e) {
    this.modal.toggleStatus(e, this.selectedOption);
    this.tasksCount();
  },

  addTasksToList: function() {
    var id = Date.now().toString();
    var inputField = this.view.getInputFieldValue();
    var notifyMessage = {
      invalidInput: "Enter Valid Input"
    };
    if (inputField === "") {
      alert(notifyMessage.invalidInput);
    } else {
      this.modal.addTasksToStorage(id, inputField, this.selectedOption);
      this.view.createListElements(id, inputField);
      this.view.clearAndFocusTextField();
      this.tasksCount();
    }
  },

  delCompleted: function() {
    this.view.displayTasks(this.modal.deleteCompleted(this.selectedOption));
    this.tasksCount();
  },

  tasksCount: function() {
    var getTasksCount = this.modal.taskCount(this.selectedOption);
    this.view.totalTaskCount(
      getTasksCount.completedTasks,
      getTasksCount.pendingTasks,
      getTasksCount.allTasks
    );
  },

  attachCheckboxEvent: function() {
    this.root.addEventListener("onCheckbox", this.toggleStatus.bind(this));
  },

  selectStorageType: function() {
    this.root.addEventListener(
      "onStorageChange",
      this.onSelectionOfStorageType.bind(this)
    );
  },

  addButtonEvent: function() {
    this.root.addEventListener("onClickOfAdd", this.addTasksToList.bind(this));
  },

  deleteCompletedButtonEvent: function() {
    this.root.addEventListener(
      "onCompletedTasks",
      this.delCompleted.bind(this)
    );
  },

  deleteItemEvent: function() {
    this.root.addEventListener(
      "deleteItem",
      this.deleteTaskFromList.bind(this)
    );
  }
};
