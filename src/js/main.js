 "use strict";

window.onload=function(){
const button = document.querySelector('.button');
var resetButton = document.querySelector('.button__reset');
var ul = document.querySelector('.ul');
var li = document.querySelector('.item');
var zone = document.querySelector('.zone__container');
var itemIds = [];
var store = [];

button.addEventListener("click", createItem);
resetButton.addEventListener("click", reset);


function dragstart_handler(ev) {
 console.log("dragStart");
 ev.dataTransfer.setData("text/plain", ev.target.id);
 ev.dataTransfer.dropEffect = "move";
}

function dragover_handler(ev) {
 ev.preventDefault();
 ev.dataTransfer.dropEffect = "move";
}

function drop_handler(ev) {
  console.log('ev: ', ev)
 ev.preventDefault();
 // Get the id of the target and add the moved element to the target's DOM
 var data = ev.dataTransfer.getData("text");
 //appendChild inserting into most recently added element so used insertBefore
  zone.appendChild(document.getElementById(data));

}

// create item ->
// call increment counter
// check if arrayStore has instance of counter, does it equal id
//   if it does not
//   store instance of counter in arrayStore and give item same id as instance of counter

//   if it does
//   call increment counter
//   check again

function createItem() {
  if (counter.value() < 10) {
    counter.increment();
    console.log(counter.value());
    while (store.indexOf(counter.value()) !== -1) {
      counter.increment();
    }

    store.push(counter.value());
    console.log('store:  ',store)

    var draggableItem = document.createElement('li');
    draggableItem.setAttribute('id', `${counter.value()}`)
    draggableItem.classList.toggle('item');
    draggableItem.setAttribute('draggable','true');
    draggableItem.setAttribute('ondragstart', 'dragstart_handler(event);')
    draggableItem.innerHTML = `Item ${counter.value()}`;
    ul.appendChild(draggableItem);

  }
  else if (counter.value() >= 10 ) {
    button.setAttribute('disabled','true');
  }
}

// delete item ->
// remove instance of counter in arrayStore by checking with id
//   find: var index = arrayStore.indexOf(item.id)
//   delete array item: arrayStore[index]
// call decrement counter

function deleteItem(ev) {
  ev.preventDefault();
  counter.decrement();
  var data = ev.dataTransfer.getData("text");
  console.log('data:  ', data)
  data = Number(data);
  var index = store.indexOf(data);
  console.log('index:', index)
  store.splice(index, 1);

  ev.target.appendChild(document.getElementById(data));
  ev.target.innerHTML = '';

}

function reset() {
  //dropzone.classList.remove('dropzone__container');
  counter.reset();
  while(ul.firstChild){
      ul.removeChild(ul.firstChild);
  }
  //dropzone.classList.add('dropzone__container--reset');
  zone.innerHTML = '';
  button.removeAttribute('disabled');
}


//tried with finding length of li elements..
//https://developer.mozilla.org/en/docs/Web/JavaScript/Closures
var counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      if (privateCounter < 10) {
        changeBy(1);
      }
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    },
    reset: function() {
     privateCounter = 0;
     store = [];
    }
  };
})();
}

//tried styling with classList.toggle but too complicated
