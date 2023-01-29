import DaumPostcodeEmbed from 'react-daum-postcode';
import { useEffect } from 'react';
import { useState } from 'react';
import WhitePill from './WhitePill';
import { useRecoilState } from 'recoil';
import {
  status,
  information,
  IhouseData,
  tempaddress,
} from '../../pages/create/atoms';
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

interface IObject {
  getCoordsValue: any;
}

function AddressMaker({ getCoordsValue }: IObject) {
  const { register } = useForm();
  const [toggle, setToggle] = useState(false);
  const [finish, setFinish] = useState(false);
  const [address, setAddress] = useRecoilState(tempaddress);
  const [coordinate, setCoordinate] = useState({ latitude: 0, longitude: 0 });

  const geocoder = new window.kakao.maps.services.Geocoder();
  const callback = function (result: any, status: any) {
    if (status === window.kakao.maps.services.Status.OK) {
      setCoordinate({ latitude: result[0].y, longitude: result[0].x });
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
    setAddress(fullAddress);
    if (fullAddress) {
      geocoder.addressSearch(fullAddress, callback);
    }
  };

  useEffect(() => {
    getCoordsValue(coordinate);
  }, [coordinate]);
  return (
    <>
      {address !== '0' ? (
        <div style={resultWrapperStyle}>{address as string}</div>
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
