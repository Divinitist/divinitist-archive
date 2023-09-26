function setClassByName(className, attr) {
    var elements = Array.from(document.getElementsByClassName(className));
    for(const i in elements){
        elements[i].style.display = attr;
    }
}