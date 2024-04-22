const form = document.querySelector('.update-form');
const url = window.location.href;
const urlParts = url.split('/');
const maintenanceID = urlParts[urlParts.length - 1];

console.log(maintenanceID);

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  console.log('Halo');
  const formData = new FormData(this);

  const maintenanceData = {};

  formData.forEach(function (value, key) {
    maintenanceData[key] = value;
  });

  try {
    const response = await fetch(
      `http://localhost:3000/maintenance/${maintenanceID}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(maintenanceData),
      }
    );

    if (response.ok) {
      console.log('Päivitys onnistui!');
      window.location.href = '/';
    } else {
      console.error('Update failed');
    }
  } catch (error) {
    console.error('An error occured', error); // Handle errors
  }
});
