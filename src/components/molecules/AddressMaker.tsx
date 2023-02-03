import DaumPostcodeEmbed from 'react-daum-postcode';
import { useEffect } from 'react';
import { useState } from 'react';
import WhitePill from './WhitePill';
import { useRecoilState } from 'recoil';
import { status, tempaddress } from '../../pages/create/atoms';
import { template } from '@babel/core';
import InputTemplate from './InputTemplate';
import { useForm } from 'react-hook-form';
declare global {
  interface Window {
    kakao: any;
  }
}
const searchButtonStyle = {
  marginBottom: '20px',
};
const resultStyle = {
  height: '50px',
  borderRadius: '10px',
  padding: '10px 15px',
  backgroundColor: '#e4e4e4',
  width: '100%',
};
const addressStyle = {
  width: '70vw',
  height: '50vh',
  border: '1px solid black',
  margin: ' 10px auto',
  overflow: 'scroll',
};

const resultWrapperStyle = {
  display: 'flex',
  marginBottom: '20px',
};

const resultTitleStyle = {
  fontWeight: 990,
  fontSize: '12px',
  width: '80px',
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
      setToggle(!toggle);
    }
  };

  useEffect(() => {
    getCoordsValue(coordinate);
  }, [coordinate]);
  return (
    <>
      {address !== '0' ? (
        <div style={resultWrapperStyle}>
          <p style={resultTitleStyle}>주소</p>
          <div style={resultStyle}>{address as string}</div>
        </div>
      ) : null}
      <WhitePill
        style={searchButtonStyle}
        text={'주소검색'}
        onClickNavigator={() => setToggle(!toggle)}
      />

      <div>
        {toggle ? (
          <DaumPostcodeEmbed
            style={addressStyle}
            onComplete={handleComplete}
            autoClose={false}
          />
        ) : null}
      </div>
    </>
  );
}

export default AddressMaker;
