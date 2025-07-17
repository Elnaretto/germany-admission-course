document.addEventListener('DOMContentLoaded', function () {
    const mapContainer = document.getElementById('germany-map');
    if (!mapContainer) {
        console.error("Map container #germany-map not found! The map will not display.");
        return; // Выходим, если контейнер карты не найден
    }
    console.log("Map container #germany-map found:", mapContainer);
    console.log("Map container clientWidth:", mapContainer.clientWidth, "clientHeight:", mapContainer.clientHeight);

    // Инициализация карты Leaflet
    const map = L.map('germany-map').setView([51.1657, 10.4515], 6); // Центр Германии, зум 6

    console.log("Leaflet map object created:", map);

    // Добавление слоя OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Очень важно: заставляет Leaflet пересчитать размер контейнера карты.
    // Это часто помогает, если контейнер карты не полностью отрисован
    // или его размеры не определены при первой инициализации Leaflet.
    // Задержка дает браузеру время на рендеринг DOM и CSS.
    setTimeout(function() {
        map.invalidateSize();
        console.log("map.invalidateSize() called. Map should now be visible.");
        console.log("Map container clientWidth after invalidateSize:", mapContainer.clientWidth, "clientHeight after invalidateSize:", mapContainer.clientHeight);
    }, 200); // Немного уменьшил задержку, обычно 200мс достаточно.

    // Данные о городах и стоимости жизни
    const cities = [
        { name: "Magdeburg", lat: 52.1303, lon: 11.6352, cost: 900 }, // Передал числа для getColor
        { name: "Ilmenau", lat: 50.6869, lon: 10.9109, cost: 900 },
        { name: "Aachen", lat: 50.7753, lon: 6.0839, cost: 1200 },
        { name: "Münster", lat: 51.9616, lon: 7.6283, cost: 1200 },
        { name: "Halle", lat: 51.4828, lon: 11.9696, cost: 1300 },
        { name: "Bonn", lat: 50.7374, lon: 7.0982, cost: 1400 },
        { name: "Tübingen", lat: 48.5200, lon: 9.0582, cost: 1400 },
        { name: "Rostock", lat: 54.0924, lon: 12.1251, cost: 1500 },
        { name: "Cologne", lat: 50.9375, lon: 6.9603, cost: 1600 },
        { name: "Freiburg", lat: 47.9990, lon: 7.8421, cost: 1700 },
        { name: "Frankfurt", lat: 50.1109, lon: 8.6821, cost: 1700 },
        { name: "Hamburg", lat: 53.5511, lon: 10.0007, cost: 1900 },
        { name: "Berlin", lat: 52.5200, lon: 13.4050, cost: 2100 },
        { name: "München", lat: 48.1351, lon: 11.5820, cost: 2300 }
    ];

    // Функция для определения цвета маркера в зависимости от стоимости
    function getColor(cost) { // Теперь cost - это число
        return cost > 2000 ? '#800026' : // Темно-красный
               cost > 1800 ? '#BD0026' : // Красный
               cost > 1600 ? '#E31A1C' : // Ярко-красный
               cost > 1400 ? '#FC4E2A' : // Оранжево-красный
               cost > 1200 ? '#FD8D3C' : // Оранжевый
               cost > 1000 ? '#FEB24C' : // Светло-оранжевый
                             '#FFEDA0';  // Желтый
    }

    // Добавление круговых маркеров для каждого города
    cities.forEach(city => {
        const marker = L.circleMarker([city.lat, city.lon], {
            radius: 8,
            fillColor: getColor(city.cost),
            color: "#000", // Черная обводка в бруталистическом стиле
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9
        }).addTo(map);

        marker.bindPopup(`<b>${city.name}</b><br>Стоимость жизни: €${city.cost}`); // Добавил € обратно для отображения
    });

    // Добавление бруталистической легенды
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend neo-brutalist'); // Применяем ваши стили из CSS
        const grades = [900, 1100, 1300, 1500, 1700, 1900, 2100];
        let labels = ['<h4>Ежемесячная стоимость (€)</h4>'];

        for (let i = 0; i < grades.length; i++) {
            const from = grades[i];
            const to = grades[i + 1];

            labels.push(
                `<i style="background:${getColor(from)}; display:inline-block; width:18px; height:18px; border:2px solid #000; margin-right:8px;"></i> ` +
                from + (to ? '&ndash;' + to : '+'));
        }

        div.innerHTML = labels.join('<br>');
        return div;
    };

    legend.addTo(map);
});