
const STORE = {
  item: [ {name: 'apples', checked: false}, {name: 'oranges', checked: false}, {name: 'milk', checked: true}, {name: 'bread', checked: false} ],
  showChecked: true
};


//Useful function for finding item index from the Html

function getItemIndexFromHtml(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}



// User can press a switch/checkbox to toggle between displaying all items or displaying only items that are unchecked
//
// 1.  make a switch/checkbox in html in the form  ------------------------- DONE 
// 2.  write code to either display checked items or not--------------------
//



 
  //when the user checks the box, change the value of STORE.showChecked to "true"
function getShowCheckedStatus(obj) {
    obj.showChecked = !obj.showChecked;
}   //its 2am and this function 

// dont render html elements if STORE['item'][index].checked === true

  //iterate through the list of items, make a new list of items if checked value is false ....  DONE
function notCheckedItems() {
  const visibleItems = [];
  STORE['item'].forEach(item => {
    if (item.checked ===false) {
      visibleItems.push(item);
    }
    });
  return visibleItems;
}   

  //when box is unchecked => hide all elements that are checked. When the user checks the box => display all items 
function handleDisplayChecked() {
  $('.display-checked-item').change(function() {
  getShowCheckedStatus(STORE);
  renderShoppingList();
  });
}



// --------------------------------------------------------------------------------------------------//
// HERE LIVES renderShoppingList() which initially renders the page
// It should also be called at the end of any 'handler' functions

function generateItemHtml(item, itemIndex) {
  const checkedClass = item.checked ? 'shopping-item__checked' : '';
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${checkedClass}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingListElements(items){  
  const elements = items.map((item, index) => {
    return generateItemHtml(item, index);
  });
  return elements.join('');
}

function renderShoppingList(){
  let html = generateShoppingListElements(STORE.item);
  if (STORE.showChecked === false) {
    html = generateShoppingListElements(notCheckedItems());
  }
  $('.js-shopping-list').html(html);
}

//-----------------------------------------------------------------------------------added to $(main)

// --------------------------------------------------------------------------------------------------//
// HERE LIVES handleAddItem() which deals with adding new items to our STORE

//First we need to update STORE
function addItemToShoppingList(itemName) {
  STORE['item'].push({name: itemName, checked: false})
}


function handleAddItem() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItem = $('.js-shopping-list-entry').val();
    addItemToShoppingList(newItem);
    renderShoppingList();
    $('.js-shopping-list-entry').val('');
  });
} //-------------------------------------------------------------------------------------added to $(main)

// --------------------------------------------------------------------------------------------------//
// HERELIVES handleToggleItem() which deals with the 'check' button on the app

function changeItemCheckedStatus(index) {
  STORE['item'][index].checked = !STORE['item'][index].checked
}

function handleToggleItem(){
  $('.js-shopping-list').on('click', 'button.shopping-item-toggle', function(event) {
    const itemIndex = getItemIndexFromHtml(event.currentTarget);
    changeItemCheckedStatus(itemIndex);
    renderShoppingList();
  }); 
} //----------------------------------------------------------------------------------------added to $(main)

// --------------------------------------------------------------------------------------------------//
// HERE LIVES handleDeleteItem() which deals with the 'delete' button on the app

function deleteItemFromStore(index) {
  STORE['item'].splice(index, 1);
  console.log(STORE);
}

function handleDeleteItem() {
  $('.js-shopping-list').on('click', 'button.shopping-item-delete', function(event) {
    const itemIndex = getItemIndexFromHtml(event.currentTarget);
    deleteItemFromStore(itemIndex);
    console.log('delete BUTTON');
    renderShoppingList();
  });
} //added to $(main)

// --------------------------------------------------------------------------------------------------//

// behold the glory of the 'main()' function...

function main() {
//rendering function and handler functions should go here
  renderShoppingList();   //working 
  handleAddItem();        //working 
  handleToggleItem();     //working
  handleDeleteItem();     //working
  handleDisplayChecked();
  
}
$(main)










// Some lessons learned...


/*
    //if STORE.showChecked is false, hide all elements that contain the 'shopping-item__checked' attribute
function hideState() { 
  console.log('foo');
  if(STORE.showChecked === false) {
    const checker = STORE['item'].map(item => item.checked);
    console.log(checker);
    for (let i = 0; i < checker.length; i++) {
      if (checker[i] === true) {
        //i = `${i}`;
        console.log($(".js-item-index-element[data-item-index=" + i +"]"));
        $('.js-item-index-element[data-item-index=' + i + ']').hide();
      }
    }
  }

}
*/
