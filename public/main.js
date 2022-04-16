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

async function guessFlip(event) {
    event.preventDefault();
    var call = ""

    if (isset($_POST["btnHeads"])) {
        call = "heads"
    } else if (isset($_POST["btnTails"])) {
        call = "tails"
    }

    console.log("call:", call)

    const endpoint = "app/flip/call/"
    const url = document.baseURI+endpoint

    const formEvent = event.currentTarget

    try {
        const formData = new FormData(formEvent);

        const flip = await sendFlips({ url, formData });

        document.getElementById("yourGuess").innerHTML = "sOMETHING";
        document.getElementById("actual").innerHTML = flip.flip;

        focusDiv("guess")
    } catch (error) {
        console.log(error);
    }
}

// Create a data sender
async function sendFlips({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(plainFormData);
    console.log("formDataJson:", formDataJson);

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

