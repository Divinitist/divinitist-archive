var head = document.getElementsByTagName('head')[0];
var body = document.getElementsByTagName('body')[0];

var mainTextColor = "#303133";
var subTextColor = "#606266";
var themeColor = "#0294DD";

var root = document.documentElement;
root.style.setProperty('--main-text-color', mainTextColor);
root.style.setProperty('--sub-text-color', subTextColor);
root.style.setProperty('--theme-color', themeColor);