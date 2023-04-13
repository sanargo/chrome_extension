//HTML elements
const inputBtn = document.querySelector("#input-btn")
const inputEl = document.querySelector("#input-el")
const ulEl = document.querySelector("#ul-el")
const deleteBtn = document.querySelector("#delete-btn")
const tabBtn = document.querySelector("#tab-btn")

let myLeads = []
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

//Conditions
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

//Funtions
function render(leads) {
    let listItems = ""
    for (i = 0; i < leads.length; i++) {
        // listItems += "<li>" + "<a target='_blank' href='#'>" + myLeads[i] + "</a>" + "</li>" 
        listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

//Events
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    console.log(localStorage);
    render(myLeads)

    console.log( localStorage.getItem("myLeads") );
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
    
    console.log(localStorage.getItem("myLeads"));
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

// myLeads = JSON.parse(myLeads) // Parse es para pasar de string a array
// myLeads.push("bobito")
// console.log(myLeads);

// myLeads = JSON.stringify(myLeads) // stringify es para pasar de array a string
// console.log(typeof myLeads);

// localStorage.clear()
// console.log(localStorage);
