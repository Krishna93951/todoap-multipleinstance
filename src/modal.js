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
  getData: function(selectedOption) {
    return this.createStorageInstance(selectedOption).getData();
  },

  storeData: function(taskData, selectedOption) {
    this.createStorageInstance(selectedOption).setData(taskData);
  },

  addTasksToStorage: function(id, inputField, selectedOption) {
    var taskData = this.getData(selectedOption);
    taskData.push({
      id: id,
      name: inputField,
      status: false
    });
    this.storeData(taskData, selectedOption);
  },

  deleteCompletedTasksInStorage: function(selectedOption) {
    var taskData = this.getData(selectedOption);
    taskData = taskData.filter(function(elem) {
      return elem.status !== true;
    });
    this.storeData(taskData, selectedOption);
    return taskData;
  },

  toggleStatusInStorage: function(uniqueId, selectedOption) {
    var taskData = this.getData(selectedOption);
    var selectedItem = taskData.findIndex(function(todo) {
      return todo.id === uniqueId;
    });
    taskData[selectedItem].status = !taskData[selectedItem].status;
    this.storeData(taskData, selectedOption);
  },

  updateStorage: function(itemId, selectedOption) {
    var taskData = this.getData(selectedOption);
    var deleteObject = taskData.findIndex(function(todo) {
      return todo.id === itemId;
    });
    taskData.splice(deleteObject, 1);
    this.storeData(taskData, selectedOption);
  },

  createStorageInstance: function(selectedOption) {
    var storage = {
      key: this.key,
      LocalStorage: "LocalStorage",
      SessionStorage: "SessionStorage"
    };
    return new StorageManager(storage[selectedOption], storage.key);
  }
};
