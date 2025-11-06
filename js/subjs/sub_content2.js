document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".button ul li");
  const hospitals = document.querySelectorAll(".inner_box");
  const moreBtn = document.querySelector(".more_wrap");
  const moreSection = document.querySelector(".moreBtn");

  let currentFilter = "건강검진"; // 기본 필터
  let showingAll = false; // 더보기 상태

  // 카테고리별 키워드 매핑
  const categoryKeywords = {
    "건강검진": ["건강검진"],
    "노령견/노령묘": ["노령견", "노령묘", "노령견/노령묘"],
    "야간진료": ["야간진료"],
    "CT/MRI": ["CT/MRI"],
    "미용": ["미용"]
  };

  // 병원 필터링 함수
  function filterHospitals(category) {
    const keywords = categoryKeywords[category];
    const filtered = [];

    hospitals.forEach(hospital => {
      const text = hospital.textContent;
      const hasMatch = keywords.some(keyword => text.includes(keyword));
      if (hasMatch) {
        filtered.push(hospital);
      }
    });

    return filtered;
  }

  // 병원 표시 함수
  function displayHospitals(filtered, showAll = false) {
    // 모든 병원 숨기기
    hospitals.forEach(h => h.style.display = "none");

    // 필터링된 병원 표시
    const displayCount = showAll ? filtered.length : Math.min(4, filtered.length);

    for (let i = 0; i < displayCount; i++) {
      if (filtered[i]) {
        filtered[i].style.display = "block";
      }
    }

    // More 버튼 표시/숨김
    if (filtered.length > 4) {
      moreSection.style.display = "block";
    } else {
      moreSection.style.display = "none";
    }
  }

  // 탭 클릭 이벤트
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // 활성화 상태 변경
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // 현재 필터 업데이트
      currentFilter = tab.querySelector("p").textContent.trim();
      showingAll = false;

      // 필터링 및 표시
      const filtered = filterHospitals(currentFilter);
      displayHospitals(filtered, false);
    });
  });

  // More 버튼 클릭 이벤트
  moreBtn.addEventListener("click", () => {
    showingAll = !showingAll;
    const filtered = filterHospitals(currentFilter);
    displayHospitals(filtered, showingAll);
  });

  // 초기 로딩
  tabs[0].classList.add("active");
  const initialFiltered = filterHospitals(currentFilter);
  displayHospitals(initialFiltered, false);
});