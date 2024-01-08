const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [54.91, 23.89],
  zoom: 12
});

const paint = new mapboxgl.Paint();
const brush = new mapboxgl.Mapbox.MapboxGL.Brush();

map.addControl(brush);

const paintData = new mapboxgl.Data({
  type: 'features',
  features: []
});

brush.on('draw', (event) => {
  const feature = {
    type: 'Feature',
    geometry: {
      type: event.type,
      coordinates: event.coordinates
    },
    properties: {
      color: paint.colors[event.color]
    }
  };

  paintData.addFeature(feature);
  map.paint('paint', paintData);
});

const clearButton = document.createElement('button');
clearButton.textContent = 'Clear Paint';
clearButton.addEventListener('click', () => {
  paintData.features = [];
  map.paint('paint', paintData);
});

document.body.appendChild(clearButton);