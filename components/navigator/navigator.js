var items = Array.from(document.getElementsByClassName('component-navigator-item'));

function selectItem(item) {
    item.classList.add('selected');
    for(const i in items) {
        if(items[i] == item){
            window.localStorage.setItem('current-selected-item-offset', i);
        }
        else if(items[i].classList.contains('selected')) {
            items[i].classList.remove('selected');
        }
    }
}

for(const i in items) {
    items[i].onclick = function() {
        selectItem(items[i]);
    }
    items[i].addEventListener('mouseenter', function() {
        items[i].classList.add('hovered');
    });
    items[i].addEventListener('mouseleave', function() {
        items[i].classList.remove('hovered');
    });
}

var itemContents = [];
var itemsContainer = document.getElementById('items-container');

for(const i in items) {
    var itemContent = document.getElementById(`item-${i}-content`);
    itemContents.push(itemContent);
}

for(const i in items) {
    items[i].addEventListener('click', function() {
        for(const j in items) {
            if(itemContents[j] == null) {
                continue;
            }
            if(i == j) {
                itemsContainer.appendChild(itemContents[j]);
            }
            else{
                itemContents[j].remove();
            }
        }
    });
}

items[0].addEventListener('click', function() {
    getContentFromUrl('https://6512d478b8c6ce52b3965089.mockapi.io/api/v1/self-intro', 'area1');
});
