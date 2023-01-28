import DaumPostcodeEmbed from 'react-daum-postcode';
import { useEffect } from 'react';
import { useState } from 'react';
import WhitePill from './WhitePill';
import { useRecoilState } from 'recoil';
import { status, information, Iinfo } from '../../pages/create/atoms';
import { template } from '@babel/core';
import InputTemplate from './InputTemplate';
import { useForm } from 'react-hook-form';
declare global {
  interface Window {
    kakao: any;
  }
}
const resultWrapperStyle = {
  width: '300px',
  height: '50px',
  borderRadius: '10px',
  padding: '10px 15px',
  backgroundColor: '#e4e4e4',
};
const addressWrapperStyle = {
  width: '70vw',
  height: '50vh',
  borderRadius: '10%',
};

function AddressMaker() {
  const { register } = useForm();
  const [toggle, setToggle] = useState(false);
  const [finish, setFinish] = useState(false);
  const [info, setInfo] = useRecoilState(information);
  const newInfo = {
    tel: info.tel,
    univ: info.univ,
    area: info.area,
    address: info.address,
    latitude: info.latitude,
    longitude: info.longitude,
    monthly: info.monthly,
    deposit: info.deposit,
    fee: info.fee,
    gender: info.gender,
    category: info.category,
    etc: info.etc,
  };
  const geocoder = new window.kakao.maps.services.Geocoder();
  const callback = function (result: any, status: any) {
    if (status === window.kakao.maps.services.Status.OK) {
      newInfo.latitude = result[0].y;
      newInfo.longitude = result[0].x;
      setInfo({ ...newInfo });
    }
  };
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `,${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? `(${extraAddress})` : '';
    }
    setFinish(true);
    newInfo.address = fullAddress;
    setInfo({ ...newInfo });
    if (fullAddress) {
      geocoder.addressSearch(fullAddress, callback);
    }
  };

  useEffect(() => {
    console.log(info);
  }, [info]);
  return (
    <>
      {finish ? (
        <div style={resultWrapperStyle}>{newInfo.address}</div>
      ) : (
        <WhitePill
          text={'주소검색'}
          onClickNavigator={() => setToggle(!toggle)}
        />
      )}

      <div style={addressWrapperStyle}>
        {toggle ? <DaumPostcodeEmbed onComplete={handleComplete} /> : null}
      </div>
    </>
  );
}

export default AddressMaker;
