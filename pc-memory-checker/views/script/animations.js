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
  console.log('halo');
  const loadingBars = document.querySelectorAll('.bar');
  
  loadingBars.forEach(bar => {
    let minValue = 0;
    
    
    const barContainer = document.querySelector('.bar-container');
    const barContainerWidth = barContainer.clientWidth;

    const maxValueString = getComputedStyle(bar).width
    const maxValue = parseFloat(maxValueString);
    
    
    // Set initial width of the loading bar to minValue
    bar.style.width = `${minValue}%`;
    

    // Define the interval for updating the loading bar
    const interval = setInterval(() => {
      manageBars(bar, barContainerWidth);
      minValue += maxValue / 100; 
      bar.style.width = `${minValue}px`;
      bar.textContent = `(${((minValue / barContainerWidth) * 100).toFixed(2)}%)`;

      // Stop the animation when the loading bar reaches its maximum value
      if (minValue >= maxValue) {
        clearInterval(interval);
      }
    },10); // Adjust the interval duration as needed
  });
}



animateLoadingDots();


