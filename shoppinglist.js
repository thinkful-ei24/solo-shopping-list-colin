
const STORE = {
  item: [ {name: 'apples', checked: false}, {name: 'oranges', checked: false}, {name: 'milk', checked: true}, {name: 'bread', checked: false} ],
  showChecked: true,
  searchFilter: ''
};


//  (>'')>  Useful function for finding item index from the Html

function getItemIndexFromHtml(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

//  (>'')>  Useful function for fixing truncated arrays

function checkedIndexFix(index) {
  let i = 0
  for (; i <= index; i++) {
    if (STORE['item'][i].checked === true) {
      index++;
    }
  }
  return i - 1;
}




  // sets STORE.searchFilter to the contents of the search box 

function setSearchQuery(obj) {
  $('#list-search-filter').on('keyup', function(event) {
    event.preventDefault();
    const query = $('.js-shopping-list-search').val().toLowerCase();  
    obj.searchFilter = query;
  });
}


function filterSearchResults() { 
  if (STORE.searchFilter.length > 4) {
    console.log(STORE.searchFilter);
    //$('.js-shopping-list')
            
    //});
  }
}


//$('#list-search-filter').on('keyup', function () {
//  const value = $('.js-shopping-list-search').val().toLowerCase();
//  console.log(value);
//    $('.js-shopping-list').filter(function() {
//      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//    });
//});


function handleSearchQuery() {
  setSearchQuery(STORE);  
  filterSearchResults();
  renderShoppingList();
}





//--------------------------------------------------------------------------------------------------//
//HERE LIVES handleDisplayChecked() which hides values from the list if if "show checked" is changed

    //when the user checks the box, change the value of STORE.showChecked to "true"
function getShowCheckedStatus(obj) {
    obj.showChecked = !obj.showChecked;
}    

  // dont render html elements if STORE['item'][index].checked === true

    //iterate through the list of items, make a new list of items if checked value is false 

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

//  *** renderShoppingList should be called at the end of any 'handler' functions ***  //

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

    //  adds a new shopping item to the data
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
// HERE LIVES handleToggleItem() which deals with the 'check' button on the app

    //fixes the index for displayed items if filtering and ads a strikethrough
function changeItemCheckedStatus(index) {
  if(STORE.showChecked === false) {
    index = checkedIndexFix(index)    
  }
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

    // fixes the index for displayed items if filtering and deletes items from the list 
function deleteItemFromStore(index) {
  if (STORE.showChecked === false) {
    index = checkedIndexFix(index);
  }
  STORE['item'].splice(index, 1);
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
  handleDisplayChecked(); //working
  handleSearchQuery();
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

if (!STORE.showChecked) {
  let i= 0; 

}
