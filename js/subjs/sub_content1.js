// 로띠에
document.addEventListener('DOMContentLoaded', () => {
  lottie.loadAnimation({
    container: document.getElementById('dog_lottie'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './lottie/YummyDog.json'
  });
});




// ===== 프로필 플레이어 =====
const vp = document.getElementById('feedViewport');
const cards = [...vp.querySelectorAll('.post')];
const prevBtn = document.getElementById('feedPrev');
const nextBtn = document.getElementById('feedNext');

let idx = 0;
let direction = +1;
let ticking = false;

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const mod   = (n, m) => ((n % m) + m) % m;
function rel(i){
  const N = cards.length;
  let r = mod(i - idx, N);
  if (r > N/2) r -= N;
  return r; // …,-2,-1,0,1,2…
}

function layout(){
  if (ticking) return;
  ticking = true;

  requestAnimationFrame(() => {
    const W  = vp.clientWidth;          // 뷰포트(카드 영역) 폭
    const WW = window.innerWidth;       // 창 폭(브레이크포인트 판단용)
    const is800 = WW >= 800;

    const fr = cards[0].querySelector('.frame');
    const cw = fr?.getBoundingClientRect().width || 300;

    const GAP   = clamp(W * 0.03, 16, 40);
    const INSET = clamp((1440 - Math.min(W,1440)) * 0.12, 0, cw * 0.18);
    const ROT   = clamp(1600 / W, 6, 12);
    const LIFT  = clamp(W * 0.02, 10, 36);

    const centerX  = (W - cw) / 2;
    const offsetX  = cw - INSET + GAP;
    const VW_OFFSET = W * 0.05; // 5vw

    cards.forEach((el, i) => {
      el.style.willChange = 'transform, filter';
      el.style.backfaceVisibility = 'hidden';
      el.style.transformOrigin = 'bottom center';
      el.style.zIndex = 1;
      el.classList.remove('center','side','hidden');

      const k = rel(i);

      if (k === 0){
        // 가운데
        el.style.transform = `translate3d(${centerX}px,0,0) scale(1) rotate(0deg)`;
        el.style.filter = 'brightness(1.1)';
        el.style.zIndex = 3;
        el.classList.add('center');
      } else if (k === -1){
        // 왼쪽
        if (is800){
          el.style.transform = `translate3d(${centerX - offsetX - VW_OFFSET}px, -2px, 0) scale(.92) rotate(-6deg)`;
        } else {
          el.style.transform = `translate3d(${centerX - offsetX - VW_OFFSET}px, ${LIFT - 25}px, 0) scale(.92) rotate(${-2}deg)`;
        }
        el.style.filter = 'brightness(.55)';
        el.style.zIndex = 2;
        el.classList.add('hide','side');
      } else if (k === 1){
        // 오른쪽
        if (is800){
          el.style.transform = `translate3d(${centerX + offsetX + VW_OFFSET}px, 2px, 0) scale(.92) rotate(6deg)`;
        } else {
          el.style.transform = `translate3d(${centerX + offsetX + VW_OFFSET}px, ${LIFT - 25}px, 0) scale(.92) rotate(${2}deg)`;
        }
        el.style.filter = 'brightness(.55)';
        el.style.zIndex = 2;
        el.classList.add('hide','side');
      } else {

        // 화면 밖 대기(방향에 따라 바깥에서 진입)
        const offX = direction > 0 ? (centerX + offsetX * 1.6) : (centerX - offsetX * 1.6);
        el.style.transform = `translate3d(${offX}px, ${LIFT}px, 0) scale(.9) rotate(${direction>0?ROT:-ROT}deg)`;
        el.style.filter = 'brightness(.7)';
        el.classList.add('side','hidden');
      }

      if (!el.dataset.tset){
        el.style.transition = 'transform 6ms cubic-bezier(.2,.8,.2,1), filter 6ms ease';
        el.dataset.tset = '1';
      }
    });

    ticking = false;
  });
}

// 이벤트
prevBtn.addEventListener('click', () => { direction = -1; idx = (idx - 1 + cards.length) % cards.length; layout(); });
nextBtn.addEventListener('click', () => { direction = +1; idx = (idx + 1) % cards.length; layout(); });
window.addEventListener('resize', layout);

// 초기 렌더
layout();

// 좋아요/메시지
vp.addEventListener('click', (e) => {
  const like = e.target.closest('.icon.like');
  if (like){
    const c = like.querySelector('.count');
    c.textContent = String((parseInt(c.textContent||'0',10) + 1));
    c.style.count='top-10px';
  }
  const chat = e.target.closest('.icon.chat');
  if (chat){
    const name = chat.dataset.name || '친구';
    const dlg = document.getElementById('msgDialog');
    const to  = document.getElementById('msgTo');
    const input = document.getElementById('msgInput');
    if (dlg && to && input){
      to.textContent = `👉 ${name}에게 메시지 보내기`;
      input.value = '';
      dlg.showModal();
    }
  }
});





$(function () {
  const boxes = $(".profile_box .box");
  const btn = $("#moreBtn");
  const visibleCount = 8; // 처음 보이는 개수
  const speed = 200; // ✅ 애니메이션 속도(ms) — 숫자 클수록 느림

  // 처음 6개만 표시
  boxes.hide().slice(0, visibleCount).show();

  btn.on("click", function () {
    const hidden = boxes.filter(":hidden");
    if (hidden.length > 0) {
      hidden.slideDown(speed, "swing"); // ✅ 천천히 열기
      $(this).text("접기");
    } else {
      boxes.slice(visibleCount).slideUp(speed, "swing"); // ✅ 천천히 닫기
      $(this).text("더보기");
      $("html, body").animate({ scrollTop: $("#profile_box").offset().top }, speed);
    }
  });
});