let btn = document.getElementById("start")
let timer;
btn.addEventListener("click", function () {
    timer = setInterval(() => {
        document.getElementById("seconds").innerHTML = parseInt(document.getElementById("seconds").innerHTML) + 1
    }, 1000)
    swal({
        title: "Please Enter Your Name",
        content: {
            element: "input",
            attributes: {
                placeholder: "Your Name",
                type: "text",
            },
        },
        buttons: {
            confirm: {
                text: "OK",
                value: true,
                visible: true,
                className: "",
                closeModal: true,
            },
        },

    }

    )
        .then(function (value) {
            console.log("Entered value:", value);
            document.getElementById("gamer").innerHTML = value
            document.querySelector(".bg-start").remove()
        })

})


let blocksContainer = document.querySelector(".game-board")
let blocks = Array.from(blocksContainer.children)
let orderRange = [...Array(blocks.length).keys()]

for (let i = orderRange.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [orderRange[i], orderRange[j]] = [orderRange[j], orderRange[i]];
}

// Here is an example to shuffle an array
// let array = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
// let index = [...array.keys()]
// // console.log(index)
// const shuffle = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]]; // Swap elements at indices i and j
//     }
//     return array;
// }
// console.log(shuffle(array))
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener("click", () => {
        flipped(block)
    })
})


function flipped(selectedBlock) {
    selectedBlock.classList.add("is-flipped")
    let allFlippedBlocks = blocks.filter(isFlipped => isFlipped.classList.contains("is-flipped"))
    if (allFlippedBlocks.length === 2) {
        console.log("greater than 2")
        // blocks.children.classList.remove("is-flipped")
        stopClicking()
        matchedCards(allFlippedBlocks[0], allFlippedBlocks[1])
        end()
    }
}

function end() {

    if (blocks.every(block => block.classList.contains("has-match"))) {

        let end = document.querySelector(".end")
        let againBtn = document.getElementById("again")

        againBtn.addEventListener("click", () => {
            location.reload()
        })
        end.style.visibility = "visible"



    }
}

function stopClicking() {
    blocksContainer.classList.add("stop-clicking")
    setTimeout(() => {
        blocksContainer.classList.remove("stop-clicking")

    }, 1000)
}

function matchedCards(firstCard, secondCard) {
    let tries = document.getElementById("tries")
    let score = document.getElementById("score")

    if (firstCard.dataset.img === secondCard.dataset.img) {
        firstCard.classList.remove("is-flipped")
        secondCard.classList.remove("is-flipped")

        firstCard.classList.add("has-match")
        secondCard.classList.add("has-match")

        score.innerHTML = parseInt(score.innerHTML) + 10

        document.getElementById("right").play()

    } else {
        setTimeout(() => {
            firstCard.classList.remove("is-flipped")
            secondCard.classList.remove("is-flipped")
        }, 1000)
        tries.innerHTML = parseInt(tries.innerHTML) + 1
        document.getElementById("false").play()
    }
}
