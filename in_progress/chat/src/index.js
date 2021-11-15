var Chat = {
    'intervalId': null,
    'baseUrl': "https://chat.cege.me/",
    'refresh': (callbacks, rate) => {
        Chat.intervalId = setInterval(callbacks, rate);
    },
    'getChat': (person) => {
        token = sessionStorage.getItem('token');
        Chat.queryServer("GET", "get_chat/" + person + '/' + token, (data) => {
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(data, 'text/html');
            if (htmlDoc.getElementById("msg-list") == null) {
                alert(data);
                clearInterval(Chat.intervalId);
            }
            var elem = document.getElementById("msg-list");
            scroll = elem.scrollTop;
            elem.replaceWith(htmlDoc.getElementById("msg-list"));
            document.getElementById("msg-list").scrollTo(0, scroll);
            var encryption = document.getElementById("encryption").value;
            Chat.decryptMsg(encryption);
        });
    },
    'queryServer': (method, url, callback, data={}) => {
        url = Chat.baseUrl + url;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(this.responseText);
            }
        };
        xhttp.open(method, url, true);
        if (method === "POST") {
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            data['token'] = sessionStorage.getItem('token');
            console.log(data);
            xhttp.send(JSON.stringify(data));
        } else {
            xhttp.send(data);
        }

    },
    'sendChat': (msg, sender, reciever) => {
        Chat.queryServer(
            "POST",
            "recieve",
            (res) => {
                console.log("Message sent...");
                console.log(res);
            },
            {
                "sender": Chat.getSender(sender),
                "reciever": Chat.getReciever(reciever),
                "msg": Chat.getMessage(msg)
            }
        );
    },
    'getSender': (sender) => {
        var defaultElem = sessionStorage.getItem("sender");
        var defaultValue = defaultElem ? defaultElem : "Sender";
        return sender !== undefined ? sender : defaultValue;
    },
    'getReciever': (reciever) => {
        var defaultElem = document.getElementById("reciever");
        var defaultValue = defaultElem ? defaultElem.value : "Reciever";
        return reciever !== undefined ? reciever : defaultValue;
    },
    'getMessage': (msg) => {
        var defaultElem = document.getElementById("msg");
        var defaultValue = defaultElem ? defaultElem.value : "Message";
        var msgContent = msg !== undefined ? msg : defaultValue;
        var encryption = document.getElementById("encryption").value;
        if (encryption !== undefined && encryption !== "") {
            return Chat.encryptMsg(encryption, msgContent);
        }
        return msgContent;
    },
    'encryptMsg': (encryption, msg) => {
        var encoded = ""
        var k = 0;
        for (var i = 0; i < msg.length; ++i) {
            var newChar = msg.charCodeAt(i);
            var correction = 0;
            if (newChar >= 65 && newChar <= 90) {
                correction = 65;
            } else if (newChar >= 97 && newChar <= 122) {
                correction = 97;
            } else {
                encoded += String.fromCharCode(newChar);
                continue;
            }
            newChar -= correction;
            var shift = encryption.charCodeAt(k % encryption.length);
            if (shift >= 65 && shift <= 90) {
                shift -= 65;
            } else if (shift >= 97 && shift <= 122) {
                shift -= 97;
            } else {
                shift = 0;
            }
            k++;
            newChar += shift;
            newChar = (newChar + 26) % 26;
            newChar += correction;
            encoded += String.fromCharCode(newChar);
        }
        return encoded;
    },
    'decryptMsg': (encryption) => {
        console.log(encryption);
        if (encryption == "") return;
        var msgs = document.getElementsByClassName("msg-body");
        for (var k = 0; k < msgs.length; ++k) {
            var msg = msgs[k].innerText;
            var encoded = ""
            var j = 0;
            for (var i = 0; i < msg.length; ++i) {
                var newChar = msg.charCodeAt(i);
                var correction = 0;
                if (newChar >= 65 && newChar <= 90) {
                    correction = 65;
                } else if (newChar >= 97 && newChar <= 122) {
                    correction = 97;
                } else {
                    encoded += String.fromCharCode(newChar);
                    continue;
                }
                newChar -= correction;
                var shift = encryption.charCodeAt(j % encryption.length);
                if (shift >= 65 && shift <= 90) {
                    shift -= 65;
                } else if (shift >= 97 && shift <= 122) {
                    shift -= 97;
                } else {
                    shift = 0;
                }
                j++;
                newChar -= shift;
                newChar = (newChar + 26) % 26;
                newChar += correction;
                encoded += String.fromCharCode(newChar);
            }
            msgs[k].innerText = encoded;
        }
    },
    'authUser': () => {
        username = document.getElementById("username").value;
        password = document.getElementById("password").value;
        Chat.queryServer("GET", 'auth-user/' + username + '/' + password, (data) => {
            data = JSON.parse(data);
            if (data.success) {
                clearInterval(Chat.intervalId);
                sessionStorage.setItem("token", data.token);
                Chat.refresh(() => {
                    Chat.getChat(username);
                }, 2000);
                sessionStorage.setItem("sender", username);
            } else {
                alert("Benutzer konnte nicht angemeldet werden!!!");
            }
        });
    },
    'newUser': () => {
        username = document.getElementById("username").value;
        password = document.getElementById("password").value;
        Chat.queryServer("GET", 'new-user/' + username + '/' + password, (data) => {
            data = JSON.parse(data);
            if (data.success) {
                alert("Neuer Benutzer erfolgreich erstellt, bitte melden Sie sich an.");
            } else {
                alert("Benutzer konnte nicht erstellt werden!!!");
            }
        });
    }
}
