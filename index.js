const search = document.querySelector('.searchBar');
const formElement = document.getElementById('myButton');
const searchButton = formElement.querySelector('.searchBar');
const infoList = document.getElementById('infoList');

search.addEventListener('click', (event) => {
  event.preventDefault();
  resetInfoList();

  const APIKey = process.env.APIKey;
  const city = document.querySelector('.flex-grow').value;

  // const cityInput = document.querySelector('.flex-grow');
  // cityInput.addEventListener('input', () => {
  //   if (cityInput.value === '') {
  //   searchButton.disabled = true;
  //   } else {
  //     searchButton.disabled = false;
  //   }
  // });

  if (city === '') {
    return;
  }

  // docs: https://www.weatherapi.com/docs/

  fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&alerts=no&tides=no`)
    .then(response => response.json())
    .then(json => {

      if (json.error) {
        console.log(`Error: ${json.error.message} - ${json.error.code}`);
        
        if (json.error.code === 1006) {
          const error_listItem = document.createElement('li');
          error_listItem.textContent = `Couldn't find weather for ${city}.`;
          infoList.appendChild(error_listItem);
        }
        return;
      }

      const liItems = [`City: ${json.location.name} (${json.location.country})`, `Temperature: ${Math.round(json.current.temp_c)}°C (${Math.round(json.current.temp_f)}°F)`, `Feels Like: ${Math.round(json.current.feelslike_c)}°C (${Math.round(json.current.feelslike_f)}°F)`, `Humidity: ${json.current.humidity}%`, `Wind: ${Math.round(json.current.wind_kph)} km/h`, `Condition: ${json.current.condition.text}`];

      for (let i = 0; i < liItems.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = liItems[i];
        infoList.appendChild(listItem);
      }

      const image = document.getElementById('weather_img');
      image.setAttribute("src", json.current.condition.icon); // this dont worky
      image.alt = json.current.condition.text;
      infoList.appendChild(image);
      
    })
    .catch(error => {
      console.log('Error:', error);
    });
});

function resetInfoList() {
  infoList.innerHTML = '';
}
