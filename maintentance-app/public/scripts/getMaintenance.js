const editIcons = document.querySelectorAll('.fa-pencil');

editIcons.forEach((editIcon) => {
  editIcon.addEventListener('click', async () => {
    const maintenanceID = editIcon.closest('.maintenance-row').dataset.id;
    console.log(maintenanceID);

    try {
      const response = await fetch(`/maintenance/${maintenanceID}`, {
        method: 'GET',
      });

      if (response.ok) {
        window.location.href = `/maintenance/${maintenanceID}`;
      }
    } catch (error) {
      console.error(error);
    }
  });
});
