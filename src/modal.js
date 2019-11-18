function LocalStorage(key) {
  (this.key = key),
    (this.getData = function() {
      return JSON.parse(localStorage.getItem(this.key)) || [];
    }),
    (this.setData = function(data) {
      localStorage.setItem(this.key, JSON.stringify(data));
    });
}

function SessionStorage(key) {
  (this.key = key),
    (this.getData = function() {
      return JSON.parse(sessionStorage.getItem(this.key)) || [];
    }),
    (this.setData = function(data) {
      sessionStorage.setItem(this.key, JSON.stringify(data));
    });
}

function Modal(storageKey) {
  this.key = storageKey;
}

Modal.prototype = {
  createStorageInstance: function(selectedOption) {
    var storage = {
      key: this.key,
      LocalStorage: "LocalStorage",
      SessionStorage: "SessionStorage"
    };
    return new StorageManager(storage[selectedOption], storage.key);
  },

  getData: function(selectedOption) {
    return this.createStorageInstance(selectedOption).getData();
  },

  storeData: function(taskData, selectedOption) {
    this.createStorageInstance(selectedOption).setData(taskData);
  },

  addTasksToStorage: function(id, inputField, selectedOption) {
    var taskData = this.getData(selectedOption);
    taskData.push({
      id: id.toString(),
      name: inputField,
      status: false
    });
    this.storeData(taskData, selectedOption);
  },

  deleteCompleted: function(selectedOption) {
    var taskData = this.getData(selectedOption);
    taskData = taskData.filter(function(elem) {
      return elem.status !== true;
    });
    this.storeData(taskData, selectedOption);
    return taskData;
  },

  toggleStatus: function(e, selectedOption) {
    var uniqueId = e.detail.id;
    var taskData = this.getData(selectedOption);
    var selectedItem = taskData.findIndex(function(element) {
      return element.id === uniqueId;
    });
    taskData[selectedItem].status = !taskData[selectedItem].status;
    this.storeData(taskData, selectedOption);
  },

  updateStorage: function(itemId, selectedOption) {
    var taskData = this.getData(selectedOption);
    var deleteObject = taskData.findIndex(function(element) {
      console.log(element.id);
      return element.id === itemId;
    });
    taskData.splice(deleteObject, 1);
    this.storeData(taskData, selectedOption);
  },
  taskCount: function(selectedOption) {
    var taskData = this.getData(selectedOption);
    var checkedCount = 0;
    for (var i = 0; i < taskData.length; i++) {
      if (taskData[i].status === true) {
        checkedCount++;
      }
    }
    return {
      allTasks: taskData,
      completedTasks: checkedCount,
      pendingTasks: taskData.length - checkedCount
    };
  }
};
