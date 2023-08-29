const loadPhone = async (SearchText) => {
const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${SearchText}`);

const data = await res.json();
const phones = data.data;
// console.log(phones);
displayPhones(phones);

}


const displayPhones = EachPhones => {

  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.textContent = '';

  const showAll = document.getElementById('show-all-container');
  if (EachPhones.length > 12) {
    showAll.classList.remove('hidden')
  }
  else{
    showAll.classList.add('hidden')
  }
  
EachPhones = EachPhones.slice(0,12);

EachPhones.forEach(EachPhone =>{
    // console.log(EachPhone);

    // create a Div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card w-96 bg-base-100 shadow-xl`

    phoneCard.innerHTML = `
    <figure>
    <img src="${EachPhone.image}" />
    </figure>
                    <div class="card-body">
                      <h2 class="card-title">
                        ${EachPhone.phone_name}
                        <div class="badge badge-secondary">NEW</div>
                      </h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-end">
                        <div onclick="handleShowPhoneDetails('${EachPhone.slug}')" class="badge badge-outline">Show Details</div> 
                        <div class="badge badge-outline">Products</div>
                      </div>
                    </div>
    
    `;
    phoneContainer.appendChild(phoneCard);

})

// hide loading
toggleLoadingSpinner(false);


}


const handleSearch = () =>{

  toggleLoadingSpinner(true);

  const SearchField = document.getElementById('search-field');
  const SearchText = SearchField.value;
  
  loadPhone(SearchText); 
}

const handleShowPhoneDetails = async (id) => {
  console.log('clicked',id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phoneDetails = data.data;
  showPhoneDetails(phoneDetails)
}


 const showPhoneDetails = (phoneDetails) =>{
  console.log(phoneDetails);

  const phoneName = document.getElementById('phone-name');
  phoneName.innerText = phoneDetails.name;
  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img class="justify-center p-8" src="${phoneDetails.image}" alt="">
  <p><span class="font-bold">Storage :</span> ${phoneDetails.mainFeatures.storage} </p>
  <p><span class="font-bold">Display Size :</span> ${phoneDetails.mainFeatures.displaySize} </p>

  <p><span class="font-bold">Memory :</span> ${phoneDetails.mainFeatures.memory} </p>
  <p><span class="font-bold">Release Date :</span> ${phoneDetails.releaseDate} </p>




  
  `


  show_details_modal.showModal();
 }

const toggleLoadingSpinner = (isLoading) => {
  const LoadingSpinner = document.getElementById('LoadingSpinner');
  if (isLoading) {

    LoadingSpinner.classList.remove('hidden')

  } else {

      LoadingSpinner.classList.add('hidden')

  }
}


