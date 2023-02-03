export function coordToAddress(latitude: number, longitude: number) {
  const geocoder = new window.kakao.maps.services.Geocoder();
  const coord = new window.kakao.maps.LatLng(latitude, longitude);
  const callback = function (result: any, status: any) {
    if (status === window.kakao.maps.services.Status.OK) {
      return result[0].road_address.address_name;
    }
  };
  geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
}
