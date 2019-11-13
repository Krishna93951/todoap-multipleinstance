function App(storageKey, viewInstance, modalInstance) {
  var this_ = this;
  this.key = storageKey;
  this.view = viewInstance;
  this.modal = modalInstance;

  this.init = function () {
    this_.view.emptyList();
    this_.addButtonEvent();
    this_.selectStorageType();
    this_.deleteCompletedButtonEvent();
    this_.attachEvents();
  };

  this.createStorageInstance = function () {
    var selectedOption = this_.view.rootElement.querySelector('.storage').value;
    var storage = {
      key: this.key,
      LocalStorage: "LocalStorage",
      SessionStorage: "SessionStorage"
    };
    return new StorageManager(storage[selectedOption], storage.key);
  };

  this.storeData = function (taskData) {
    this_.createStorageInstance().setData(taskData);
  };

  this.getData = function () {
    return this_.createStorageInstance().getData();
  };

  this.attachEvents = function () {
    this_.view.rootElement.querySelector('.inputField').addEventListener("keypress", function (e) {
      if (e.keyCode === 13) {
        this_.addTasksToList();
      }
    });
  };

  this.onSelectionOfStorageType = function () {
    this_.view.displayTasks(taskData = this_.getData());
    this_.view.clearAndFocusTextField();
    this_.tasksCount();
    
    this_.attachCheckboxEvent();
    this_.deleteItemEvent();
    this_.createStorageInstance();
  };

  this.addTasksToList = function () {
    var id = Date.now();
    var notifyMessage = {
      inputField: "Enter Valid Input"
    };
    var todo = this_.view.rootElement.querySelector('.inputField');
    var inputField = todo.value;
    if (inputField === "") {
      alert(notifyMessage.inputField);
    } else {
      var taskData = this_.getData();
      this_.modal.addTasksToStorage(inputField, taskData);
      this_.view.createListElements(id, inputField);
      this_.storeData(taskData);
      this_.view.clearAndFocusTextField();
      this_.tasksCount();
    }
  };

  this.deleteTaskFromList = function (e) {
    var itemId = e.target.previousSibling.id;
    e.target.parentNode.remove();
    this_.updateStorage(itemId);
    this_.tasksCount();
  };

  this.updateStorage = function (itemId) {
    var taskData = this_.getData();
    var deleteObject = taskData.findIndex(function (element) {
      return element.id === Number(itemId);
    });
    taskData.splice(deleteObject, 1);
    this_.storeData(taskData)
  };

  this.toggleStatus = function (e, todos) {
    var taskData = this_.getData();
    var uniqueId = e.target.nextSibling.id;
    var selectedItem = taskData.findIndex(function (element) {
      return element.id === Number(uniqueId);
    });
    taskData[selectedItem].status = !taskData[selectedItem].status;
    this_.storeData(taskData)
    this_.tasksCount();
  };

  this.deleteCompleted = function () {
    var taskData = this_.getData()
    for (var i = taskData.length - 1; i >= 0; i--) {
      if (taskData[i].status === true) {
        taskData.splice(i, 1);
      }
    }
    this_.storeData(taskData)
    this_.view.displayTasks(taskData)
    this_.tasksCount();
  }
}

App.prototype = {
  tasksCount: function () {
    var list = this.view.rootElement.querySelector('.todoList');
    // this.modal.taskData;
    var taskData = this.getData();
    var checkbox = list.querySelectorAll('input[type="checkbox"]:checked');
    var pending;
    var checkedCount = 0;
    for (var i = 0; i < checkbox.length; i++) {
      checkboxCount = checkbox[i].checked ? checkedCount++ : checkedCount--;
    }
    pending = taskData.length - checkedCount;
    this.view.totalMsg(checkedCount, pending, taskData);
  },

  attachCheckboxEvent: function () {
    this.view.rootElement.addEventListener('checkbox', this.toggleStatus);
  },

  selectStorageType: function () {
    this.view.rootElement.addEventListener('onstroageSelection', this.onSelectionOfStorageType);
  },

  addButtonEvent: function () {
    this.view.rootElement.addEventListener('add', this.addTasksToList);
  },

  deleteCompletedButtonEvent: function () {
    this.view.rootElement.addEventListener('deleteCompleted', this.deleteCompleted);
  },

  deleteItemEvent: function () {
    // var todolist = this_.view.rootElement.querySelector('.todoList');
    this.view.rootElement.addEventListener('deleteItem', this.deleteTaskFromList);
  }

}

