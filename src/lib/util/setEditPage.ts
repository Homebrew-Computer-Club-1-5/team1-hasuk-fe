import { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  contactNumberAtom,
  costOtherInfoAtom,
  depositAtom,
  genderAtom,
  googleLinkAtom,
  googleLinkCountAtom,
  houseCategoryIdAtom,
  houseOtherInfoAtom,
  IfetchMyHouse,
  latitudeAtom,
  longitudeAtom,
  monthCostAtom,
  regionIdAtom,
  statusAtom,
  tempaddressAtom,
  universityIdAtom,
} from '../../store/atoms';

export default function useSetEditPage() {
  const [contact, setContact] = useRecoilState(contactNumberAtom);
  const [univ, setUniv] = useRecoilState(universityIdAtom);
  const [region, setRegion] = useRecoilState(regionIdAtom);
  const [lat, setLat] = useRecoilState(latitudeAtom);
  const [long, setLong] = useRecoilState(longitudeAtom);
  const [month, setMonth] = useRecoilState(monthCostAtom);
  const [depo, setDepo] = useRecoilState(depositAtom);
  const [costother, setCostother] = useRecoilState(costOtherInfoAtom);
  const [gen, setGen] = useRecoilState(genderAtom);
  const [cat, setCat] = useRecoilState(houseCategoryIdAtom);
  const [other, setOther] = useRecoilState(houseOtherInfoAtom);
  const [stat, setStat] = useRecoilState(statusAtom);
  const [address, setAddress] = useRecoilState(tempaddressAtom);
  const [googleLink, setGoogleLink] = useRecoilState(googleLinkAtom);
  const [googleLinkCount, setGoogleLinkCount] =
    useRecoilState(googleLinkCountAtom);

  interface IsetEditPage {
    address: string;
    houseData: IfetchMyHouse;
  }
  const setEditPage = ({ houseData, address }: IsetEditPage) => {
    const house_id = houseData.id;
    setAddress((current) => address);
    setContact(houseData.contact_number);
    setStat({ status: 0 });
    setUniv(1);
    setRegion(houseData.region);
    setLat(houseData.location.latitude as any);
    setLong(houseData.location.longitude as any);
    setMonth(houseData.cost.month_cost);
    setDepo(houseData.cost.deposit);
    setCostother(houseData.cost.other_info);
    setGen(houseData.gender);
    setCat(houseData.house_category);
    setOther(houseData.house_other_info);
    setGoogleLink(houseData.img_urls as any);
    setGoogleLinkCount(houseData.img_urls.length as any);
    //setAddress();
    // setImgFile({});
    // setPreview(data?.img_urls as any);
  };
  return setEditPage;
}
