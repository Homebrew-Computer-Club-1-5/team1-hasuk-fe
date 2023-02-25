import styled from 'styled-components';
import filledHeart from '../../assets/FilledHeart.png';
import emptyHeart from '../../assets/EmptyHeart.png';
import { useState, useEffect } from 'react';
import { UPDATE_WISH_HOUSE } from '../../lib/gql';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import DisappearingMessageBox from './DisappearingMessageBox';

const Wrapper = styled.div`
  position: relative;
`;

const Heart = styled.button`
  width: 30px;
  height: 30px;
  background-position: center;
  background-size: cover;
  border: none;
  background-color: transparent;
  position: absolute;
  right: 30px;
  top: 30px;
  z-index: 50;
`;

interface IZzim {
  style?: React.CSSProperties;
  house_id?: number;
  is_checked?: number | null;
}

function Zzim({ style, house_id, is_checked }: IZzim) {
  const [toggle, setToggle] = useState<boolean>(
    Number(is_checked) === 1 ? true : false,
  );
  const [message, setMessage] = useState(0);
  const [zzimHouse, { data, loading: zzimHouseLoading, error }] = useMutation(
    UPDATE_WISH_HOUSE,
    {
      onCompleted: (data) => {
        console.log('완료');
        setToggle((current) => !current);
        setMessage(1);
      },
      onError(error, clientOptions) {
        console.log('에러', error);
      },
    },
  );

  useEffect(() => {
    if (is_checked === 1) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, [is_checked]);

  const loggedIn = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  function executeZzimHouse() {
    zzimHouse({
      variables: {
        house_id: house_id,
      },
    });
  }

  function onEmptyHeartClickHandler(event: any) {
    event.stopPropagation();
    loggedIn ? executeZzimHouse() : navigate('/auth/login');
    console.log(house_id);
    setMessage(0);
  }
  function onFilledHeartClickHandler(event: any) {
    event.stopPropagation();
    loggedIn ? executeZzimHouse() : navigate('/auth/login');
    console.log('삭제');
    setMessage(0);
  }
  return (
    <Wrapper style={style}>
      {toggle ? (
        <Heart
          style={{ backgroundImage: `url(${filledHeart})` }}
          onClick={onFilledHeartClickHandler}
        />
      ) : (
        <Heart
          style={{ backgroundImage: `url(${emptyHeart})` }}
          onClick={onEmptyHeartClickHandler}
        />
      )}
      {message == 1 ? (
        toggle ? (
          <DisappearingMessageBox message="해당 집을 찜하였습니다" />
        ) : (
          <DisappearingMessageBox message="해당 집을 찜 해제하였습니다" />
        )
      ) : null}
    </Wrapper>
  );
}

export default Zzim;
