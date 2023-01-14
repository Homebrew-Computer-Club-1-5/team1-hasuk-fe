import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// const Dummy1 = [
//   { id: 1 },
//   { lat: 37.583, long: 127.031254 },
//   { lat: 37.589377, long: 127.03011 },
// ];

// const Dummy2 = [
//   { id: 2 },
//   { lat: 37.584969, long: 127.032347 },
//   { lat: 37.582546, long: 127.028359 },
// ];

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

// const markers1 = Dummy1.map((coordinate) => {
//   return new window.kakao.maps.Marker({
//     position: new window.kakao.maps.LatLng(coordinate.lat, coordinate.long),
//   });
// });

// const markers2 = Dummy2.map((coordinate) => {
//   return new window.kakao.maps.Marker({
//     position: new window.kakao.maps.LatLng(coordinate.lat, coordinate.long),
//   });
// });

const Map = () => {
  //   const [value, setValue] = useState({ La: 0, Ma: 0 });

  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     let container = document.getElementById('map');
  //     let options = {
  //       center: new window.kakao.maps.LatLng(37.586383, 127.029233),
  //       level: 6,
  //     };
  //     const map = new window.kakao.maps.Map(container, options);
  //     const clusterer1 = new window.kakao.maps.MarkerClusterer({
  //       map: map,
  //       averageCenter: true,
  //       minLevel: 6,
  //       disableClickZoom: true,
  //       texts: 'jjajang',
  //     });
  //     const clusterer2 = new window.kakao.maps.MarkerClusterer({
  //       map: map,
  //       averageCenter: true,
  //       minLevel: 6,
  //       disableClickZoom: true,
  //       texts: '벽산아파트',
  //     });
  //     clusterer1.addMarkers(markers1);
  //     clusterer2.addMarkers(markers2);
  //     window.kakao.maps.event.addListener(
  //       clusterer2,
  //       'clusterclick',
  //       (cluster: any) => {
  //         const coord = cluster.getCenter();
  //         setValue((value.La = coord.La));
  //         setValue((value.Ma = coord.Ma));
  //         const moveLatLng = new window.kakao.maps.LatLng(value.Ma, value.La);

  //         console.log(moveLatLng);
  //         map.setCenter(moveLatLng);
  //         navigate(`/main/${cluster._model.texts}`, {
  //           state: { Latitude: value.Ma, Longitude: value.La },
  //         });
  //       },
  //     );
  //   }, []);

  return <div id="map" style={{ width: '100vw', height: '95vh' }} />;
};

export default Map;
