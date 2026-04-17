// src/data/mapLocations.js
// Seville travel map locations with coordinates [lng, lat]
// Coordinates verified via Google Maps (2025-04)
// categories: 'accommodation' | 'attraction' | 'restaurant' | 'dessert' | 'shopping' | 'daytrip' | 'activity'

const mapLocations = [

  /* ============================
     숙소 (Accommodation)
  ============================ */
  {
    id: 'mush-room-apartamentos',
    name: 'MUSH ROOM APARTAMENTOS',
    nameEn: 'The Mush Rooms Apartamentos Turisticos',
    category: 'accommodation',
    coords: [-5.9907, 37.3925],
    address: 'C. Imagen, 4, Casco Antiguo, 41003 Sevilla',
    visited: true,
    desc: '세비야 구시가지 중심, 라스 세타스와 산 페드로 광장 사이. 아파트형 숙소라 조리 가능. Booking.com 8.7/10, 위치 9.6/10.',
    price: '가성비 최고 추천',
    mapLink: 'https://maps.app.goo.gl/jDLUhG5ErsW6fMV77',
  },

  /* ============================
     명소 (Attractions)
  ============================ */
  {
    id: 'plaza-espana',
    name: '스페인 광장',
    nameEn: 'Plaza de España',
    category: 'attraction',
    coords: [-5.9869, 37.3772],
    address: 'Av. Isabel la Católica, 41004 Sevilla',
    visited: true,
    desc: '1929년 이베로아메리카 박람회를 위해 조성된 세비야 대표 랜드마크. 아르데코·르네상스 양식, 타일 장식, 운하와 다리. 낮·해질녘·밤 분위기가 모두 달라 여러 번 방문 추천.',
    price: '무료',
    mapLink: 'https://maps.app.goo.gl/fL3nVGyjWkTESVrF7',
  },
  {
    id: 'metropol-parasol',
    name: '메트로폴 파라솔',
    nameEn: 'Setas de Sevilla',
    category: 'attraction',
    coords: [-5.9918, 37.3932],
    address: 'Pl. de la Encarnación, s/n, Casco Antiguo, 41003 Sevilla',
    visited: true,
    desc: '구시가지 한가운데 놓인 거대한 목조 버섯 모양 전망대. 일몰 시간대 방문 강력 추천.',
    price: '약 15유로 (일몰권 18유로)',
    mapLink: 'https://maps.app.goo.gl/UNNknHALSuqVXiHw5',
  },
  {
    id: 'catedral-sevilla',
    name: '세비야 대성당',
    nameEn: 'Catedral de Sevilla',
    category: 'attraction',
    coords: [-5.9926, 37.3857],
    address: 'Av. de la Constitución, s/n, Casco Antiguo, 41004 Sevilla',
    visited: true,
    desc: '세계 최대급 고딕 성당. 히랄다 탑, 콜럼버스 묘, 거대한 제단화가 핵심. 온라인 예매 추천.',
    price: '온라인 20유로 / 현장 21유로',
    mapLink: 'https://maps.app.goo.gl/rBQbsjuQMr1nZWrw5',
  },
  {
    id: 'alcazar',
    name: '알카사르',
    nameEn: 'Real Alcázar de Sevilla',
    category: 'attraction',
    coords: [-5.9902, 37.3831],
    address: 'Casco Antiguo, 41004 Sevilla',
    visited: true,
    desc: '분수 가득한 정원, 화려한 아치, 무데하르 양식 왕궁. 세비야 최고의 건축 유산. 시간 지정 예매 필수.',
    price: '일반 15.50유로',
    mapLink: 'https://maps.app.goo.gl/Rv8jURjzT1fpgBHQ7',
  },

  /* ============================
     맛집 (Restaurants)
  ============================ */
  {
    id: 'bendala-braseria',
    name: 'Bendala Braseria',
    nameEn: '브라세리아 · 참치 타르타르',
    category: 'restaurant',
    coords: [-5.9866, 37.3854],
    address: 'P.º de Catalina de Ribera, 4, Casco Antiguo, 41004 Sevilla',
    visited: true,
    desc: '와사비 아이스크림을 얹은 참치 타르타르와 이베리코 갈비. 알카사르·산타 크루스 지구 동선에 넣기 좋음.',
    price: '1인 20~30유로',
    mapLink: 'https://maps.app.goo.gl/niMsbZw2kzBc6aKd9',
  },
  {
    id: 'uno-de-delicias',
    name: 'Uno de Delicias',
    nameEn: '수제 버거 맛집',
    category: 'restaurant',
    coords: [-5.9952, 37.3820],
    address: 'P.º de las Delicias, 1, Casco Antiguo, 41001 Sevilla',
    visited: true,
    desc: '수제 버거 맛집. 스페인 음식이 살짝 물릴 때 좋은 선택지. 강변·황금의 탑 산책 동선과 잘 맞음.',
    price: '1인 10~20유로',
    mapLink: 'https://maps.app.goo.gl/kNePxJpRkFws6UGi6',
  },
  {
    id: 'bar-el-comercio',
    name: 'Bar El Comercio',
    nameEn: '타파스 바 · 츄러스',
    category: 'restaurant',
    coords: [-5.9928, 37.3909],
    address: 'C. Lineros, 9, Casco Antiguo, 41004 Sevilla',
    desc: '츄러스 맛집으로 유명한 오래된 바. 초콜라테와 함께 가볍게. 항상 사람이 많아 아침이나 애매한 시간 방문 추천.',
    price: '간식 1~10유로',
    mapLink: 'https://maps.app.goo.gl/PWAiRFFaYDbf4FBe6',
  },
  {
    id: 'kukuchurro',
    name: 'Kukuchurro',
    nameEn: '추로스 전문점 · Plaza del Salvador',
    category: 'restaurant',
    coords: [-5.9931, 37.3898],
    address: 'Pl. del Salvador, 15, Casco Antiguo, 41004 Sevilla',
    desc: '살바도르 광장의 추로스 전문점. 바삭한 추로스와 진한 초콜라테 조합.',
    mapLink: 'https://maps.app.goo.gl/MPT9f9B5oor7eBJW7',
  },

  /* ============================
     디저트 (Dessert)
  ============================ */
  {
    id: 'helados-la-abuela',
    name: 'Helados La Abuela',
    nameEn: '아이스크림 · C. Larana',
    category: 'dessert',
    coords: [-5.9942, 37.3865],
    address: 'C. Larana, 10, Casco Antiguo, 41003 Sevilla',
    visited: true,
    desc: '직원은 불친절할 수 있지만 아이스크림은 맛있는 곳. 라스 세타스 전후 디저트 코스로 추천.',
    mapLink: 'https://maps.app.goo.gl/5HocvYznvrnae6vWA',
  },

  /* ============================
     쇼핑 (Shopping)
  ============================ */
  {
    id: 'orange-tree-sevilla',
    name: 'Orange Tree Sevilla',
    nameEn: '오렌지 기념품점',
    category: 'shopping',
    coords: [-5.9890, 37.3862],
    address: 'C/ Ximénez de Enciso, 22, Casco Antiguo, 41004 Sevilla',
    desc: '세비야 오렌지 테마의 술, 꿀, 잼, 과자, 향 제품. 퀄리티가 좋아 가족·친구 선물용으로 추천.',
    mapLink: 'https://maps.app.goo.gl/snah1ZzJfMLzM1kf6',
  },

  /* ============================
     액티비티 (Activity)
  ============================ */
  {
    id: 'sevici-bike',
    name: '세비야 자전거 대여',
    nameEn: 'Sevici · 과달키비르 강변 라이딩',
    category: 'activity',
    coords: [-5.9887, 37.3797],
    address: '세비야 시내 Sevici 정류장 · 스페인 광장 앞',
    desc: '평지가 많고 180km+ 자전거 전용도로. 구시가지 → 강변 → 마리아 루이사 공원 → 스페인 광장 코스 추천. Sevici 1일권 2.59유로.',
    price: '1일권 2.59유로 / 30분 이내 무료',
    mapLink: 'https://www.google.com/maps/search/Sevici+Sevilla/',
  },

  /* ============================
     근교 투어 (Day Trips)
  ============================ */
  {
    id: 'granada',
    name: '그라나다',
    nameEn: 'Granada · Alhambra',
    category: 'daytrip',
    coords: [-3.5883, 37.1760],
    address: 'Granada, Andalucía (세비야에서 약 250km)',
    visited: true,
    desc: '알람브라 궁전 하나만으로도 갈 가치가 있는 도시. 나스르 궁전 시간 지정 입장이 핵심. 열차 약 2.5~3시간.',
    mapLink: 'https://www.google.com/maps/place/Granada/',
  },
  {
    id: 'ronda',
    name: '론다',
    nameEn: 'Ronda · Puente Nuevo',
    category: 'daytrip',
    coords: [-5.1659, 36.7407],
    address: 'Ronda, Málaga (세비야에서 약 130km)',
    desc: '누에보 다리와 깊은 협곡이 하이라이트. 사진보다 실제 스케일이 훨씬 큼. 버스 약 2~2.5시간.',
    mapLink: 'https://www.google.com/maps/place/Ronda/',
  },
  {
    id: 'cadiz',
    name: '카디스',
    nameEn: 'Cádiz · Atlantic Coast',
    category: 'daytrip',
    coords: [-6.2833, 36.5333],
    address: 'Cádiz, Andalucía (세비야에서 약 120km)',
    visited: true,
    desc: '대서양 바다와 오래된 성벽, 카디스 대성당이 어우러진 해안 도시. 기차 약 1.5~2시간. 당일치기로 부담 없음.',
    mapLink: 'https://www.google.com/maps/place/Cádiz/',
  },
  {
    id: 'cordoba',
    name: '코르도바',
    nameEn: 'Córdoba · Mezquita',
    category: 'daytrip',
    coords: [-4.7745, 37.8742],
    address: 'Córdoba, Andalucía (세비야에서 약 140km)',
    desc: '메스키타의 붉고 흰 아치 숲이 핵심. 이슬람·가톨릭 건축이 겹쳐진 독특한 공간. 고속열차 약 45분.',
    mapLink: 'https://www.google.com/maps/place/Córdoba/',
  },
];

export default mapLocations;
