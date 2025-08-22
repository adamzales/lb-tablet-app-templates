let indicatorVisible = true
let backgroundColor = "#ffffff"

const actions = [
    {
        id: "gun",
        action: () => {
            
        }
    },
    {
        id: "drug",
        action: () => {
            
        }
    },{
        id: "heist",
        action: () => {
            document.body.innerHTML = "<h1>Nový obsah stránky</h1><p>Toto je úplně nová stránka.</p>";
        }
    },
]

for (const action of actions) {
    document.querySelector(`#${action.id}`).addEventListener("click", action.action)
}

globalThis.useNuiEvent("updateDirection", (direction) => {
    document.querySelector("#direction").innerText = direction
})
