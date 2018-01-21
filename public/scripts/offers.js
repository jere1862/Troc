function on_accept_offer(e) {
    var e = e || window.event;
    e = e.target || e.srcElement;
    if (e.nodeName === 'BUTTON') {
        var offerId = e.value;
        fetch('/offers/accept/' + offerId, {credentials: "include", method: "POST"})
            .then(function (value) { location.reload(); });
    }
}

function on_deny_offer() {
    var e = e || window.event;
    e = e.target || e.srcElement;
    if (e.nodeName === 'BUTTON') {
        var offerId = e.value;
        fetch('/offers/deny/' + offerId, {credentials: "include", method: "POST"})
            .then(function (value) { location.reload(); });
    }
}