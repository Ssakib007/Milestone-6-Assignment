// handle category list

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((category) => {
      displayCategory(category.categories);
    })
    .catch((error) => {
      showError("category-list");
      console.log(error);
    });
};
loadCategory();

const categoryList = document.getElementById("category-list");
const displayCategory = (categories) => {
  categories.forEach((cat) => {
    categoryList.innerHTML += `
            <li id="${cat.id}" class="p-2 cursor-pointer hover:bg-green-800 hover:text-white">${cat.category_name}</li>
        `;
  });
};

// display all plants

const allCategory = document.getElementById("all-category");
const loadAllPlants = () => {
  allCategory.classList.add("bg-green-800", "text-white");
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      displayAllPlants(data.plants);
    })
    .catch((error) => {
      showError("tree-container");
      console.log(error);
    });
};

const loadByCatergoryPlants = (id) => {
  loader("tree-container");
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayAllPlants(data.plants);
    })
    .catch((error) => {
      showError("tree-container");
      console.log(error);
    });
};

const treeContainer = document.getElementById("tree-container");
const displayAllPlants = (allPlants) => {
  treeContainer.innerHTML = "";
  allPlants.forEach((plant) => {
    treeContainer.innerHTML += `
            <div id="plant-${
              plant.id
            }" class=" p-3 bg-white rounded-lg text-gray-800 h-max py-4 flex flex-col justify-between">
                    <div>
                        <figure class="w-full h-52">
                            <img class="h-full w-full rounded-lg" src="${
                              plant.image
                            }" alt="">
                        </figure>
                        <div class="mt-3">
                            <h4 onclick="displayDetailePlant('${
                              plant.id
                            }')" class="font-semibold cursor-pointer">${
      plant.name
    }</h4>
                            <p class="my-2 text-sm text-justify text-gray-500">${plant.description.slice(
                              0,
                              80
                            )}</p>
                        </div>
                    </div>
                    <div>
                           <div class="flex justify-between w-full mt-3 mb-4 font-semibold">
                                <span class="bg-green-100 px-3 py-1 rounded-full">${
                                  plant.category
                                }</span>
                                <span>
                                <i class="fa-solid fa-bangladeshi-taka-sign"></i>
                                <span>${plant.price}</span>
                                </span>
                             </div>
                             <button class="w-full py-3 font-medium text-white rounded-full bg-green-700 cursor-pointer">Add to
                            Cart</button>
                    </div>
                </div>
        `;
  });
};

// load all plants
allCategory.addEventListener("click", () => {
  for (let li of categoryList.children) {
    li.classList.remove("bg-green-800", "text-white");
  }
  loadAllPlants();
});

// load category plants
categoryList.addEventListener("click", (ss) => {
  if (ss.target.localName === "li") {
    allCategory.classList.remove("bg-green-800", "text-white");
    for (let li of categoryList.children) {
      li.classList.remove("bg-green-800", "text-white");
    }

    ss.target.classList.add("bg-green-800", "text-white");
    const catId = ss.target.id;
    loadByCatergoryPlants(catId);
  }
});

// added to cart
let cartArray = [];
treeContainer.addEventListener("click", (ss) => {
  if (ss.target.localName === "button") {
    let id = ss.target.parentNode.parentNode.id;
    let name =
      ss.target.parentNode.parentNode.children[0].children[1].children[0]
        .innerText;
    let price = Number(
      ss.target.parentNode.children[0].children[1].children[1].innerText
    );
    console.log(price);

    const isPresent = cartArray.find((obj) => id === obj.id);
    if (isPresent === undefined) {
      cartArray.push({
        id: id,
        name: name,
        price: price,
        quantity: 1,
        total: price,
      });
    } else {
      cartArray.forEach((obj) => {
        if (obj.id === id) {
          obj.quantity++;
          obj.total += price;
        }
      });
    }
    alert(`${name} is added to the cart successfully!`);
    displayAddToCartCards(cartArray);
  }
});

//  cart calculation
const cartSection = document.getElementById("cart-section");
const totalPriceSection = document.getElementById("total-price-section");
const displayAddToCartCards = (cartArray) => {
  totalPriceSection.innerHTML = "";
  let totalAmount = 0;
  cartSection.innerHTML = "";
  cartArray.forEach((cart) => {
    cartSection.innerHTML += `
        <div id="${cart.id}" class="flex gap-2 items-center justify-between p-3 bg-[#f0fdf4] rounded-lg">
                <div class="flex flex-col gap-1">
                    <h4 class="font-semibold">${cart.name}</h4>
                    <p class="text-gray-600"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${cart.price} x ${cart.quantity}</p>
                </div>
            <i onclick="deleteCart('${cart.id}')" class="fa-solid fa-xmark cursor-pointer"></i>
        </div>
    
    `;
    totalAmount += cart.total;
    totalPriceSection.innerHTML = `
             <h4>Total:</h4>
             <h4>৳${totalAmount}</h4>
        `;
  });
};

const deleteCart = (id) => {
  const filterCards = cartArray.filter((del) => del.id !== id);
  console.log(filterCards);

  cartArray = filterCards;
  displayAddToCartCards(cartArray);
};

//  loader
const loader = (id) => {
  const container = document.getElementById(id);
  container.innerHTML = `
        <div class="flex justify-center items-center">
             <span class="loading loading-spinner loading-xl"></span>
        </div>
    `;
};

// modal handler
const detailPlantContainer = document.getElementById("details-plant-container");
const displayDetailePlant = (id) => {
  loader("details-plant-container");
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((plantDetails) => {
      displayDetailsPlant(plantDetails.plants);
    })
    .catch((error) => {
      showError("details-plant-container");
      console.log(error);
    });

  detailsPlant.showModal();
};

const displayDetailsPlant = (plants) => {
  detailPlantContainer.innerHTML = `
        <div id="modalContainer" class="w-full">
                    <h2 class="text-3xl font-bold mb-4">${plants.name}</h2>
                    <img class="my-4 w-full h-96 rounded-lg" src="${plants.image}" alt="plant image">
                    <div class="flex flex-col gap-3 text-xl">
                        <p><b>Category: </b>${plants.category}</p>
                        <p><b>Price: </b><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>${plants.price}</span></span></p>
                        <p class="text-lg text-justify"><b>Description: </b>${plants.description}</p>
                    </div>
                </div>
    `;
};

const showError = (id) => {
  const container = document.getElementById(id);
  container.innerHTML = `
     <div class="h-[75vh] col-span-3 flex items-center justify-center text-red-600">Something went wrong</div>
    `;
};

// donation form
const formBtn = document.getElementById("form-btn");
formBtn.addEventListener("click", (ss) => {
  ss.preventDefault();
  ss.target.parentNode.children[0].value = "";
  ss.target.parentNode.children[1].value = "";
  ss.target.parentNode.children[2].value = "Number of Trees";
});

// other
loader("tree-container");
loadAllPlants();
