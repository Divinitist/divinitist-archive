function getContentFromUrl(url, areaName) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var readingArea1 = document.getElementById(areaName);
            readingArea1.innerHTML = response[0]['text'];
        }
    }
    xhr.send();
}