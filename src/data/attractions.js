const img = (url) => `https://wsrv.nl/?url=${encodeURIComponent(url)}&n=-1`;

const attractions = [
  {
    name: '스페인 광장',
    nameEn: 'Plaza de Espana',
    image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/La_Plaza_de_Espa%C3%B1a_de_Sevilla.JPG/800px-La_Plaza_de_Espa%C3%B1a_de_Sevilla.JPG'),
    visited: true,
    badge: { type: 'free', icon: 'fa-ticket', text: '무료' },
    address: 'Av. Isabel la Catolica, 41004 Sevilla',
    info: [
      { icon: 'tip', faIcon: 'fa-landmark-dome', html: '1929년 이베로아메리카 박람회를 위해 조성된 세비야 대표 랜드마크. 아르데코, 르네상스 양식이 혼합된 반원형 건축, 타일 장식, 운하와 다리가 어우러집니다.' },
      { icon: 'time', faIcon: 'fa-clock', html: '<strong>24시간 개방</strong>되는 광장이라 낮, 해질녘, 밤, 비오는 날, 맑은 날의 분위기가 모두 다릅니다. 각각 다 가보는 것을 추천합니다.' },
      { icon: 'tip', faIcon: 'fa-music', html: '<strong>플라멩고 거리 공연</strong>은 공식 고정 시간표 없이 자발적으로 진행됩니다. 보통 사람이 많은 <strong>오후~해질녘</strong>에 만날 확률이 높습니다. 확실한 공연을 원하면 Casa de la Memoria 등 전문 타블라오를 예약하세요.' },
      { icon: 'note', faIcon: 'fa-heart', html: 'sangsang.park의 인생 여행지로 세비야를 꼽게 만드는 이유 중 하나. 시간이 허락하면 여러 시간대에 반복 방문 추천.' },
      { icon: 'tip', faIcon: 'fa-person-running', html: '런닝을 좋아한다면 마리아 루이사 공원과 연결해 <strong>스페인 광장 러닝 코스</strong>로 뛰어보는 것도 좋습니다.' },
      { icon: 'note', faIcon: 'fa-calendar-star', html: '2026년 9~10월 <strong>비엔날 데 플라멩코</strong> 기간에 방문하면 도시 곳곳에서 무료 공연과 행사를 즐길 수 있습니다.' },
    ],
    highlight: {
      html: '<strong><i class="fa-solid fa-camera"></i> 추천 방문법</strong><br>첫날 낮에 한 번, 다른 날 해질녘에 한 번 더. 밤 조명까지 보면 같은 장소가 세 번 다른 도시처럼 보입니다.',
    },
    map: { q: 'Plaza de Espana Sevilla', link: 'https://maps.app.goo.gl/fL3nVGyjWkTESVrF7' },
  },
  {
    name: '메트로폴 파라솔',
    nameEn: 'Setas de Sevilla · 라스 세타스 데 세비야',
    image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Sunset_in_Metropol_Parasol_-_Seville.JPG/800px-Sunset_in_Metropol_Parasol_-_Seville.JPG'),
    visited: true,
    badge: { type: 'star', icon: 'fa-binoculars', text: '전망대' },
    address: 'Pl. de la Encarnacion, s/n, Casco Antiguo, 41003 Sevilla',
    info: [
      { icon: 'tip', faIcon: 'fa-lightbulb', html: '구시가지 한가운데 놓인 거대한 목조 구조물. 별명처럼 <strong>라스 세타스</strong>, 즉 버섯 모양 전망대로 불립니다.' },
      { icon: 'price', faIcon: 'fa-coins', html: '전망대 일반 티켓 약 <strong>15유로</strong>, 학생/시니어 약 12유로, 일몰 시간대 티켓은 약 18유로. 세비야의 무료 명소들에 비하면 비싼 편이니 여유가 있다면 추천.' },
      { icon: 'time', faIcon: 'fa-clock', html: '4~9월 09:30~23:00 / 10~3월 10:00~22:30. 매일 운영. 온라인 예매 시 줄 없이 입장 가능.' },
    ],
    highlight: {
      html: '<strong><i class="fa-solid fa-circle-info"></i> 동선 팁</strong><br>MUSH ROOM APARTAMENTOS 근처라 체크인 전후로 가볍게 들르기 좋습니다. 일몰 시간대에 올라가면 최고.',
    },
    map: { q: 'Setas de Sevilla', link: 'https://maps.app.goo.gl/UNNknHALSuqVXiHw5' },
  },
  {
    name: '세비야 대성당',
    nameEn: 'Catedral de Sevilla',
    image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Catedral_de_Sevilla-2025_01.jpg/800px-Catedral_de_Sevilla-2025_01.jpg'),
    visited: true,
    badge: { type: 'star', icon: 'fa-church', text: '세계유산' },
    address: 'Av. de la Constitucion, s/n, Casco Antiguo, 41004 Sevilla',
    info: [
      { icon: 'tip', faIcon: 'fa-lightbulb', html: '세계 최대급 고딕 성당으로, 히랄다 탑과 콜럼버스 묘, 거대한 제단화가 핵심 관람 포인트입니다.' },
      { icon: 'price', faIcon: 'fa-coins', html: '일반 입장권 온라인 <strong>20유로</strong>, 현장 21유로. 65세 이상/25세 이하 학생 할인 7~8유로. 13세 미만 무료. 오디오 가이드 별도 5유로.' },
      { icon: 'warn', faIcon: 'fa-triangle-exclamation', html: '대기 줄이 길 수 있으니 <strong>온라인 예매</strong> 또는 오픈 시간대 방문 추천. 현장 구매 줄은 특히 오래 걸릴 수 있습니다.' },
      { icon: 'note', faIcon: 'fa-headphones', html: '<strong>한국어 오디오 가이드</strong> 대여해서 관람하는 것을 추천합니다. 공식 사이트에서 한국어 지원 여부 재확인 후 방문하세요.' },
      { icon: 'time', faIcon: 'fa-clock', html: '월~토 11:00~18:00, 일 14:30~19:00. 일요일 16:30~18:00 무료 입장(온라인 사전 예약 필요).' },
    ],
    map: { q: 'Catedral de Sevilla', link: 'https://maps.app.goo.gl/rBQbsjuQMr1nZWrw5' },
  },
  {
    name: '알카사르',
    nameEn: 'Real Alcazar de Sevilla',
    image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/PATIO_DE_LAS_DONCELLAS._REALES_ALC%C3%81ZARES_DE_SEVILLA._%282%29.JPG/800px-PATIO_DE_LAS_DONCELLAS._REALES_ALC%C3%81ZARES_DE_SEVILLA._%282%29.JPG'),
    badge: { type: 'rec', icon: 'fa-thumbs-up', text: '강력 추천' },
    address: 'Casco Antiguo, 41004 Sevilla',
    info: [
      { icon: 'tip', faIcon: 'fa-archway', html: '분수로 가득한 정원, 화려한 아치, 16세기 타일로 지어진 무데하르 양식 왕궁. 세비야 최고의 건축 유산입니다.' },
      { icon: 'tip', faIcon: 'fa-crown', html: '그라나다에 알람브라가 있다면 세비야에는 <strong>알카사르</strong>. 세비야 체류 시간이 짧다면 대성당보다 알카사르를 먼저 추천합니다.' },
      { icon: 'price', faIcon: 'fa-coins', html: '일반 입장 <strong>15.50유로</strong>. 14~30세 학생/EU 65세 이상 6유로. 13세 미만 무료. 왕실 침실 추가 5.50유로.' },
      { icon: 'warn', faIcon: 'fa-ticket', html: '<strong>시간 지정 예매 필수</strong>. 인기 날짜는 빨리 매진되므로 2개월 전부터 공식 사이트에서 예매 추천.' },
      { icon: 'time', faIcon: 'fa-clock', html: '4~9월 09:30~19:00 / 10~3월 09:30~17:00. 월요일 마지막 1시간 무료(사전 예약 필요).' },
    ],
    highlight: {
      html: '<strong><i class="fa-solid fa-leaf"></i> 관람 포인트</strong><br>실내 궁전만 보고 나오지 말고 정원까지 충분히 걸어보세요. 세비야의 빛과 물소리가 가장 잘 살아나는 곳입니다.',
    },
    map: { q: 'Real Alcazar de Sevilla', link: 'https://maps.app.goo.gl/Rv8jURjzT1fpgBHQ7' },
  },
];

export default attractions;
