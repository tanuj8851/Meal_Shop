const categoriesURL = "https://www.themealdb.com/api/json/v1/1/categories.php"
const mealsURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
const container = document.getElementById("meals");
const searchBtn= document.getElementById("searchBtn");

searchBtn.addEventListener("click",(e)=>{
    const searchInput= document.getElementById("searchInput").value;
    console.log(searchInput)
})


function renderMeals(data) {
    container.innerHTML = "";

    data.forEach((e) => {
        const card = document.createElement("div");
        card.classList.add("card");


        const name = document.createElement("h3")
        name.innerText =`Meal:- ${e.strMeal}` ;


        const image = document.createElement("img");
        image.setAttribute("src", e.strMealThumb);

        card.append(image, name);

        container.append(card);
    })
}


const fetchCategories = async (categoriesURL) => {

    try {
        const response = await fetch(categoriesURL);
        const categoriesData = await response.json();
        const data = categoriesData.categories;
        console.log(data)
        const tagContainer = document.getElementById("categories");

        data.forEach(tag => {
            const button = document.createElement('button');
            button.textContent = `${tag.strCategory}`;

            button.addEventListener("click", (e) => {
                const fetchMeals = async () => {
                    try {
                        const response = await fetch(`${mealsURL}${tag.strCategory}`)
                        const mealData = await response.json();

                        // console.log(mealData.meals)
                        let meals = mealData.meals;
                        renderMeals(meals);

                    } catch (error) {
                        console.log(error)
                    }
                }

                // console.log(e.target.value)

                fetchMeals();
            })

            tagContainer.appendChild(button);
        });

    } catch (error) {
        console.log(error);
    }


}








fetchCategories(categoriesURL);