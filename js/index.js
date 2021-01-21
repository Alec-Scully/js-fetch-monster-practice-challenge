let monsters = []
BASE_URL = "http://localhost:3000/monsters/"
OLD_URL = "http://localhost:3000/monsters/?_limit=50&_page=1"
let page = 1

document.addEventListener('DOMContentLoaded', () => {
    getMonsters()
    makeForm()
    handleForm()
})

const getMonsters = () => {
    fetch(BASE_URL + "?_limit=50&_page=1")
    .then(res => res.json())
    .then(monsterData => monsterData.forEach(renderMonsters))

    let leftButton = document.querySelector("#back")
    let rightButton = document.querySelector("#forward")

    leftButton.addEventListener('click', () => pageChange("left"))
    rightButton.addEventListener('click', () => pageChange("right"))

}

const renderMonsters = (monster) => {
    let monsterZone = document.querySelector('#monster-container')

    let monsterName = document.createElement('h2')
        monsterName.innerText = monster.name

    let monsterAge = document.createElement('h4')
        monsterAge.innerText = "Age: " + monster.age

    let monsterDesc = document.createElement('p')
        monsterDesc.innerText = "Bio: " + monster.description

        monsterZone.append(monsterName, monsterAge, monsterDesc)
}

const pageChange = (direction) => {
    document.querySelector('#monster-container').innerHTML = ""
    let oldUrl = OLD_URL.split("")
    currentPage = parseInt(oldUrl[oldUrl.length - 1])

    if (direction == "left"){
        if (currentPage == 1) {
            alert("There are no monsters here!")
        } else {
            currentPage = currentPage - 1
        }
    } else if (direction == "right") {
        currentPage = currentPage + 1
    }
    oldUrl[oldUrl.length - 1] = currentPage
    newUrl = oldUrl.join("")
    OLD_URL = newUrl
    
    console.log(newUrl)

    fetch(newUrl)
    .then(res => res.json())
    .then(monsterData => monsterData.forEach(renderMonsters))
}

const makeForm = () => {
    formArea = document.querySelector("#create-monster")
    const form = document.createElement("form")

    const name = document.createElement("input")
        name.setAttribute("type", "text")
        name.setAttribute("name", "name")
        name.setAttribute("placeholder", "name...")

    const age = document.createElement("input")
        age.setAttribute("type", "number")
        age.setAttribute("name", "age")
        age.setAttribute("placeholder", "age...")

    const description = document.createElement("input")
        description.setAttribute("type", "text")
        description.setAttribute("name", "description")
        description.setAttribute("placeholder", "description...")

    const submit = document.createElement("input")
        submit.setAttribute("type", "submit")
        submit.setAttribute("value", "Create")

    form.append(name, age, description, submit)
    formArea.appendChild(form)
}

const handleForm = () => {
    const monsterForm = document.querySelector('form')
    monsterForm.addEventListener('submit', (event) => {
        event.preventDefault()
        let newMonster = {
            name: event.target.name.value,
            age: event.target.age.value,
            description: event.target.description.value
        }

        let reqPackage = {}
            reqPackage.headers = {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
            reqPackage.method = "POST"
            reqPackage.body = JSON.stringify(newMonster)

        fetch(BASE_URL, reqPackage)
            .then(res => res.json())
            .then(renderMonsters)

        monsterForm.reset()
    })
}