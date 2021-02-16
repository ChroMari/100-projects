/**
 * https://www.themealdb.com/api/json/v1/1/random.php - ссылка для получения рандомного рецепта
 * https://learn.javascript.ru/async-await- как работает fetch
 * https://www.youtube.com/embed/${meal.strYoutube.slice(-11)} - ссылка, чтобы получить видео с ютуба, о том, как готовить данное блюдо
 */

const headerBtn = document.querySelector('.header__btn');
const card = document.querySelector('.card');

headerBtn.addEventListener('click', () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(res => {
      viewRecipe(res.meals[0]);
	});
});


function viewRecipe (meal) {
  if (meal.strTags != null) {
    meal.strTags = meal.strTags.split(',').map(item => `<li>${item}</li>`).join(' ');
  } else {
    meal.strTags = '';
  }

  if (meal.strInstructions.length > 800) {
    meal.strInstructions = meal.strInstructions.substring(0, 800);
    meal.strInstructions = `${meal.strInstructions.substring(0, meal.strInstructions.lastIndexOf('.'))}. ...`;
  }

  card.innerHTML = `
    <img class="card__img" src="${meal.strMealThumb}" alt="Meal Image">
    <div class="card__info">
      <h4 class="info__title">${meal.strMeal}</h4>
      <ul class="info__category">${meal.strTags}</ul>
      <p class="info__text">${meal.strInstructions}</p>

      <div class="link">
        <a class="info__link" target="_block" href="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">Video: ${meal.strMeal}</a>
      </div>
    </div>
  `;

}
