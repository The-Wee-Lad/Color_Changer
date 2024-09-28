let interval = 1000;
const startInterval = 10;
const colors1 = ["rgb(97, 97, 226)","#1f1c1f","rgb(32, 181, 186)","rgb(132, 48, 160)","rgb(49, 180, 49)","rgb(255, 255, 117)","red"]
const colors2 = ["#9400D3","#4B0082","#0000FF","#00FF00","#FFFF00","#FF7F00","#FF0000"]
const colors3 = ['#edf2fb','#e2eafc','#d7e3fc','#ccdbfd',"#c1d3fe",'#b6ccfe','#abc4ff'];
const colors4 = ["#e40b0b", "#c30e0e", "#a21112", "#821415", "#611618", "#40191c", "#1f1c1f"];
const colors5 = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff"];
const colec = [colors1,colors2,colors3,colors4,colors5];
let timerId;
let i = 0;
let state = 1;
let con = document.querySelector(".wrapper");
let list = con.children[1].children;
const device = /Mobile|Tablet|iPad|iPhone|Android/.test(navigator.userAgent) ? 0 : 1;

for(let i in Array.from(con.children[2].children))
{
    con.children[2].children[i].style.backgroundColor = colec[i][0]; 
    if(i==4)
        break;
}

function checkInterval() {
    console.log("Interval",interval);
        if(con.children[2].children[5].lastChild.value<0.5)
            con.children[2].children[5].lastChild.value=0.5
        if(con.children[2].children[5].lastChild.value>30)
            con.children[2].children[5].lastChild.value=30;
            interval = con.children[2].children[5].lastChild.value*1000;
            stopPhasing();startPhasing();
}

function clicker(ev)
{
    
    if([...con.children[2].children,con.children[2],con.children[0],...con.children[0].children,...con.children[2].children[5].children].includes(ev.target))
    {
        console.log("NoAction,Clicked here",ev.target.className)
        return;
    }
    if (state) {
        console.log("stop index :" + i);
        stopPhasing();
        state = 0;
    }
    else {
        state = 1;
        console.log("start index :" + i);
        startPhasing();
    }

    if(["wrapper"].includes(ev.target.className))
    {
        console.log("Clicked here",ev.target.className)
    }
    else{
        console.log("Else block : ",ev.target.className)
        let tempcontainer = getComputedStyle(ev.target);
        let color = tempcontainer.backgroundColor;
        con.style.backgroundColor = color;
        i = Array.from(con.children[1].children).indexOf(ev.target);
    }
}
function hover(ev)
{
    if(ev.target.className == "inner")
        return false;
    console.log("hover : ",ev.target)
    let tempcontainer = getComputedStyle(ev.target);
    let color = tempcontainer.backgroundColor;
    console.log(color);

    if (ev.target.id == '')
        color = getComputedStyle(ev.target.parentNode).backgroundColor;
    con.style.backgroundColor = color;
    i = Array.from(con.children[1].children).indexOf(ev.target);
    stopPhasing();
    state = 0;

}
function phaser()
{
    console.log("execution index : "+i);
    con.style.backgroundColor = getComputedStyle(list[i]).backgroundColor;
    con.children[1].backgroundColor = con.style.backgroundColor;
    i=(i+1)%7;
    timerId = setTimeout(()=>{phaser();}, interval);
}
function startPhasing()
{
    stopPhasing();
    timerId = setTimeout(()=>{phaser();},startInterval);;   
}
function stopPhasing()
{
    clearTimeout(timerId);
}
function mouseleave(ev){
    console.log("mouseleave : ",ev.target);
    startPhasing();
}
function popup(event) {
    console.log('clicked on pop',event.target.className);
    checkInterval();
    if(event.target.className == "back" || event.target.className ==  "popup")
    {
        con.children[2].style.opacity="0";
        con.children[2].style.visibility="hidden";
        return
    }
    else if(["color custom","input"].includes(event.target.className))
        return

    let index = Array.from(con.children[2].children).indexOf(event.target);
    console.log("Clicked on option : ",index);
    setPlatform(index);
}
function setPlatform(choice)
{
    for(let i in Array.from(list))
        list[i].style.backgroundColor = colec[choice][i]; 
}
function settings() {
    con.children[2].style.visibility = "visible";
    con.children[2].style.opacity="1";
}


function start() 
{
    con.children[0].addEventListener("click",settings);
    con.children[2].addEventListener("click",popup);
    con.children[1].addEventListener("mouseleave",mouseleave);
    con.children[1].addEventListener("mouseover",hover);
    con.addEventListener("click",clicker);

    setPlatform(0);
    startPhasing();
    con.children[2].style.visibility = "visible";
    con.children[2].style.opacity="1";
    con.children[2].children[5].lastChild.addEventListener("keydown",(event)=>{if(event.key == "Enter"){con.children[2].children[5].lastChild.blur(); checkInterval()}})
}

start();
