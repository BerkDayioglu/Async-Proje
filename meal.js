let dizi = [];

fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Hata");
    }

    return res.json();
  })

  .then((data) => {
    dizi = data;
    ekrandaGoster(dizi.meals);
  })
  .catch((error) => alert(error));

const ekrandaGoster = (data) => {
  const mealsDiv = document.querySelector(".food");

  mealsDiv.innerHTML = "";

  data.forEach((element) => {
    mealsDiv.innerHTML += `
    <div class="col-sm-6 col-md-4 col-lg-3">
    <img src=${element.strMealThumb} width="250px" alt=""  />
    <p>${element.strMeal}</p>
    </div>
    `;
  });
};

// ÜLKELER

// const pictures = document.querySelectorAll("img")
// const newPictures = {...pictures}
// console.log(newPictures);
// console.log(pictures);

document.querySelectorAll("img").forEach(
  (a) =>
    (a.onclick = () => {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${a.id}`)
        .then((res) => res.json())
        .then((data) => ekrandaGoster(data.meals));
    })
);

document.querySelector("input").oninput = (e) => {
  let veri = dizi.meals.filter((a) =>
    a.strMeal.toLowerCase().includes(e.target.value.toLowerCase())
  );

  ekrandaGoster(veri);
};
