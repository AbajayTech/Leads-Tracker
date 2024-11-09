let myLeads =[]
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
 //Get the leads from the localStorage store in variable
const leadsfromLocalStorage = JSON.parse( localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")
 
//check if leads from localStorage is truthy
 if (leadsfromLocalStorage){
    myLeads = leadsfromLocalStorage
    render(myLeads)
 }

   tabBtn.addEventListener("click",function(){
    //grab the url of the current tab
        chrome.tabs.query({active:true,currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)

    })
    
 })

 function render(leads){
    let listitems = ""
    //Build list items from myLeads array
    for (let i = 0; i < leads.length; i++) {
    /*listitems += "<li><a target='_blank' href=' " + myLeads[i] + "'>" + myLeads[i] + "<a/></li>"*/
    listitems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            <a/> 
        </li>
        `
        //template string
    //ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"
    /*const li = document.createElement("li")
    li.textContent = myLeads[i]
    ulEl.append(li)*/   
}
 // Set ulEl's innerHTML once, after building the list items
    ulEl.innerHTML = listitems
 }

 deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads =[]
    render(myLeads)
 })
 
 inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    //save myLeads array to local storage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))   
    render(myLeads)
 })

 
 
