var inputs = Array.from(document.getElementsByClassName('component-input'));
var inputDefaultValues = [];
var inputIsPassword = [];

var math_js = document.createElement('script');
math_js.src = "../../utils/math.js";
body.appendChild(math_js);

for(const i in inputs){
    /* 引用导致错误
    var input = inputs[i];
    input.onclick = function() {
        input.value = "";
    }
    */
    inputDefaultValues.push(inputs[i].value);
    var regex = /password/i;
    inputIsPassword.push(
        Array.from(inputs[i].classList).some(function(str){
            return regex.test(str);
        })
    );
    // onfocus比onclick即时性高
    inputs[i].onfocus = function() {
        if(rgbToHex(window.getComputedStyle(inputs[i]).color) == subTextColor){
            inputs[i].value = "";
            inputs[i].style.color = mainTextColor;
            inputs[i].style.borderBottomColor = themeColor;
            if(inputIsPassword[i]) inputs[i].type = "password";
        }
    }
    inputs[i].onblur = function(type = 1) {
        if(inputs[i].value == "" || type == 0){
            inputs[i].value = inputDefaultValues[i];
            inputs[i].style.color = subTextColor;
            inputs[i].style.borderBottomColor = subTextColor;
            inputs[i].type = "text";
        }
    }
}

