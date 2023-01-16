function renderToy(toy){
    let card = document.createElement('li')
    card.className = 'card'
    card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src ="${toy.imageUrl}" class="toy-avatar"/>
    <p>${likes} Likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>`
    document.querySelector("#toy-collection").appendChild(card)
}

function grabToys(){
    fetch("localhost:3000/toys")
    .then (res => res.json())
    .then (data => console.log(data))
}

function initialize(){
    grabToys()
    console.log("yes")
}
initialize()
console.log("yes")