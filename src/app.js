function App(viewInstance, modalInstance) {
  var this_ = this;
  this.view = viewInstance;
  this.modal = modalInstance;
  this.root = this_.view.rootElement;
}

App.prototype = {
  selectedOption: function() {
    return this.view.getStorageType();
  },

  init: function() {
    this.view.initialization();
    this.view.displayTasks(this.modal.getData(this.selectedOption()));
    this.handleCountingOfTasks();
    this.attachEvents();
  },

  attachEvents: function() {
    var this_ = this;
    this_.root.addEventListener("keypress", function(e) {
      if (e.keyCode === 13) {
        this_.handleAddingOfTask();
      }
    });
    this.root.addEventListener("onCheckbox",this.handleTogglingOfStatus.bind(this));
    this.root.addEventListener("onStorageChange",this.onStorageSelection.bind(this));
    this.root.addEventListener("onClickOfAdd",this.handleAddingOfTask.bind(this));
    this.root.addEventListener("onCompletedTasks",this.handleDeletionOfCompletedTasks.bind(this));
    this.root.addEventListener("deleteItem",this.handleDeletionOfTask.bind(this));
  },

  onStorageSelection: function() {
    this.view.clearTextField();
    this.view.displayTasks(this.modal.getData(this.selectedOption()));
    this.modal.createStorageInstance();
    this.handleCountingOfTasks();
  },

  handleDeletionOfTask: function(e) {
    var itemId = e.detail.id;
    e.detail.name.remove();
    this.modal.updateStorage(itemId, this.selectedOption());
    this.handleCountingOfTasks();
  },

  handleTogglingOfStatus: function(e) {
    var uniqueId = e.detail.id;
    this.modal.toggleStatusInStorage(uniqueId, this.selectedOption());
    this.handleCountingOfTasks();
  },

  handleAddingOfTask: function() {
    var id = Date.now().toString();
    var inputField = this.view.getInputFieldValue();
    var notifyMessage = {
      invalidInput: "Enter Valid Input"
    };
    if (inputField === "") {
      alert(notifyMessage.invalidInput);
    } else {
      this.modal.addTasksToStorage(id, inputField, this.selectedOption());
      this.view.createListElements(id, inputField);
      this.view.clearTextField();
      this.handleCountingOfTasks();
    }
  },

  handleDeletionOfCompletedTasks: function() {
    this.view.displayTasks(this.modal.deleteCompletedTasksInStorage(this.selectedOption()));
    this.handleCountingOfTasks();
  },

  handleCountingOfTasks: function() {
    var allTasks = this.modal.getData(this.selectedOption());
    var completeTasksCount = 0;
    for (var i = 0; i < allTasks.length; i++) {
      if (allTasks[i].status === true) {
        completeTasksCount++;
      }
    }
    var pendingTasksCount = allTasks.length - completeTasksCount;
    this.view.displayTotalTasksCount(allTasks,completeTasksCount,pendingTasksCount);
  }
};