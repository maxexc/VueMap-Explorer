if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/VueMap-Explorer/sw.js', { scope: '/VueMap-Explorer/' })})}