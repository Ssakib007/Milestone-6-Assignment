// handle category
const categoryList = document.getElementById("category-list");
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

const displayCategory = (categories) => {
  categories.forEach((cat) => {
    categoryList.innerHTML += `
            <li id="${cat.id}" class="p-2 cursor-pointer hover:bg-green-800 hover:text-white">${cat.category_name}</li>
        `;
  });
};
