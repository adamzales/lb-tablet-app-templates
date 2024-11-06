let indicatorVisible = true

const actions = [
    {
        id: "popup",
        action: () => {
            globalThis.setPopUp({
                title: "Title",
                description: "Description",
                buttons: [
                    {
                        title: "Confirm",
                        cb: () => {
                            console.log("!")
                        }
                    },
                    {
                        title: "Cancel",
                        color: "red",
                        cb: () => {
                            console.log("Cancel")
                        }
                    }
                ]
            })
        }
    },
    {
        id: "contextmenu",
        action: () => {
            globalThis.setContextMenu({
                title: "Menu Title",
                buttons: [
                    {
                        title: "Item 1",
                        cb: () => {
                            console.log("Item 1")
                        }
                    },
                    {
                        title: "Item 2",
                        color: "red",
                        cb: () => {
                            console.log("Item 2")
                        }
                    }
                ]
            })
        }
    },
    {
        id: "photo",
        action: () => {
            globalThis.setGallery({
                onSelect: (data) => {
                    globalThis.setFullScreenImage({
                        image: data.src,
                        display: true
                    })
                }
            })
        }
    },
    {
        id: "indicator",
        action: (e) => {
            indicatorVisible = !indicatorVisible
            globalThis.setIndicatorVisible(indicatorVisible)
            e.target.innerText = indicatorVisible ? "Hide Indicator" : "Show Indicator"
        }
    },
    {
        id: "color",
        action: () => {
            globalThis.setColorPicker({
                onSelect: (color) => {
                    document.body.style.backgroundColor = color
                }
            })
        }
    }
]

for (const action of actions) {
    document.querySelector(`#${action.id}`).addEventListener("click", action.action)
}
