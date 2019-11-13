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

function Modal (){
  // this_ = this;
  // this.root = rootElement;
  // this.key = storageKey;
  // this.taskData = this.getData();
  // this.storeData = this.storeData();

  this.addTasksToStorage = function (inputField,taskData) {
  taskData.push({ 
    id: Date.now(), 
    name: inputField, 
    status: false });
  }


}