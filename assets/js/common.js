var head = document.getElementsByTagName('head')[0];
var body = document.getElementsByTagName('body')[0];

var mainTextColor = "#303133";
var subTextColor = "#909399";//"#606266";
var themeColor = "#0294DD";
var backgroundColor = "#FFFFFF";


var root = document.documentElement;
root.style.setProperty('--main-text-color', mainTextColor);
root.style.setProperty('--sub-text-color', subTextColor);
root.style.setProperty('--theme-color', themeColor);
root.style.setProperty('--background-color', backgroundColor);


window.addEventListener('load', function() {
    // 不做笔记的页面保持。走错路了，应该新开一个html
    // 不做加载遮掩。会导致canvas寄掉
    var currentSelectedItemOffset = parseInt(window.localStorage.getItem('current-selected-item-offset'));
    items[currentSelectedItemOffset].dispatchEvent(new Event('click'));
    // onclick和eventlistner是两个体系！
})