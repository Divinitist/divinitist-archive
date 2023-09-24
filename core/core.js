var head = document.getElementById("head");
var body = document.getElementById("body");

var css_array = ["./core.css"];
for(let i = 0; i < css_array.length; ++i){
    var new_css = document.createElement("link");
    new_css.rel = "stylesheet";
    new_css.href = css_array[i];
    head.appendChild(new_css);
}

var path_split = location.href.split('/');
var doc_name = path_split[path_split.length - 1].split('.')[0];