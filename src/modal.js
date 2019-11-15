function LocalStorage(key) {
  this.key = key,
    this.getData = function () { return JSON.parse(localStorage.getItem(this.key)) || []; },
    this.setData = function (data) { localStorage.setItem(this.key, JSON.stringify(data)); }
}

function SessionStorage(key) {
  this.key = key,
    this.getData = function () { return JSON.parse(sessionStorage.getItem(this.key)) || []; },
    this.setData = function (data) { sessionStorage.setItem(this.key, JSON.stringify(data)); }
}

function Modal(storageKey) {
  this.key = storageKey;

  this.addTasksToStorage = function (inputField, taskData) {
    taskData.push({
      id: Date.now(),
      name: inputField,
      status: false
    });
  }
}

Modal.prototype = {

  createStorageInstance: function (selectedOption) {
    var this_ = this;
    // var selectedOption = this_.view.getStorageType();
    var storage = {
      key: this.key,
      LocalStorage: "LocalStorage",
      SessionStorage: "SessionStorage"
    };
    return new StorageManager(storage[selectedOption], storage.key);
  },

  getData: function (selectedOption) {
    return this.createStorageInstance(selectedOption).getData();
  },

  storeData: function (taskData, selectedOption) {
    this.createStorageInstance(selectedOption).setData(taskData);
  },

  taskCount: function (selectedOption) {
    var taskData = this.getData(selectedOption);
    var checkedCount = 0;
    for (var i = 0; i < taskData.length; i++) {
      if (taskData[i].status === true) {
        checkedCount++
      };
    }
    return {
      allTasks: taskData,
      completedTasks: checkedCount,
      pendingTasks: taskData.length - checkedCount
    };

  },

  deleteCompleted: function (selectedOption) {
    var taskData = this.getData(selectedOption)
    taskData = taskData.filter(function (elem) {
      return elem.status !== true;
    })
    this.storeData(taskData, selectedOption);
    return taskData
  },

  toggleStatus: function (e, selectedOption) {
    var taskData = this.getData(selectedOption);
    var uniqueId = Number(e.detail.id);
    var selectedItem = taskData.findIndex(function (element) {
      return element.id === uniqueId;
    });
    taskData[selectedItem].status = !taskData[selectedItem].status;
    this.storeData(taskData, selectedOption)
  },

  updateStorage: function (itemId, selectedOption) {
    var taskData = this.getData(selectedOption);
    var deleteObject = taskData.findIndex(function (element) {
      return element.id === itemId;
    });
    taskData.splice(deleteObject, 1);
    this.storeData(taskData, selectedOption)
  },


}