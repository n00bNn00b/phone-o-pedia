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
