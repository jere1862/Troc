function on_accept_offer(offerId) {
    fetch('/offers/accept/' + offerId, {credentials: "include", method: "POST"})
        .then(function (value) { location.reload(); });
}

function on_deny_offer(offerId) {
    fetch('/offers/deny/' + offerId, {credentials: "include", method: "POST"})
        .then(function (value) { location.reload(); });
}