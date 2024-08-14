
function showLink(info, url, cluster_id) {
    var modal = document.getElementsByClassName('modal')[0];
    if (modal) {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    }

    if (info.indexOf('%') > -1) {
        info = decodeURIComponent(info);
    }
    var modal = document.createElement('div');
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.height = '17%';
    modal.style.width = '100%';
    modal.style.overflowY = 'scroll';
    modal.style.color = 'white';
    modal.style.fontSize = '11pt';
    modal.style.padding = '10px';

    modal.className = 'modal';
    s = '<div class="modal-content"><span class="close" style="cursor:pointer;">&times;</span><p>' + info + '</p><a target="_blank" style="color:white;" href="' + url + '">' + url + '</a></div>';
    
    var cluster = clusters[cluster_id-1];
    s += '<br /><small>Cluster ' + cluster_id + ': ';
    for (var i = 0; i < cluster.length; i++) {        
        s += cluster[i].word + ' (' + cluster[i].score + ') ';
    }
    modal.innerHTML = s+'</small></div>';

    document.body.appendChild(modal);
    var span = document.getElementsByClassName('close')[0];
    span.onclick = function() {
        modal.style.display = 'none';
    }
    modal.style.display = 'block';
}

var search = document.createElement('input');
search.style.position = 'fixed';
search.style.bottom = '0';
search.style.left = '0';
search.style.width = '200px';
search.style.height = '20px';
search.style.fontSize = '11pt';
search.style.zIndex = '1';
search.placeholder = 'Search for text';
search.id = 'search';
document.body.appendChild(search);

var button = document.createElement('button');
button.style.position = 'fixed';
button.style.bottom = '0';
button.style.left = '200px';
button.style.height = '20px';
button.style.fontSize = '11pt';
button.style.zIndex = '1';
button.innerHTML = 'Search';
button.id = 'search_button';
document.body.appendChild(button);

var highlight_color = "yellow";
document.getElementById('search_button').addEventListener('click', function() {    
    var search = document.getElementById('search').value;
    var divs = document.getElementsByClassName('divdot');
    search_values = search.split('|');
    for (var i = 0; i < divs.length; i++) {        
        var haystack = txt[i].ti + ' ' + txt[i].ab;            
        found = false;
        for (var j = 0; j < search_values.length; j++) {            
            if (haystack.toLowerCase().indexOf(search_values[j]) > -1) {                
                found = true;
                break;
            }
        }
        if (found) {
            divs[i].style.backgroundColor = highlight_color;
        } else {
            divs[i].style.backgroundColor = '#ffffff00';
        }
    }
});

function draw_button(innerhtml,id,bottompx) {
    var button = document.createElement('button');
    button.style.position = 'fixed';
    button.style.bottom = bottompx;
    button.style.left = '0';
    button.style.height = '20px';
    button.style.fontSize = '11pt';
    button.style.zIndex = '1';
    button.innerHTML = innerhtml;
    button.id = id;
    document.body.appendChild(button);    
}

draw_button('Discipline','journal_button','20px');
document.getElementById('journal_button').addEventListener('click', function() {
    highlight_color = "yellow";
    var divs = document.getElementsByClassName('comTRUE');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.color = 'blue';
    }
    divs = document.getElementsByClassName('comFALSE');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.color = 'red';
    }
});

draw_button('Cluster','cluster_button','40px');
document.getElementById('cluster_button').addEventListener('click', function() {
    highlight_color = "yellow";
    var divs = document.getElementsByClassName('comTRUE');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.color = divs[i].getAttribute('defaultcolor');
    }
    divs = document.getElementsByClassName('comFALSE');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.color = divs[i].getAttribute('defaultcolor');
    }
});

draw_button('Grayscale','gray_button','60px');
document.getElementById('gray_button').addEventListener('click', function() {
    highlight_color = "black";
    var divs = document.getElementsByClassName('comTRUE');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.color = '#bbbbbb';
    }
    divs = document.getElementsByClassName('comFALSE');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.color = '#bbbbbb';
    }
});

function visitUrl(url) {
    window.open(url, '_blank');
}   

document.getElementById('container').onclick = function(event) {
    var divs = document.getElementsByClassName('divdot');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.backgroundColor = '#ffffff00';
    }
}