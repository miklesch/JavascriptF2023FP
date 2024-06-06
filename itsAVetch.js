// Getting the data: loading two json files with 
//the objects goodneighbours and badneighbours

let goodneighbours = window.goodneighbours;
let badneighbours = window.badneighbours;
let keysOfGoodneigbours = Object.keys(goodneighbours);
let keysOfBadneigbours = Object.keys(badneighbours);
keysOfGoodneigbours = keysOfGoodneigbours.sort();
keysOfBadneigbours = keysOfBadneigbours.sort();
let keysAllVegUnsorted = keysOfGoodneigbours.concat(keysOfBadneigbours);
let keysAllVegSorted = keysAllVegUnsorted.sort();
let keysWithoutDuplicates = [];

// removing duplicates of keys and values

function removeDuplicates(data) {
    data.forEach((value) => {
        if (!keysWithoutDuplicates.includes(value)) {
            keysWithoutDuplicates.push(value)
        }
    })
}
removeDuplicates(keysAllVegSorted);

// putting vegetable names as keys to dropdown menus

function createDropdown(elementId) {
    let dropdown = document.getElementById(elementId);
    let options = keysWithoutDuplicates;
    for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let ele = document.createElement("option");
        ele.textContent = opt;
        ele.value = opt;
        dropdown.appendChild(ele);
    }
}
createDropdown("selectVegetable1");
createDropdown("selectVegetable2");
createDropdown("selectVegetable3");

// check if the three vegetables are good or bad neighbours,
// getting return statements

function isTribleCompatible(veg1, veg2, veg3) {

    let comparisonAB = isPairCompatible(veg1, veg2);
    let comparisonBC = isPairCompatible(veg2, veg3);
    let comparisonAC = isPairCompatible(veg1, veg3);

    let comparisonAB2 = isPairNotCompatible(veg1, veg2);
    let comparisonBC2 = isPairNotCompatible(veg2, veg3);
    let comparisonAC2 = isPairNotCompatible(veg1, veg3);
    /**
    console.log(comparisonAB);
    console.log(comparisonBC);
    console.log(comparisonAC);

    console.log(comparisonAB2);
    console.log(comparisonBC2);
    console.log(comparisonAC2);
    **/
    return {
        comparisonAB: comparisonAB,
        comparisonBC: comparisonBC,
        comparisonAC: comparisonAC,

        comparisonAB2: comparisonAB2,
        comparisonBC2: comparisonBC2,
        comparisonAC2: comparisonAC2,
    }
}
// checking if veg A is good neighbour of veg B and vice versa,
// if veg B is a value in veg A (key) goodneighbours 

function isPairCompatible(a, b) {
    x = goodneighbours[a];
    y = goodneighbours[b];

    if (((a in goodneighbours) && (x.includes(b))) ||
        ((b in goodneighbours) && (y.includes(a)))) {
        return true;
    }
    else {
        return false;
    }
}
// checking if a pair of vetables are bad neighbours

function isPairNotCompatible(a, b) {
    x = badneighbours[a];
    y = badneighbours[b];

    if (((a in badneighbours) && (x.includes(b))) ||
        ((b in badneighbours) && (y.includes(a)))) {
        return true;
    }
    else {
        return false;
    }
}

// showing selected vegetables
// output the result of comparison

function comparisonResults() {
    let veg1 = document.getElementById("veg1Div");
    veg1 = selectVegetable1.value;
    let veg2 = document.getElementById("veg2Div");
    veg2 = selectVegetable2.value;
    let veg3 = document.getElementById("veg3Div");
    veg3 = selectVegetable3.value;

    /* let userInputResult = document.getElementById("userInputResult");
    if ((veg1==="" && veg2==="") || (veg1==="" && veg3==="") || (veg2==="" && veg3==="")) {
        userInputResult.textContent = "Please select two or more vegetables for comparison."
        return
    }
    userInputResult.textContent = "You choosed: " + veg1 + ", " + veg2 + " and " + veg3 + "."; */


    let userInputResult = document.getElementById("userInputResult");
    if ((veg1 === "" && veg2 === "") || (veg1 === "" && veg3 === "") || (veg2 === "" && veg3 === "")) {
        userInputResult.textContent = "Please select two or more vegetables to compare."
        return
    }
    else if ((veg1 !== "" && veg2 !== "") && (veg1 !== "" && veg3 !== "") && (veg2 !== "" && veg3 !== "")) {
    userInputResult.textContent = "You choosed: " + veg1 + ", " + veg2 + " and " + veg3 + ".";
    }
    
    else if ((veg1 !== "" && veg2 !== "") && (veg1 !== "" && veg3 === "") && (veg2 !== "" && veg3 === "")) {
        userInputResult.textContent = "You have chosen: " + veg1 + " and " + veg2 + ".";
    
    }



    let result = isTribleCompatible(veg1, veg2, veg3);
    // for goodneighbourship
    let resultAB = result.comparisonAB;
    let resultBC = result.comparisonBC;
    let resultAC = result.comparisonAC;
    // for badneighbourship
    let resultAB2 = result.comparisonAB2;
    let resultBC2 = result.comparisonBC2;
    let resultAC2 = result.comparisonAC2;

    // three vegetables fitting together, sometimes with specific arrangement

    if ((resultAB == true) && (resultBC == true) &&
        (resultAC == true)) {
        let fittingTogetherResultDiv = document.getElementById("fittingTogetherResult");
        fittingTogetherResultDiv.textContent = "It`s a match! They fit together";
    }
    else if ((resultAB == true) && (resultBC == false) &&
        (resultAC == true)) {
        let fittingTogetherResultDiv = document.getElementById("fittingTogetherResult");
        fittingTogetherResultDiv.textContent = "It works if " + veg1 + " is placed in the middle";
    }
    else if ((resultAB == false) && (resultBC == true) &&
        (resultAC == true)) {
        let fittingTogetherResultDiv = document.getElementById("fittingTogetherResult");
        fittingTogetherResultDiv.textContent = "It works if " + veg3 + " is placed in the middle";
    }
    else if ((resultAB == true) && (resultBC == true) &&
        (resultAC == false)) {
        let fittingTogetherResultDiv = document.getElementById("fittingTogetherResult");
        fittingTogetherResultDiv.textContent = "It works if " + veg2 + " is placed in the middle";

    // only one pair fits together

    else if ((resultAB == true) && (resultBC == false) &&
        (resultAC == false)) {
        let fittingTogetherResultDiv = document.getElementById("fittingTogetherResult");
        fittingTogetherResultDiv.textContent = "You can put " + veg1 + " & " + veg2 + " together. But " + veg3 + " doesn`t work!";
    }
    else if ((resultAB == false) && (resultBC == true) &&
        (resultAC == false)) {
        let fittingTogetherResultDiv = document.getElementById("fittingTogetherResult");
        fittingTogetherResultDiv.textContent = "You can put " + veg2 + " & " + veg3 + " together. But " + veg1 + " doesn`t work!";
    }
    else if ((resultAB == false) && (resultBC == false) &&
        (resultAC == true)) {
        let fittingTogetherResultDiv = document.getElementById("fittingTogetherResult");
        fittingTogetherResultDiv.textContent = "You can put " + veg1 + " & " + veg3 + " together. But " + veg2 + " doesn`t work!";
    }

    // the vegetables are badneighbours or only two of the choosen fitting together

    else if ((resultAB2 == true) && (resultBC2 == true) &&
        (resultAC2 == true)) {
        let fittingTogetherResultDiv = document.getElementById("fittingTogetherResult");
        fittingTogetherResultDiv.textContent = "Absolutly not! They don't like each other at all!";
    }
    else if ((resultAB2 == true) && (resultBC2 == false) &&
        (resultAC2 == true)) {
        let fittingTogetherResultDiv = document.getElementById("fittingTogetherResult");
        fittingTogetherResultDiv.textContent = "It works for " + veg2 + veg3 + " . " +
            veg1 + " doesn't like the others.";
    }
    else if ((resultAB2 == false) && (resultBC2 == true) &&
        (resultAC2 == true)) {
        let fittingTogetherResultDiv = document.getElementById("fittingTogetherResult");
        fittingTogetherResultDiv.textContent = "It works for " + veg1 + veg2 + " . " +
            veg3 + " doesn't like the others.";
    }
    else if ((resultAB2 == true) && (resultBC2 == true) &&
        (resultAC2 == false)) {
        let fittingTogetherResultDiv = document.getElementById("fittingTogetherResult");
        fittingTogetherResultDiv.textContent = "It works for " + veg1 + veg3 + " . " +
            veg2 + " doesn't like the others.";
    }
    else {
        let fittingTogetherResultDiv = document.getElementById("fittingTogetherResult");
        fittingTogetherResultDiv.textContent = "They are neither good nor bad neighbours. You can put them together, but they will not benefit from each other";
    }
}
// fetching data: getting images of vegetables by choosen items in the dropdown menu

async function showImagesOnChoice(userInput, vegDiv, imgDiv) {
    let x = document.getElementById(vegDiv);
    x = userInput.value;

    if (userInput === "") {
        userInput = "basket"
    }
    let url = "https://pixabay.com/api/?key=41130349-cf93a96d889636f62511253e8&q=" + userInput + "&image_type=photo";
    let response = await fetch(url);
    let data = await response.json();
    let y = document.getElementById(imgDiv);
    y.src = data.hits[0].largeImageURL;
}
