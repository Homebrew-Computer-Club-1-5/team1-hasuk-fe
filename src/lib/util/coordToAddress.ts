import axios from 'axios';

export default async function useCoordToAddress() {
  async function coordToAddress(
    latitude: number | void,
    longitude: number | void,
    // setState: any,
  ) {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(latitude, longitude);
    const result = await new Promise((resolve, reject) => {
      geocoder.coord2Address(
        coord.getLng(),
        coord.getLat(),
        function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            // setState((current: any) => result[0].road_address.address_name);
            resolve(result[0].road_address.address_name as string);
          }
        },
      );
    });
    return result;
  }
  return coordToAddress;
}

interface IcoordToAddress2 {
  latitude: number;
  longitude: number;
}

export async function coordToAddress2({
  latitude,
  longitude,
}: IcoordToAddress2) {
  const address = await axios
    .get(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
      {
        headers: {
          Authorization: 'KakaoAK d1eec22f5126d3d344721c6f49fd82f4',
        },
      },
    )
    .then((res) => {
      if (res?.data?.documents[0]?.road_address) {
        // console.log(res.data.documents[0]);
        // return '하위';
        return res.data.documents[0].road_address.address_name;
      } else if (res.data.documents[0]?.address) {
        // console.log(res.data);
        // return '하위2';
        return res.data.documents[0]?.address.address_name;
      } else {
        return '주소를 불러올 수 없습니다.';
      }
    });
  return address;
}
