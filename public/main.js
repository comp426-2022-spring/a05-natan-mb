// Focus div based on nav button click


// Flip one coin and show coin image to match result when button clicked

focusDiv("home")

function focusDiv(div) {
    divs = ["home", "single", "multi", "guess"]

    divs.forEach(element => {
        if (element != div) {
            // document.getElementById(element).setAttribute("class", "hidden")
            document.getElementById(element).style.display = "none";
        }   else {
            //document.getElementById(element).setAttribute("class", "visible")
            document.getElementById(element).style.display = "block";
        }
    });
}

console.log('inside main.js')

const coin = document.getElementById("singlenav")

coin.addEventListener("click", flipCoin)

async function flipCoin(event) {
    event.preventDefault();
				
    const endpoint = "app/flip/"
    const url = document.baseURI+endpoint

    try {
        const flip = await getFlip(url);

        console.log(flip);
        document.getElementById("flipResult").innerHTML = flip.flip;
        document.getElementById("quarter").setAttribute("src", `./assets/img/${flip.flip}.png`)

        focusDiv("single")
    } catch (error) {
        console.log(error);
    }
}


async function getFlip(url) {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    };

    const response = await fetch(url, options);
    return response.json()
}



const coins = document.getElementById("multinav")
coins.addEventListener("click", function() {
    focusDiv("multi")
})

document.getElementById("coins").addEventListener("submit", flipCoins)

async function flipCoins(event) {
    event.preventDefault();
    
    const endpoint = "app/flips/coins/"
    const url = document.baseURI+endpoint

    const formEvent = event.currentTarget

    try {
        const formData = new FormData(formEvent);

        const flips = await sendFlips({ url, formData });

        document.getElementById("heads").innerHTML = "Heads: "+flips.summary.heads;
        document.getElementById("tails").innerHTML = "Tails: "+flips.summary.tails;

        focusDiv("multi")
    } catch (error) {
        console.log(error);
    }
}

// Create a data sender
async function sendFlips({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(plainFormData);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJson
    };

    const response = await fetch(url, options);

    return response.json()
}




document.getElementById("guessnav").addEventListener("click", function() {
    console.log("guess clicked")
    focusDiv("guess")
})

document.getElementById("coins").addEventListener("submit", guessFlip)
// .addEventListener("submit", function(event) {
//     event.preventDefault();
// 
//     const formEvent = event.currentTarget
//     const formData = new FormData(formEvent);
//     
//     const plainFormData = Object.fromEntries(formData.entries());
//     const formDataJson = JSON.stringify(plainFormData);
// 
//     console.log(formDataJson)
// })

let btnHeads = document.getElementById("btnHeads")
let btnTails = document.getElementById("btnTails")

btnHeads.addEventListener('click', (event) => {
    event.preventDefault();
    guessFlip(event, "heads")
})

btnTails.addEventListener('click', (event) => {
    event.preventDefault();
    guessFlip(event, "tails")
})


async function guessFlip(event, call) {
    // var call = ""

    console.log("call:", call)

    const endpoint = "app/flip/call/"
    const url = document.baseURI+endpoint

    // const formEvent = event.currentTarget

    try {
        // const formData = new FormData(formEvent);
        let data = {guess: call}

        const flip = await sendFlips({ url, data });

        document.getElementById("yourGuess").innerHTML = "You Guessed: " + call;
        document.getElementById("actual").innerHTML = "You got: " + flip.flip;
        document.getElementById("guessResult").innerHTML = "You " + (call == flip.flip ? "Win" : "Lose") + "!"

        focusDiv("guess")
    } catch (error) {
        console.log(error);
    }
}

// Create a data sender
async function sendFlips({ url, data }) {
    // const plainFormData = Object.fromEntries(formData.entries());
    // const formDataJson = JSON.stringify(plainFormData);
    // console.log("formDataJson:", formDataJson);

    console.log('data', data)
    console.log ('data string', JSON.stringify(data))
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    };

    const response = await fetch(url, options);

    return response.json()
}

