// Test Data
let tripList = [
    {
        id:0,
        place: "Australia - 2019"
    },
    {
        id:1,
        place: "New York - 2020"
    },
    {
        id:2,
        place: "Greece - 2021"
    },
    {
        id:3,
        place: "Scotland - 2022"
    }
]

const arrayOfDivs = [

]

let tripEditId = null;




// Rendering Code - make divs to show each trip

window.addEventListener("load", () => {
    renderTripList();
})

const tripContainer = document.getElementById("trip-container");
let tripTextarea = document.getElementById("trip-textarea");

function renderTripList() {
    while(tripContainer.firstChild) { // emptying out the trip container
        tripContainer.removeChild(tripContainer.firstChild)
    }

    const arrayOfDivs = tripList.map(trip => renderTrip(trip))
    arrayOfDivs.forEach(div => tripContainer.append(div))
}

function renderTrip(tripData) {
    const div = document.createElement("div"); // creating a div
    div.classList.add("border");
    div.classList.add("p-3");
    div.classList.add("m-3");

    const p = document.createElement("p"); // creating a paragraph
    p.textContent = tripData.place;
    div.appendChild(p);

    const editButton = document.createElement("button"); // creating an Edit button
    editButton.classList.add("btn");
    editButton.classList.add("btn-primary");
    editButton.textContent = "Edit"
    editButton.addEventListener("click", () => onStartEdit(tripData.id))
    div.appendChild(editButton);

    const deleteButton = document.createElement("button"); // creating a Delete button
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.classList.add("ms-2");
    deleteButton.textContent = "X"
    deleteButton.addEventListener("click", () => onDelete(tripData.id))
    div.appendChild(deleteButton);

    return div;

}




// Data Updating Code

function onStartEdit(idToEdit) {
    tripEditId = idToEdit;

    const tripToEdit = tripList.find(trip => trip.id === idToEdit)

    tripTextarea.value = tripToEdit.place; // pre-fill with original text
}

function onDelete(idToDelete) {
    // update the data
    const indexToDelete = tripList.findIndex(trip => trip.id === idToDelete) // look through all the trips to find the index of the trip to delete
    tripList.splice(indexToDelete, 1)
    // re-render based on the data
    renderTripList();
}

function onPost() {

    if(tripEditId === null) { // then make a new trip
        tripList.push({
            id: tripList[tripList.length - 1].id + 1,
            place: tripTextarea.value
        })
    } else {
        const tripToUpdate = tripList.find(trip => trip.id === tripEditId)
        tripToUpdate.place = tripTextarea.value
        tripEditId = null; // resets; says we're done making edits to that one div
    }

    

    tripTextarea.value = ""; // clear the text box
    
    renderTripList(); // re-render based on the data
}

function onKeypress() { // can post by hitting enter button on keyboard!
    if(event.keyCode === 13) {
        onPost();
    }
}