const searchInput = document.getElementById('search');
const searchBtn = document.querySelector('.search-btn');
const assignmentWrapper = document.querySelector('.assignment-wrapper'); 
const week = document.querySelector('.week');
const publisherName = document.querySelector('.publisher-name');
const metaData = document.querySelector('.meta-data');
const main = document.querySelector('main');
const collection = [];
let myAssignment ='Grant';
const user = document.querySelector('.fa-user');

searchBtn.addEventListener('click', ()=>{
    if (searchInput.value.length != 0 || searchInput.value.trim() != ''){
        getItems(searchInput.value.trim()) 
    }
});
user.addEventListener('click', ()=>{
    searchInput.value = 'Grant';
    getItems(searchInput.value.trim())

});


// navBar.addEventListener('click', ()=>{
//     toggleMenu();
// });
// menu.addEventListener('click', (e)=>{
//     if (e.target.textContent === 'SEARCH - Name') {
//         toggleMenu()
//         searchByName();
//     }
// });

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

// function scanWeeks(){
//     fetch('https://spreadsheets.google.com/feeds/cells/1bIa031vPD-sAXGf8QqKRtKfAC5XqbfruyM2zksQzdAc/5/public/full?alt=json').
//     then(resp => resp.json()).
//     then((data) => {
//     console.log(data.feed.title.$t)
//     // console.log(data.feed.entry[1].content.$t)
//     week.textContent = data.feed.entry[1].content.$t;
//     let weekStart = 
//     data.feed.entry.forEach(pub => {
       
//     }); 
// }); 
// }
function getItems(name){
    main.innerHTML = '';
    for (let i = 5; i < 10; i++){
        fetch(`https://spreadsheets.google.com/feeds/cells/1bIa031vPD-sAXGf8QqKRtKfAC5XqbfruyM2zksQzdAc/${i}/public/full?alt=json`).
        then(resp => resp.json()).
        then((data) => {
        // console.log(data.feed.title.$t)
        // console.log(data.feed.entry[1].content.$t)
        // week.textContent = data.feed.entry[1].content.$t;
        // publisherName.textContent = searchInput.value.trim();
        main.innerHTML += 
        `<div class="meta-data"><div class="week">${data.feed.entry[1].content.$t}</div><div class="publisher-name">${searchInput.value.trim()}</div></div>`
        data.feed.entry.forEach(pub => {
           
            if (pub.content.$t.includes(name)){
                // metaData.innerHTML += 
                // `<div class="week">${data.feed.entry[1].content.$t}</div><div class="publisher-name">${searchInput.value.trim()}</div></br>`
                main.innerHTML += 
                `<div class="assignment-wrapper"><div class="assignments">
                <img src="img/${meetingPart(pub.title.$t).i}" alt="IMAGE">
                <p>${meetingPart(pub.title.$t).part}</p>
                <p>“Reflect Jehovah’s View of Life”: (10 min.)</p>
                </div></div>`;
            }
            });
        });
    }
    // main.innerHTML += '</br></br>'

}
function meetingPart(item){
    let itemPart;
    let icon;
    switch(item){
        case    'A58': itemPart = 'Host';
                icon = 'weekly-img.png'
        break;
        case    'G58': itemPart = 'Attendant';
                icon = 'weekly-img.png'
        break;
        case    'K58': itemPart = 'Spotlight';
                icon = 'weekly-img.png'
        break;
        case    'Q14': itemPart = 'Bible Reading (Urdu)';
                icon = 'treasures-img.png'
        break;
        case 'V5': itemPart = 'Chairman'
                icon = 'profile.png'
        break;
        case 'V7': itemPart = 'Opening Prayer'
                icon='pray.jpg'
        break;
        case 'V12': itemPart = 'Treasures Talk'
                icon='treasures-img.png'
        break;
        case 'V13': itemPart = 'Digging for Spiritual Gems'
                icon='treasures-img.png'
        break;
        case 'V14': itemPart = 'Bible Reading'
                icon='treasures-img.png'
        break;
        case 'V18': itemPart = 'RV Video'
                icon='apply-img.png'
        break;
        case 'V19': itemPart = 'Student Assignment'
                icon='apply-img.png'
        break;
        case 'V21': itemPart = 'Student Assignment'
                icon='apply-img.png'
        break;
        case 'V30': itemPart = ''
                icon='living-img.png'
        break;
        case 'V29': itemPart = ''
                icon='living-img.png'
        break;
        case 'V31': itemPart = 'CBS Conductor'
                icon='living-img.png'
        break;
        case 'V34': itemPart = 'Closing Prayer'
                icon='pray.jpg'
        break;
        case 'Q40': itemPart = 'Chairman (Weekend)'
                icon='profile.png'
        break;
        case 'V41': itemPart = 'Away Speaker'
                icon='public-img.png'
        break;
        case 'V48': itemPart = 'Watchtower Reader'
                icon='watchtower-img.png'
        break;
        case 'S58': itemPart = 'Media Player'
                icon='weekly-img.png'
        break;
        case 'O58': itemPart = 'Mute/Unmute'
                icon='weekly-img.png'
        break;
        default: itemPart = 'Missing Item'
        break;
    }
    return {part: itemPart, i: icon};
}