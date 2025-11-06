// 동물병원 슬라이드
$(document).ready(function(){
  let $articles = $("#content3 .con3_right .box article");
  let current = 0;

  // 처음에는 첫 번째만 보이기
  $articles.hide().eq(current).show();

  // 위쪽 화살표(이전)
  $(".con3_right .fa-arrow-up").click(function(){
    $articles.eq(current).hide();
    current = (current - 1 + $articles.length) % $articles.length;
    $articles.eq(current).fadeIn();
  });

  // 아래쪽 화살표(다음)
  $(".con3_right .fa-arrow-down").click(function(){
    $articles.eq(current).hide();
    current = (current + 1) % $articles.length;
    $articles.eq(current).fadeIn();
  });
});






// 잃어버린 반려동물 슬라이더
const slider = document.querySelector('.slider');
const articles = document.querySelectorAll('.slider > article');
let currentIndex = 0;
let visibleCount = getVisibleCount();
let isDragging = false;
let startX = 0;
let currentX = 0;
let initialTransform = 0;

function getVisibleCount() {
  if (window.innerWidth <= 500) return 1;
  if (window.innerWidth <= 800) return 1;
  return 2;
}

function updateSlider() {
  const articleWidth = articles[0].offsetWidth + 20; 
  slider.style.transform = `translateX(-${currentIndex * articleWidth}px)`;
}

// 윈도우 리사이즈 시 다시 계산
window.addEventListener('resize', () => {
  visibleCount = getVisibleCount();
  if (currentIndex > articles.length - visibleCount) {
    currentIndex = articles.length - visibleCount;
    if (currentIndex < 0) currentIndex = 0;
  }
  updateSlider();
});

// 마우스 휠 이벤트
document.querySelector('.slider-wrapper').addEventListener('wheel', (e) => {
  e.preventDefault(); 
  if (e.deltaY > 0) {
    if (currentIndex < articles.length - visibleCount) {
      currentIndex++;
    }
  } else {
    if (currentIndex > 0) {
      currentIndex--;
    }
  }
  updateSlider();
});

// 터치/마우스 드래그 이벤트
const sliderWrapper = document.querySelector('.slider-wrapper');

// 마우스 이벤트
sliderWrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  slider.style.cursor = 'grabbing';
  e.preventDefault();
});

sliderWrapper.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  currentX = e.clientX;
  const diffX = startX - currentX;
  const articleWidth = articles[0].offsetWidth + 20;
  const currentTransform = -currentIndex * articleWidth;
  
  slider.style.transform = `translateX(${currentTransform - diffX}px)`;
});

sliderWrapper.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  slider.style.cursor = 'grab';
  
  const diffX = startX - currentX;
  const threshold = 50; // 드래그 거리 임계값
  
  if (Math.abs(diffX) > threshold) {
    if (diffX > 0) {
      // 오른쪽으로 드래그 (다음)
      if (currentIndex < articles.length - visibleCount) {
        currentIndex++;
      }
    } else {
      // 왼쪽으로 드래그 (이전)
      if (currentIndex > 0) {
        currentIndex--;
      }
    }
  }
  
  updateSlider();
});

sliderWrapper.addEventListener('mouseleave', () => {
  isDragging = false;
  slider.style.cursor = 'grab';
  updateSlider();
});

// 터치 이벤트
sliderWrapper.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  e.preventDefault();
});

sliderWrapper.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
  const diffX = startX - currentX;
  const articleWidth = articles[0].offsetWidth + 20;
  const currentTransform = -currentIndex * articleWidth;
  
  slider.style.transform = `translateX(${currentTransform - diffX}px)`;
  e.preventDefault();
});

sliderWrapper.addEventListener('touchend', () => {
  if (!isDragging) return;
  isDragging = false;
  
  const diffX = startX - currentX;
  const threshold = 50;
  
  if (Math.abs(diffX) > threshold) {
    if (diffX > 0) {
      if (currentIndex < articles.length - visibleCount) {
        currentIndex++;
      }
    } else {
      if (currentIndex > 0) {
        currentIndex--;
      }
    }
  }
  
  updateSlider();
});

// 초기 커서 설정
sliderWrapper.style.cursor = 'grab';


