const modelEls = document.querySelectorAll('.carMake');
modelEls.forEach((modelEl) => {
  formatModel(modelEl);
});

function formatModel(modelEl) {
  const model = modelEl.innerHTML;
  const firstLetter = model.charAt(0);
  const restOfLetters = model.slice(1);
  const formattedModel = firstLetter.toUpperCase() + restOfLetters;
  modelEl.innerHTML = formattedModel;
}
