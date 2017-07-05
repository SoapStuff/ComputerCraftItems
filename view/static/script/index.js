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
            username : username,
            password : password
        };
        $.post("/login", details).done(function (data) {
            if (data !== 'failed') {
                $.cookie('session',data, {expires : 1});
                location.reload(true);
            }
        });
    }

}