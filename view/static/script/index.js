/**
 * Created by Stijn on 03/07/2017.
 */
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please fill all fields");
    } else {

        var details = {
            username: username,
            password: password
        };
        $.post("/login", details).done(function (data) {
            if (data !== 'failed') {
                $.cookie('session', data, {expires: 1});
                location.reload(true);
            }
        });
    }

}

function setPage(page) {
    $.post("/setPage", {page: page}).done(function () {
        location.reload(true);
    })
}

function selectTurtle(img) {
    var source = img.src;

    var id = img.id;
    var imgList = document.getElementsByTagName("img");
    console.log(imgList);
    for (var i = 0; i < imgList.length; i++) {
        var image = imgList[i];

        console.log(image);
        if (image.src.indexOf('Slot') !== -1) {
            if (image.id === id) {
                image.src = "static/imgs/selectedSlot.png";
            } else {
                image.src = "static/imgs/unselectedSlot.png";
            }
        }
    }

}

var firstThree = [];
var turtles;

function showTurtles() {
    for (var i = 0; i = firstThree; i++) {
        console.log(firstThree[i]);
    }

    for (var i = 0; i < turtles.length; i++) {
        if (firstThree.indexOf(turtles[i]) !== -1) {
            turtles[i].className = turtles[i].className.replace("hidden","");
        } else {
            turtles[i].className += " hidden";
        }
    }
}

$(document).ready(function () {
    turtles = document.getElementsByClassName('hidden');
    firstThree[0] = turtles[0];
    firstThree[1] = turtles[1];
    firstThree[2] = turtles[2];
    showTurtles();
});