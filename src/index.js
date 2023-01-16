let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  grabToys()
});

document.querySelector('.add-toy-form').addEventListener('submit', handleToy)

function renderToy(toy){
  let card = document.createElement('li')
  card.className = 'card'
  card.innerHTML = `
  <h2>${toy.name}</h2>
  <img src ="${toy.image}" class="toy-avatar"/>
  <p class="likes">${toy.likes} Likes</p>
  <button class="like-btn" id="${toy.id}">Like ❤️</button>`

  card.querySelector('.like-btn').addEventListener('click', () => {
    toy.likes += 1
    card.querySelector('.likes').textContent = `${toy.likes} Likes`
    fetch(`http://localhost:3000/toys/${toy.id}`,{
    method:'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
    })
  })

  document.querySelector("#toy-collection").appendChild(card)
}

function grabToys(){
  fetch("http://localhost:3000/toys/")
  .then (res => res.json())
  .then (data => data.forEach(toy => renderToy(toy)))
}

function handleToy(e){
  e.preventDefault()
  let t = e.target
  let toy = {
    name: t.name.value,
    image: t.image.value,
    likes: 0
  }
  renderToy(toy)
  fetch("http://localhost:3000/toys/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(toy)
  })
}