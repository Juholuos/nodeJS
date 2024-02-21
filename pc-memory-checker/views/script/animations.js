function animateLoadingDots() {
  const loadingDivs = document.querySelectorAll('.loading');
  loadingDivs.forEach(div => {
    let dots = ''
    setInterval(() => {
      div.textContent = 'Loading' + dots;
      dots += '.';
      if (dots.length > 3) {
        dots = '';
      }
    }, 200);
  })
}

function animateBars() {
  
}

animateLoadingDots();

