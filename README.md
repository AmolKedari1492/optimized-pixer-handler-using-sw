# optimized-pixer-handler-using-sw
An optimized pixer handler using service worker

# git repo
https://github.com/AmolKedari1492/optimized-pixer-handler-using-sw

# Live url
https://akedari-dummy-ui.herokuapp.com/

# Techstack
This project is developed using vanillajs, HTML5, CSS3, Service worker

# AWS images are served from https://amol-dummy-bucket.s3.amazonaws.com/

# Folder structure
# Js - all js file
# css - styling
# index.html - bootstrapping app
# sw.js - service worker

# Project stpes
# index.html - Basic needs to bootstrap app
# css/app.css - basic CSS
# js/app.js - 
#   - Register service worker
#   - Make Http call for images by changing query params with required one
#   - render images to DOM
#   - Utility services
# sw.js - 
#   - Defined static assests and caching params
#   - Installing SW and caching static assests
#   - Activating SW and removing unused caching i.e. removing older caching
#   - Fetch interceptor: 
#       - Making cache of every request and serving the same
#       - If it is a new request then hit that request and make cache
#   - caching helps to work in offline mode


### Note
# Service worker fetch interceptor request is readOnly in nature, tried with couple of options like editing url, making new request by cloning but doesn't work so query params replaced in http call itself.

