// spinner
const loadingSpinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};

// search box value
const searchPhone = () => {
  const inputText = document.getElementById("search-box");
  const inputValue = inputText.value;
  const error = document.getElementById("error");
  loadingSpinner("block");
  if (inputValue == "") {
    error.style.display = "block";
    loadingSpinner("none");
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayPhones(data.data));

    error.style.display = "none";
    loadingSpinner("none");
  }
};

// display less than or equal to 20 phones as list
const displayPhones = (data) => {
  const phoneList = document.getElementById("phone-list");
  phoneList.textContent = ""; // clearing previous result
  //   empty string error handling
  if (data.length == 0) {
    error.style.display = "block";
  } else {
    const phoneResults = data.slice(0, 20);
    phoneResults.forEach((phone) => {
      console.log(phone);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
    <div class="card">
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text">Brand: ${phone.brand}</p>
      <a href="#phone-details"><button onclick="details('${phone.slug}')"class="rounded btn-primary">Click for Details</button></a>
    </div>
  </div>
    `;
      phoneList.appendChild(div);
    });
  }
};

// get phone details
const details = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => phoneDetails(data.data));
};

// display phone details
const phoneDetails = (data) => {
  const phoneData = document.getElementById("phone-details");
  phoneData.textContent = "";
  console.log(data);

  const div = document.createElement("div");

  div.classList.add("col");
  div.innerHTML = `
      <div class="card">
      <img src="${data.image}" class="card-img-top" alt="...">
      <div class="card-body">
         <div>
         <h5 class="card-title">${data.name}</h5>
              <h4 class="fw-bold">Main Features:</h4>
              <p class="card-text"><span class="fw-bold">Storage:</span> ${data.mainFeatures.storage}</p>
              <p class="card-text"><span class="fw-bold">Display:</span> ${data.mainFeatures.displaySize}</p>
              <p class="card-text"><span class="fw-bold">Chip set:</span> ${data.mainFeatures.chipSet}</p>
              <p class="card-text"><span class="fw-bold">Memory:</span> ${data.mainFeatures.memory}</p>
              <p class="card-text"><span class="fw-bold">Sensor:</span> ${data.mainFeatures.sensors}</p>
         </div>
         <div>
             <p class="card-text"><span class="fw-bold">Release Date:</span> ${data.releaseDate}</p>
         </div>
         <div>
              <h4 class="fw-bold">Others:</h4>
              <p class="card-text"><span class="fw-bold">WLAN:</span> ${data.others.WLAN}</p>
              <p class="card-text"><span class="fw-bold">Bluetooth:</span> ${data.others.Bluetooth}</p>
              <p class="card-text"><span class="fw-bold">GPS:</span> ${data.others.GPS}</p>
              <p class="card-text"><span class="fw-bold">NFC:</span> ${data.others.NFC}</p>
              <p class="card-text"><span class="fw-bold">Radio:</span> ${data.others.Radio}</p>
              <p class="card-text"><span class="fw-bold">USB:</span> ${data.others.USB}</p>
         </div>
      </div>
  </div>
      `;
  phoneData.appendChild(div);
};
