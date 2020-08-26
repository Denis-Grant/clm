const navBar = document.querySelector('.fa-bars');
const menu = document.querySelector('#menu');
const menuList = menu.children;

navBar.addEventListener('click', ()=>{
    toggleMenu();
});
menu.addEventListener('click', (e)=>{
    if (e.target.textContent === 'Search by Name') {
        toggleMenu()
        searchByName();
    }
});

function toggleMenu(){
    menu.getAttribute('style') === null ? menu.style.transform = 'translateX(0)' : menu.removeAttribute('style')
}
function searchByName(){
    fetch('https://spreadsheets.google.com/feeds/cells/1bIa031vPD-sAXGf8QqKRtKfAC5XqbfruyM2zksQzdAc/13/public/full?alt=json').then(resp => resp.json()).then((data) => {

    data.feed.entry.forEach((pub)=>{
        if (pub.title.$t.length < 4 && !pub.content.$t.includes('Chair') && pub.title.$t.includes('B')){
            console.log(pub.content.$t);
        }
        })
    })
}
fetch('https://spreadsheets.google.com/feeds/cells/1bIa031vPD-sAXGf8QqKRtKfAC5XqbfruyM2zksQzdAc/13/public/full?alt=json').then(resp => resp.json()).then((data) => {
    // console.log(data.feed.title.$t)
    // console.log(data.feed.entry[1].content.$t)
    data.feed.entry.forEach(pub => {
        // pub.content.$t.includes('Neal')  ? console.log(pub.content.$t, meetingPart(pub.title.$t)) : pub.content.$t;
    });
});

function meetingPart(item){
    let itemPart;
    switch(item){
        case 'A58': itemPart = 'Host'
        break;
        case 'V5': itemPart = 'Chairman'
        break;
        case 'V7': itemPart = 'Opening Prayer'
        break;
        case 'V13': itemPart = 'Digging for Spiritual Gems'
        break;
        case 'V14': itemPart = 'Bible Reading'
        break;
        case 'V31': itemPart = 'CBS Conductor'
        break;
        case 'Q40': itemPart = 'Chairman (Weekend)'
        break;
        case 'V41': itemPart = 'Away Speaker'
        break;
        case 'S58': itemPart = 'Media Player'
        break;
        default: 'Do not know'
        break;
    }
    return itemPart;
}