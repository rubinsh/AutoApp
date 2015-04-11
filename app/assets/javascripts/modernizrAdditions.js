if (!Modernizr.matchmedia) {
  Modernizr.addTest('matchmedia', function(){ 
    return !!(window.webkitMatchMedia || window.mozMatchMedia || window.oMatchMedia || window.msMatchMedia || window.matchMedia);
  });
}

