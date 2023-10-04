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

if(parseInt(window.localStorage.getItem('current-selected-item-offset')) == 0) {
    getContentFromUrl('https://6512d478b8c6ce52b3965089.mockapi.io/api/v1/self-intro', 'area1');
}