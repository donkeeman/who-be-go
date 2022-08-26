import { getUserInfo } from './userApi.js';
import { getReviewList } from './reviewApi.js';

const profileImg = document.querySelector('#img-profile') as HTMLImageElement;
const username = document.querySelector('#text-name') as HTMLLIElement;
const userId = document.querySelector('#text-id') as HTMLLIElement;
const userIntro = document.querySelector('#text-intro') as HTMLLIElement;
const reviewAlbum = document.querySelector('.review-album') as HTMLUListElement;

interface album {
    id: string;
    content: string;
    image: string;
}

const createReviewAlbum = (review: album) => {
    const li = document.createElement('li');
    li.classList.add('card-s');
    li.style.backgroundImage = `url(${review.image})`;
    const a = document.createElement('a');
    a.href = `../pages/reviewDetail.html?id=${review.id}`;
    const h3 = document.createElement('h3');
    h3.textContent = '영화 제목';
    h3.classList.add('visually-hidden');
    const showContents = document.createElement('div');
    showContents.classList.add('show-contents');
    const movieTitle = document.createElement('strong');
    movieTitle.id = 'movie-title';
    movieTitle.textContent = review.content.split('@')[0];
    const ratingStar = document.createElement('div');
    const rating: number = parseFloat(review.content.split('@')[2]) * 20;
    ratingStar.classList.add('rate-star');
    ratingStar.style.setProperty('--width-rating', rating + '%');
    showContents.append(movieTitle, ratingStar);
    a.append(h3, showContents);
    li.append(a);
    return li;
};

window.addEventListener('load', async () => {
    // 유저 정보 설정
    const userInfo = await getUserInfo();
    profileImg.src = userInfo.image;
    username.textContent = userInfo.username;
    userId.textContent = userInfo.accountname;
    userIntro.textContent = userInfo.intro;

    // 유저의 리뷰 앨범 설정
    const reviewList = await getReviewList();
    for (let review of reviewList) {
        reviewAlbum.appendChild(createReviewAlbum(review));
    }
});