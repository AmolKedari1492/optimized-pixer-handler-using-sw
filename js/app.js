// Register SW
if ("serviceWorker" in navigator) {
    // Register a SW
    navigator.serviceWorker.register('../sw.js').then((resp) => {
        console.log("Service worker registered.")
    }).catch((error) => console.log(error))
}

// Images
var urls = [
    "https://amol-dummy-bucket.s3.amazonaws.com/gif1.gif?interaction=UserClick&client=ad_media&os_name=macos&x1=google&x2=email&x3=pdfconvert&landing_url=abcd1",
    "https://amol-dummy-bucket.s3.amazonaws.com/img1.png?interaction=UserClick&client=ad_media&os_name=macos&x1=google&x2=email&x3=pdfconvert&landing_url=abcd1",
    "https://amol-dummy-bucket.s3.amazonaws.com/img2.png?interaction=UserClick&client=ad_media&os_name=macos&x1=google&x2=email&x3=pdfconvert&landing_url=abcd1"
];

// Utility funtion
function getBaseURL(url) {
    var indexOf = url.indexOf('?');
    url = url.substr(0, indexOf);
    return url;
}

function parseQueryString(str) {
    var startSubStr = str.indexOf('?');
    startSubStr++;
    str = str.substr(startSubStr);
    var arr = str.split('&');
    var arrLen = arr.length;
    var queryParams = {};
    for (var i = 0; i < arrLen; i++) {
        var item = arr[i].split("=");
        queryParams[item[0]] = item[1];
    }
    return queryParams;
};

function formatQueryString(url, queryObj) {
    if (url.indexOf('?') === -1) {
        url += '?';
    };

    let keys = Object.keys(queryObj)

    for(var i = 0; i < keys.length; i++) {
        if(i !== 0) {
            url += '&';
        }
        url += keys[i] + '=' + queryObj[keys[i]];
    }

    return url;
};

function replacedWithNewParams(queryParams) {
    var newQueryParams = {};

    if (queryParams.interaction) {
        newQueryParams.event = queryParams.interaction;
    }
    if (queryParams.client) {
        newQueryParams.customer = queryParams.client;
    }
    if (queryParams.os_name) {
        newQueryParams.operating_system_name = queryParams.os_name;
    }
    if (queryParams.x1) {
        newQueryParams.utm_source = queryParams.x1;
    }
    if (queryParams.x2) {
        newQueryParams.utm_medium = queryParams.x2;
    }
    if (queryParams.x3) {
        newQueryParams.utm_campaign = queryParams.x3;
    }
    if (queryParams.landing_url) {
        newQueryParams.campaign_url = queryParams.landing_url;
    }

    return newQueryParams;
}

// Render image to DOM
function renderImage(response) {
    var img = new Image();
    img.src = window.URL.createObjectURL(response);
    document.getElementById("imgContainer").appendChild(img);
}

// HTTP call
function makeHTTPCall(originalUrl, callback) {
    return new Promise(function (res, rej) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.responseType = 'blob';
        xmlHttp.onload = function () {
            if (xmlHttp.status === 200) {
                res(xmlHttp.response)
            } else {
                rej(new Error("Error on loading image."));
            }
        }

        // Mapped existing url with
        // given url queryparams
        var baseUrl = getBaseURL(originalUrl);
        var queryParams = parseQueryString(originalUrl);
        queryParams = replacedWithNewParams(queryParams);
        var newUrl = formatQueryString(baseUrl, queryParams);

        xmlHttp.open("GET", newUrl, true);
        xmlHttp.send(null);
        xmlHttp.onerror = function () {
            rej(new Error("Error on loading image."));
        };

    });
}

function fetchImages() {
    var urlLen = urls.length;
    for (let i = 0; i < urlLen; i++) {
        makeHTTPCall(urls[i])
            .then(function (resp) {
                renderImage(resp);
            }, function (error) {
                console.error(error)
            }).catch(function () {
                console.error("Error on loading image.")
            });
    }
}

fetchImages()
