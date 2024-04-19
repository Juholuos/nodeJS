function formatDate(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

const dateEls = document.querySelectorAll('.date-td');

dateEls.forEach((dateEl) => {
  const date = dateEl.innerHTML;
  const formattedDate = formatDate(date);
  dateEl.innerHTML = formattedDate;
});
