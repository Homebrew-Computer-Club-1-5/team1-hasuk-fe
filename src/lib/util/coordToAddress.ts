export default function useCoordToAddress() {
  function coordToAddress(
    latitude: number | void,
    longitude: number | void,
    setState: any,
  ) {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(latitude, longitude);
    const callback = function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        setState((current: any) => result[0].road_address.address_name);
      }
    };

    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }
  return coordToAddress;
}
