const trashIcons = document.querySelectorAll('.fa-trash');
const alertEl = document.querySelector('.alert');

function animateAlert() {
  setTimeout(() => {
    alertEl.classList.add('fade-out');
  }, 4000);
}

trashIcons.forEach((trashIcon) => {
  trashIcon.addEventListener('click', async () => {
    const maintenanceID = trashIcon.closest('.maintenance-row').dataset.id;
    try {
      const response = await fetch(`/maintenance/${maintenanceID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        trashIcon.closest('.maintenance-row').remove();
        console.log(`Maintenance with id ${maintenanceID} deleted succesfully`);
        alertEl.innerHTML = 'Poisto onnistui!';
      } else {
        console.log('Failed to delete maintenance');
      }
    } catch (error) {
      console.error('Error deleting', error);
    }
  });
});
