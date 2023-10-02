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

selectItem(items[parseInt(window.localStorage.getItem('current-selected-item-offset'))]);