const activities = [
  {
    name: '세비야 자전거 대여',
    nameEn: 'Sevici · Guadalquivir Riverside Ride',
    image: '/sevilla-travel/images/activities-bike.jpg',
    badge: { type: 'rec', icon: 'fa-bicycle', text: '추천' },
    address: '세비야 시내 Sevici 정류장 및 자전거 대여점',
    route: {
      title: '추천 라이딩 동선',
      steps: [
        { icon: 'fa-bicycle', text: '구시가지' },
        { icon: 'fa-water', text: '강변 자전거길' },
        { icon: 'fa-tree', text: '마리아 루이사 공원' },
        { icon: 'fa-landmark-dome', text: '스페인 광장' },
      ],
    },
    info: [
      { icon: 'tip', faIcon: 'fa-bicycle', html: '세비야는 평지가 많고 <strong>180km 이상의 자전거 전용 도로</strong>가 있어 유럽에서 가장 자전거 타기 좋은 도시 중 하나입니다.' },
      { icon: 'price', faIcon: 'fa-coins', html: '<strong>Sevici 공유 자전거</strong>: 1일권 2.59유로, 30분 이내 무료. 30분 초과 시 시간당 약 0.51~1.03유로 추가. 앱으로 대여/반납.' },
      { icon: 'tip', faIcon: 'fa-route', html: '도심에서 과달키비르 강변을 따라 내려가 스페인 광장까지 가는 코스를 추천합니다.' },
      { icon: 'warn', faIcon: 'fa-triangle-exclamation', html: '구시가지 골목은 보행자가 많으니 속도를 낮추고, 자전거 반납 위치를 미리 확인하세요.' },
      { icon: 'note', faIcon: 'fa-mobile-screen', html: 'Sevici 앱을 미리 설치하면 실시간 자전거 잔여량과 정류장 위치를 확인할 수 있습니다. 30분마다 재도킹하면 무료로 계속 탈 수 있습니다.' },
    ],
    highlight: {
      html: '<strong><i class="fa-solid fa-circle-info"></i> 팁</strong><br>짧게 탈 거면 Sevici 공유 자전거, 반나절 이상 여유롭게 탈 거면 일반 대여점이 편합니다. 261개 정류장, 2,600대 이상의 자전거가 도시 곳곳에 배치되어 있습니다.',
    },
    map: { q: 'Sevici Sevilla Plaza de Espana', link: 'https://www.google.com/maps/search/Sevici+Sevilla/' },
  },
];

export default activities;
