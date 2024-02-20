function manageBars(barEl) {
  const barElStyle = barEl.style;
  const widthPercentage = parseFloat(barElStyle.width);

  const remainingPercentage = 100 - widthPercentage;

  const greenValue = Math.round(255 * (remainingPercentage / 100));
  const redValue = Math.round(255 * (widthPercentage / 100));

  const bgColor = `rgb(${redValue}, ${greenValue}, 0)`;
  barElStyle.backgroundColor = bgColor;
}