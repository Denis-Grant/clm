const searchInput = document.getElementById('search');
const searchBtn = document.querySelector('.search-btn');
const assignmentWrapper = document.querySelector('.assignment-wrapper'); 
const week = document.querySelector('.week');
const publisherName = document.querySelector('.publisher-name');
const metaData = document.querySelector('.meta-data');
const main = document.querySelector('main');
const searchWrap = document.querySelector('.search-wrap');
let weekArr = [];
let rows= [];
let x;
let counter = 0;
let myAssignment ='Grant';
const user = document.querySelector('.fa-user');
let dataArray;
let itemStr;
let sheets = []; // initialize sheets array
let allNames;
let names = [];
let nameList = [];

// window.addEventListener('scroll',()=>{
//     if (window.pageYOffset > 100) {
//         searchWrap.classList.add('header-offset')
//     } else {
//         searchWrap.classList.remove('header-offset')
//     }      
// })
async function setup(){
    for (let i = 5; i < 10; i++){ 
        data = await ( await fetch(`https://spreadsheets.google.com/feeds/cells/1bIa031vPD-sAXGf8QqKRtKfAC5XqbfruyM2zksQzdAc/${i}/public/full?alt=json`)).json();
        // Display week dates
        sheets.push(data)
    }
    return sheets;
}
async function extractNames(){
         const list = await ( await fetch(`https://spreadsheets.google.com/feeds/cells/1bIa031vPD-sAXGf8QqKRtKfAC5XqbfruyM2zksQzdAc/13/public/full?alt=json`)).json();
        // Display week dates
        let tempNames = [];
        nameList = new Set();
        names.push(list)
        names[0].feed.entry.forEach((pub)=>{
            // Search excludes the headings and Urdu group cols
            if (pub.title.$t < 'O1' && pub.gs$cell.row != 1 && pub.gs$cell.col != 7  && pub.gs$cell.col != 8) {
                nameList.add(pub.content.$t);
            }
        })
        nameList.forEach(name => {
            searchInput.innerHTML += `<option value="${name}">${name}</option>`
        })
        
    return nameList;
}

 function initialize(data, publisherName){
    main.innerHTML = '';
    let weekNum = 1;
    let weekIndex = 0;
    let item;
    let time;
    let link = 'https://wol.jw.org/en/wol/dt/r1/lp-e/';
    data.forEach((data)=>{
         // data = await ( await fetch(`https://spreadsheets.google.com/feeds/cells/1bIa031vPD-sAXGf8QqKRtKfAC5XqbfruyM2zksQzdAc/${i}/public/full?alt=json`)).json();
        // Display week dates
        dataArray = Array.of(data);
        let weekStr = data.feed.entry[1].content.$t.split('-')
        let time = new Date (weekStr[0,weekIndex].trim() + ' 2020')
        // console.log(time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate()) 
        let formattedDate = time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate()
       main.innerHTML += 
           `<div class="meta-data"><div class="week"><a href='${link+formattedDate}' target='_blank'>${data.feed.entry[1].content.$t}</a></div><div>Week ${weekNum++}</div>`
           

       // Display items
       data.feed.entry.forEach(pub => {
           if (pub.content.$t.includes(publisherName)){                
               dataArray[0].feed.entry.forEach((i)=>{
                   if (i.title.$t.includes('C'+ pub.title.$t.substring(1))){
                       itemStr =  i.content.$t;
                   } 
                    item = 'C'+ pub.title.$t.substring(1);
                   switch(item){
                       case 'C5' : 
                       case 'C34' : 
                       case 'C58' : 
                       case 'C40' : 
                       case 'C48' : 
                       case 'C41' : 
                       case 'C7' : itemStr = '';
                       break
                     
                       default:
                           itemStr;
                       break
                   }
               })
                
               main.innerHTML += 
               `<div class="assignment-wrapper">
                   <div class="assignments">
                       <img src="img/${meetingPart(pub.title.$t).i}" alt="IMAGE">
                       <p>${meetingPart(pub.title.$t).part}</p>
                       <p>${itemStr}</p>
                   </div>
               </div>`    
           }
       });
   
   
    })
    main.innerHTML += `<div class='blank-space'></div>`  
}
setup(); // API - Start initialization (once only)
extractNames(); // API - Once only
searchBtn.addEventListener('click', ()=>{
    // searchInput.select();
    if (searchInput.value.length != 0 || searchInput.value.trim() != ''){
        initialize(sheets,searchInput.value.trim());
    }
    
});

user.addEventListener('click', ()=>{
    searchInput.value = 'Grant';
    initialize(sheets, searchInput.value.trim());

});


function toggleMenu(){
    menu.getAttribute('style') === null ? menu.style.transform = 'translateX(0)' : menu.removeAttribute('style');
}
function searchByName(name){
    fetch('https://spreadsheets.google.com/feeds/cells/1bIa031vPD-sAXGf8QqKRtKfAC5XqbfruyM2zksQzdAc/8/public/full?alt=json').then(resp => resp.json()).then((data) => {

    data.feed.entry.forEach((pub)=>{
        if (pub.title.$t.length < 4 && !pub.content.$t.includes('Chair') && pub.title.$t.includes('B')){
            console.log(pub.content.$t);
        }
        })
    })
}



function meetingPart(item){
    let itemPart;
    let icon;
    switch(item){
        case    'A58': itemPart = 'Host';
                icon = 'weekly-img.png'
                title =109
        break;
        case    'G58': itemPart = 'Attendant';
                icon = 'weekly-img.png'
                title = 109
        break;
        case    'K58': itemPart = 'Spotlight';
                icon = 'weekly-img.png'
                title = 109
        break;
        case    'Q14': itemPart = 'Bible Reading (Urdu)';
                icon = 'treasures-img.png'
                title = 109
        break;
        case 'V5': itemPart = 'Chairman'
                icon = 'profile.png'
                title = 109
        break;
        case 'V7': itemPart = 'Opening Prayer'
                icon='praying.jpeg'
                title = 109
        break;
        case 'V12': itemPart = 'Treasures Talk'
                icon='treasures-img.png'
                title = 'C12'
        break;
        case 'V13': itemPart = 'Digging for Spiritual Gems'
                icon='treasures-img.png'
                title = 109
        break;
        case 'V14': itemPart = 'Student'
                icon='treasures-img.png'
                title =23
        break;
        case 'V18': itemPart = 'Apply'
                icon='apply-img.png'
                title = 109
        break;
        case 'V19': itemPart = 'Student'
                icon='apply-img.png'
                title =109
        break;
        case 'V21': itemPart = 'Student'
                icon='apply-img.png'
                title =109
        break;
        case 'V22': itemPart = 'Student'
                icon='apply-img.png'
                title =109
        break;
        case 'V23': itemPart = 'Student'
                icon='apply-img.png'
                title =51
        break;
        case 'V29': itemPart = 'Living'
                icon='living-img.png'
                title = 63
        break;
        case 'V30': itemPart = 'Living'
                icon='living-img.png'
                title = 65
        break;
        case 'V31': itemPart = 'Conductor'
                icon='living-img.png'
                title = 109
        break;
        case 'V32': itemPart = 'CBS Reader'
                icon='living-img.png'
                title = 72
        break;
        case 'V34': itemPart = 'Closing Prayer'
                icon='praying.jpeg'
                title =109
        break;
        case 'Q40': itemPart = 'Chairman (Weekend)'
                icon='profile.png'
                title = 109
        break;
        case 'V41': itemPart = 'Away Talk'
                icon='public-img.png'
                title = 109
        break;
        case 'V48': itemPart = 'Watchtower Reader'
                icon='watchtower-img.png'
                title = 109
        break;
        case 'S58': itemPart = 'Media Player'
                icon='weekly-img.png'
                title = 109
        break;
        case 'O58': itemPart = 'Mute/Unmute'
                icon='weekly-img.png'
                title = 109
        break;
        default: itemPart = 'Missing Item'
                title = 109 
        break;
    }
    return {part: itemPart, i: icon, item: title };
}

//test