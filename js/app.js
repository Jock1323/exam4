const API_KEY = 'AIzaSyD5sf1x0AMZG4UgGTCZ6XsKL_wRPwoNfm0'
const token = window.localStorage.getItem('token');
let elLogOutBtn = document.querySelector('.log-out');
let elForm = document.querySelector('.form-search');
let elSearchInput = document.querySelector('.search-input');
let elSearchBtn = document.querySelector('.search-btn');
let elOrderByNew = document.querySelector('.order-by');
let elList = document.querySelector('.main-card');
let elModal = document.querySelector('.more-info__modal');
let elOverlay = document.querySelector('.more-info__overlay');
let elTable = document.querySelector('.main-left__table');
let bookName='flowers'
let fullArr = [];
let bookmarkArr = [];
//renderCards
let renderCards = (fullArr, htmlElement) => {
    let txt = "";
    fullArr.forEach(element => {
        let item = `
        <li class="main-card__item card">
        <div class="card-header main-card__img">
            <img src="${element.volumeInfo.imageLinks}" alt="an image">
        </div>
        <div class="card-body">
            <h4 class="card-title">
                ${element.volumeInfo.title}
            </h4>
            <a href='${element.accessInfo.webReaderLink}' class="btn-danger btn main-card__read" data-read=${element.id}>
                Read
            </a>
            <button class="btn btn-info main-card__info" data-more=${element.id}>
                More Info
            </button>
            <button class="btn btn-primary main-card__bookmark" data-bookmark=${element.id}>
                Bookmark
            </button>
        </div>
    </li>
        `
        txt += item;
    });
    htmlElement.innerHTML = txt;
}

// render close modal
let closeModal = () => {
    elModal.classList.remove('more-info__modal--active');
    elOverlay.classList.remove('more-info__overlay--active')
}
//render modal
let renderMoreInfoModal = (item, htmlElement) => {
    let txt = `
        <h4 class="more-info__title text-center">
            ${item.volumeInfo.title}
        </h4>
        <p class="more-info__text">
            ${item.volumeInfo.subtitle}
        </p>
        <span class="more-info__author">${item.volumeInfo.authors[0]}</span>
        <p class="more-info__number">Page : <span class="more-number">${item.volumeInfo.pageCount}</span></p>
        <span class="more-info__print-type">${item.volumeInfo.printType}</span>
   `
    htmlElement.innerHTML = txt;
}
//render Bookmark

let renderBookmark = (arr, htmlElement) => {
    let txt = '';
    arr.forEach(item => {
        let element = `
        <tr class="main-left__table-row">
        <td class="main-left__table-data  d-flex justify-content-between align-items-center">
            <h4 class="book-title">
                ${item.volumeInfo.title}
            </h4>
            <i class="fa-solid fa-delete-left bookmark-delete" data-delete='${item.id}'></i>
        </td>
        </tr>
        `
        txt += element;
    })
    htmlElement.innerHTML = txt;
}

if (!token) {
    window.location.replace('index.html');
}
elLogOutBtn.addEventListener('click', () => {
    window.localStorage.removeItem('token');
    window.location.replace('index.html');
})

elForm.addEventListener('submit', (e) => {
    e.preventDefault();
    bookName = elSearchInput.value;
    fullData();
    elSearchInput.value = null;
})
elList.addEventListener('click', e => {
    if (e.target.matches('.main-card__info')) {
        let moreInfoBtnId = e.target.dataset.more;
        let findElement = fullArr.find(item => item.id === moreInfoBtnId);
        elModal.classList.add('more-info__modal--active');
        elOverlay.classList.add('more-info__overlay--active')
        renderMoreInfoModal(findElement, elModal)
    } else if (e.target.matches('.main-card__bookmark')) {
        let bookmarkId = e.target.dataset.bookmark;
        let findElement = fullArr.find(item => item.id === bookmarkId);
        if (!bookmarkArr.includes(findElement)) bookmarkArr.push(findElement);
        renderBookmark(bookmarkArr, elTable);
    }
})

elTable.addEventListener('click',e=>{
    if(e.target.matches('.bookmark-delete')){
        let bookmarkDeleteId=e.target.dataset.delete;
        let findDeletedIndex=bookmarkArr.findIndex(item=>item.id===bookmarkDeleteId);
        bookmarkArr.splice(findDeletedIndex,1);
        renderBookmark(bookmarkArr,elTable);
    }
})
elOverlay.addEventListener('click', closeModal)
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
        elModal.classList.remove('more-info__modal--active');
        elOverlay.classList.remove('more-info__overlay--active')
    }
})

const fullData = () => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}`)
        .then(req => req.json())
        .then(data => {
            fullArr = data.items;
            console.log(data);
            renderCards(data.items, elList)
        })
}
fullData();