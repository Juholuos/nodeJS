const trashIcons = document.querySelectorAll('.fa-trash');

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
      } else {
        console.log('Failed to delete maintenance');
      }
    } catch (error) {
      console.error('Error deleting', error);
    }
  });
});
