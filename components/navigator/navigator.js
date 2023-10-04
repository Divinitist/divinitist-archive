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

window.addEventListener('load', function() {
    items[parseInt(window.localStorage.getItem('current-selected-item-offset'))].dispatchEvent(new Event('click'));
    // onclick和eventlistner是两个体系！
})
