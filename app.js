// BUDGET MODULE
var budgetController = (function() {
  // function contructors to create a bunch of objects. use cap letter to distinguish
  function Expense(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  function Income(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  // store multiple incomes or expenses
  // moved to data object
  // var allExpenses = [];
  // var allIncomes = [];
  // var totalExpenses = [];
  // var totalIncomes = [];
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };
  return {
    addItem(type, des, val) {
      var newItem, ID;
      // ID = last ID + 1
      // create new ID
      if(data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      // create new item based on 'inc' or 'exp' type
      if(type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if(type === 'inc') {
        newItem = new Income(ID, des, val);
      }
      // push new item into data structure
      data.allItems[type].push(newItem);
      // return new element
      return newItem;
    },
    testing() {
      console.log(data);
    }
  };
  
})();


// USER INTERFACE MODULE
var UIController = (function() {
  // an obj to select all the dom queries
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  }
  return {
    getInput() {
      // obj with three properties
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
        // moved all query selection to DOMstring object properties
        // type: document.querySelector('.add__type').value,
        // description: document.querySelector('.add__description').value,
        // value: document.querySelector('.add__value').value
      }
      // will be income or expense
      // instead of return three variables, return an obj with three properties
      // var type = document.querySelector('.add__type').value;
      // var description = document.querySelector('.add__description').value;
      // var description = document.querySelector('.add__value').value;
    },
  addListItem(obj,type) {
      var html,newHtml,element;
    // create html string with a placeholder text
    if(type === 'inc') {
      element = DOMstrings.incomeContainer;
      html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    } else if(type === 'exp'){
      element = DOMstrings.expensesContainer;
      html ='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
    }
    // replace the placeholder with data
    newHtml = html.replace('%id%', obj.id);
    newHtml = newHtml.replace('%description%', obj.description);
    newHtml = newHtml.replace('%value%', obj.value);
    // insert html into the dom
    document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
  },
    // sending domstrings as a global object - exposed to public
   getDOMstrings() {
      return DOMstrings;
    }
  };
})();



// GLOBAL APP CONNECTOR MODULE
var controller = (function(budgetCtrl, UICtrl) {
  function setupEventListeners() {
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    // sending the querySelector as inputbtn property of domstrings  
    // document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event) {
      if(event.keyCode === 13) {
        ctrlAddItem();
      }
    });
  };
  // grabbing domstrings from UIController and storing it as a new var 
  // moved to setupEventListeners  
  // var DOM = UICtrl.getDOMstrings();
  function ctrlAddItem() {
    var input, newItem
    // get filled input data
    input = UICtrl.getInput();
    // add item to budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    // add new item to user interface
    UICtrl.addListItem(newItem, input.type);
    // calculate the budget
    // store and display the budget
  };
  // moved these events to new var setupEventListeners
  // document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
  // // sending the querySelector as inputbtn property of domstrings  
  // // document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
  // document.addEventListener('keypress', function(event) {
  //   if(event.keyCode === 13) {
  //     ctrlAddItem();
  //   }
  // });
  return {
    // initialize a function, moved the IIFE to setupeventlisteners
    init: function() {
      setupEventListeners();
      console.log('App started');
    }
  }
})(budgetController, UIController);
// calling the init function which will triger the setupEventListeners that was initially an IIFFE.
controller.init();
