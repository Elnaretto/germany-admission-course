document.addEventListener('DOMContentLoaded', function () {
  const uniMapContainer = document.getElementById('germany-map'); // ИЗМЕНЕНО: Ищем по 'germany-map'
  if (!uniMapContainer) {
    // Контейнер не найден — выходим, чтобы не мешать другим картам
    return;
  }

  // Инициализация карты Leaflet
  const map = L.map('germany-map').setView([51.1657, 10.4515], 6); // ИЗМЕНЕНО: Инициализируем по 'germany-map'

  // Добавляем слой OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Университеты с описаниями
  const universities = [
    {
      name: "Universität Bremen",
      coords: [53.1068, 8.8522],
      description: "Один из лучших в Германии по экологическим наукам, data science и космосу (центр космических технологий). Англоязычные магистратуры."
    },
    {
      name: "Universität Potsdam",
      coords: [52.4009, 13.0125],
      description: "В 30 минутах от Берлина, кампус во дворце. Крутые программы по политологии, образованию, праву, data science и public management."
    },
    {
      name: "Universität Duisburg-Essen",
      coords: [51.4582, 6.7724],
      description: "Крупный вуз с сильным инженерным и ИТ-направлением. Легко поступить на технические англоязычные магистратуры."
    },
    {
      name: "Universität Leipzig",
      coords: [51.3397, 12.3731],
      description: "Известен своими гуманитарными и естественнонаучными программами, крупный университет с долгой историей."
    },
    {
      name: "Universität Bayreuth",
      coords: [49.9481, 11.5789],
      description: "Специализируется на глобальных и африканских исследованиях, бизнесе и устойчивом развитии."
    },
    {
      name: "Universität Augsburg",
      coords: [48.3584, 10.9055],
      description: "Модерновый кампус, много англоязычных программ, сильные направления: информатика, экономические науки, устойчивое развитие."
    },
    {
      name: "Universität Hohenheim",
      coords: [48.7148, 9.2155],
      description: "Лучший в Германии по аграрным и продовольственным наукам. Кампус в барочном дворце."
    },
    {
      name: "FAU Erlangen",
      coords: [49.5970, 11.0044],
      description: "Один из крупнейших вузов Германии. Сильное сотрудничество с Siemens. Инженерия, медицина, ИТ, философия."
    },
    {
      name: "Universität Siegen",
      coords: [50.8739, 8.0206],
      description: "Отличный выбор для гуманитариев, digital humanities, журналистов и педагогов."
    },
    {
      name: "Europa-Universität Viadrina",
      coords: [52.3436, 14.5501],
      description: "Специализация на международном праве, политологии, бизнесе и культурологии. Много англоязычных курсов."
    },
    {
      name: "Oldenburg",
      coords: [53.1435, 8.2136],
      description: "Carl von Ossietzky Universität известен программами по возобновляемым источникам энергии и когнитивным наукам. Очень международный."
    },
    {
      name: "Universität Rostock",
      coords: [54.0853, 12.1349],
      description: "Крупный университет с сильными программами в области медицины, естественных и гуманитарных наук."
    },
    {
      name: "Universität Koblenz",
      coords: [50.3569, 7.5886],
      description: "Специализируется на педагогике, информатике и социальных науках."
    },
    {
      name: "Universität Kassel",
      coords: [51.3127, 9.4797],
      description: "Университет с междисциплинарными программами, акцент на устойчивое развитие."
    },
    {
      name: "TU Ilmenau",
      coords: [50.6833, 10.9333],
      description: "Технический университет с сильными инженерными и ИТ программами."
    }
  ];

  // Цвета маркеров — яркий жёлтый с черной обводкой (как в style.css)
  const markerOptions = {
    radius: 9,
    fillColor: '#ffcc00',
    color: '#000',
    weight: 3,
    opacity: 1,
    fillOpacity: 1
  };

  universities.forEach(uni => {
    const marker = L.circleMarker(uni.coords, markerOptions).addTo(map);

    // Всплывающее окно с названием и описанием, название — крупнее и отделено пробелом
    const popupContent = `<div style="font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem; margin-bottom: 5px;">${uni.name}</div>
                          <div style="font-family: 'Roboto Mono', monospace; font-size: 0.9rem;">${uni.description}</div>`;

    marker.bindPopup(popupContent);
  });

// Показываем названия городов рядом с маркерами (опционально)
  universities.forEach(uni => {
    L.marker(uni.coords, {
      icon: L.divIcon({
        className: 'city-label',
        html: `<span style="font-family: 'Roboto Mono', monospace; font-size: 0.7rem; font-weight: bold; color: black; background: #ffcc00; padding: 2px 4px; box-shadow: 3px 3px 0 black;">${uni.name.split(' ')[1] || uni.name}</span>`,
        iconSize: [10, 10],
        iconAnchor: [10, -10] // Изменено: метка будет расположена ниже маркера
      }),
      interactive: false // Чтобы не мешать кликам на маркер
    }).addTo(map);
  });

});