import "./style.css";
// document.body.textContent = "";
console.log("Good luck Eva!");

type Post={
    id: number;
    title: string;
    author: string;
}
type Coment= {
    id: number;
    body: string;
    postId: number;
}
type Profile= {
    id: number
    name: string;
    foodOrder: string
}
type State={
    post:Post[]
    coment:Coment[]
    profile: Profile[]
}
let state:State={
  post: [] ,
  coment:[],
  profile:[ {
    id: 1,
    name: "Eva",
    foodOrder: "Hamburger"

  }]


}
 
// Let's build a miniature restaurant queue app!
// https://codesandbox.io/s/1-1-eva-todo-todo-xpqyhx?file=/src/main.ts

// Deliverables:

// - every person has a name, and a food order and an ID
// - as a user I should see a list of people and their order in queue.
// - I should also see a "Add to queue"  form:
// - when I enter a person to the form and hit submit:
//    - it should add them and their food at the end of the queue.
//    - it should clear the form

// - 1. connect to https://62ce7d27826a88972dfc73ca.mockapi.io/orders:
//   - we should fetch the people from the server when the app starts
function GetPeopleFromServer (){
fetch("http://localhost:3005/profile")
.then(resp=>resp.json())
.then(person=>{
    state.profile=person
})
}
function CreateNewOrder (name:string, foodOrder:string){
    let url = 'http://localhost:3005/profile'

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
        name:name,
        footOrder:foodOrder
    })
}
fetch(url, options)
.then(resp=>resp.json())
.then(NewOrder=>{
    state.profile.push(NewOrder)
    render()
})
}
function render(){
    let mainEl=document.querySelector("main")
    if(mainEl===null)return
    mainEl.textContent=""
let pEl=document.createElement("p")
for(let profil of state.profile) {
pEl.textContent=`Name: ${profil.name}   FoodOrder:${profil.foodOrder}`
}
mainEl.append(pEl)


}
//   - when adding a person to the queue, both the app and the server should get updated
// - 2. build counters at the top of the page for:
//    - how many people are in the queue?
//    - how many have already been served since we last refreshed the page?
render()
GetPeopleFromServer ()
