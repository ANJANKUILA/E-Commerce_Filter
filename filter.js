const data = [
    {
      id: 1,
      name: "Invicta Men's Pro Diver",
      img: "./img/jacket1.jpg",
      price: 74,
      cat: "Dress",
    },
    {
      id: 11,
      name: "Invicta Men's Pro Diver 2",
      img: "./img/jacket2.jpg",
      price: 74,
      cat: "Dress",
    },
    {
      id: 2,
      name: "Timex Men's Expedition Scout ",
      img: "./img/sport2.jpg",
      price: 40,
      cat: "Sport",
    },
    {
      id: 3,
      name: "Breitling Superocean Heritage",
      img: "./img/luxuary1.jpg",
      price: 200,
      cat: "Luxury",
    },
    {
      id: 4,
      name: "Casio Classic Resin Strap ",
      img: "./img/sport3.jpg",
      price: 16,
      cat: "Sport",
    },
    {
      id: 5,
      name: "Garmin Venu Smartwatch ",
      img: "./img/casual1.jpg",
      price: 74,
      cat: "Casual",
    },
  ];

  const productsContainer = document.querySelector(".products");
  const searchInput = document.querySelector(".search");
  const categoriesContainer = document.querySelector(".cats");
  const priceRange = document.querySelector(".priceRange");
  const priceValue = document.querySelector(".priceValue");

const displayProducts = (filteredProducts)=>{
    productsContainer.innerHTML =filteredProducts.map((value)=>
    `<div class="product">
            <img src="${value.img}" alt="jacket">
            <span class="name">${value.name}</span>
            <span class="priceText">${value.price}</span>
    </div>`
    ).join("");
}

displayProducts(data);

searchInput.addEventListener("keyup",(e)=>{
  const val = e.target.value.toLowerCase();//. It logs the current value of the input element
  // (i.e., the text that the user has typed) to the console 
  //using console.log(e.target.value).
  if(val){
    displayProducts(data.filter(item=>
      item.name.toLowerCase().indexOf(val) !== -1
      
      // if -1 will be true then filter function will return nothing an d in this case
      // data will be stay as it was....
    ));
  }else{
    displayProducts(data);
  }

})

const setCatagories =()=>{
  const allcats = data.map((item)=>item.cat) // return only cat property value
  //const allcats = data.filter((item)=>item.cat) // return all objects that contain cat property
  // now you have to remove duplicates from allcats....
  const set1 = new Set(allcats);
  const categories =[...set1]; // converting set to array....
//   const categories =["All", ...allcats.filter((item,index)=>{
//       return allcats.indexOf(item) === index;// return true or false from ===
//       //The filter method collects all the elements
//       // for which the callback function returns true into a new array (categories).
//   })
// ]
  categories.unshift("All");

  categoriesContainer.innerHTML = categories.map(value=>
    `<span class="cat">${value}</span>`
    ).join("");

    categoriesContainer.addEventListener("click", (e) => {
      const selectedCat = e.target.textContent;
  
      selectedCat === "All" ? displayProducts(data)
        : displayProducts(data.filter((item) => item.cat === selectedCat));
    });


    

}
const setPrices =()=>{
  const priceList =data.map(value=>
      value.price
  )
  const minPrice = Math.min(...priceList); //min(1,2,3)takes data like this not array
  const maxPrice = Math.max(...priceList); //min(1,2,3)takes data like this not array

  priceRange.min = minPrice;// setting the min property of the priceRange
  priceRange.max = maxPrice;// this line sets the max property of the priceRange
  priceRange.value = maxPrice;//This line sets the initial value of the range input to maxPrice
  priceValue.textContent = "$" + maxPrice;

  priceRange.addEventListener("input",(e)=>{
      priceValue.textContent = '$'+ e.target.value
      displayProducts(data.filter((item) => item.price <= e.target.value));
  })

}
 setCatagories();
setPrices();
