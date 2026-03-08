const scene = document.getElementById("scene")
const textbox = document.getElementById("textbox")
const text = document.getElementById("text")
const next = document.getElementById("next")
const choice = document.getElementById("choice")

let state = {
bathroom:false,
balcony:false,
phone:false
}

let dialogue=[]
let index=0

function showText(arr,callback){

dialogue=arr
index=0

textbox.style.display="block"
text.innerText=dialogue[index]

next.onclick=()=>{

index++

if(index<dialogue.length){
text.innerText=dialogue[index]
}else{
textbox.style.display="none"
if(callback) callback()
}

}

}

function setScene(img){
scene.style.backgroundImage="url('assets/"+img+"')"
}

function intro(){
scene.style.background="black"

showText([
"Сегодня твой День Рождение",
"Ты теперь большой, верно?",
"Отпразднуй :)"
], room1)

}

function room1(){

setScene("room1.png")
choice.style.display="none"

scene.onclick=(e)=>{

let x=e.offsetX
let y=e.offsetY

if(x>330 && x<470 && y>250 && y<350){

if(!state.phone){

showText([
"Надо немного подождать, прежде чем зажечь свечи"
])

}else{

choice.style.display="block"

}

}

if(x<80){
room2()
}

if(x>720){
room3()
}

if(state.bathroom && state.balcony && !state.phone){

if(x>500 && x<600 && y>300 && y<380){

phoneScene()

}

}

}

}

function room2(){

setScene("room2.png")

scene.onclick=(e)=>{

let x=e.offsetX
let y=e.offsetY

if(x>300 && x<450 && y>200 && y<350){
mirrorScene()
}

if(y>520){
state.bathroom=true
room1()
}

}

}

function mirrorScene(){

setScene("mirror.png")

scene.onclick=(e)=>{

let y=e.offsetY

if(y<200){

showText([
"Сегодня я красивее, чем вчера"
], room2)

}

if(y>400){

showText([
"А, Саничка, это ты"
], room2)

}

}

}

function room3(){

setScene("room3.png")

scene.onclick=()=>{

showText([
"Ты закурил 1 сигарету",
"Я тобой недовольна >:("
], ()=>{

state.balcony=true
room1()

})

}

}

function phoneScene(){

state.phone=true

setScene("phone_off.png")

scene.onclick=()=>{

setScene("phone_on.png")

showText([
"С Днем Рождения!",
"Я очень рада, что ты есть",
"Пусть этот год будет лучше предыдущего"
], room1)

}

}

document.getElementById("lightCandles").onclick=()=>{

choice.style.display="none"

setScene("cake_candles.gif")

showText([
"..."
], ending)

}

function ending(){

scene.style.background="black"

showText([
"С ДНЕМ РОЖДЕНИЯ, ЧЕСИК!"
])

}

intro()
