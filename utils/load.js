function loadComponents(components) {
    for(const i in components){
        var componentPath = "../../components/" + components[i] + "/" + components[i];
        var newCssLink = document.createElement('link');
        newCssLink.rel = "stylesheet";
        newCssLink.href = componentPath + ".css";
        head.insertBefore(newCssLink, head.firstChild);
        var newJsScript = document.createElement('script');
        newJsScript.src = componentPath + ".js";
        body.appendChild(newJsScript);
    }
}