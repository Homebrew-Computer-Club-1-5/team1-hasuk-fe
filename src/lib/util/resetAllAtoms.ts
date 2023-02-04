import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  contactNumber,
  costOtherInfo,
  deposit,
  gender,
  houseCategoryId,
  houseOtherInfo,
  isEditingAtom,
  latitude,
  longitude,
  monthCost,
  previewAtom,
  countfileAtom,
  regionId,
  status,
  tempaddress,
  universityId,
} from '../../pages/create/atoms';

export default function useResetAllAtoms() {
  const [isEditing, setIsEditing] = useRecoilState(isEditingAtom);
  const [contact, setContact] = useRecoilState(contactNumber);
  const [univ, setUniv] = useRecoilState(universityId);
  const [region, setRegion] = useRecoilState(regionId);
  const [lat, setLat] = useRecoilState(latitude);
  const [long, setLong] = useRecoilState(longitude);
  const [month, setMonth] = useRecoilState(monthCost);
  const [depo, setDepo] = useRecoilState(deposit);
  const [costother, setCostother] = useRecoilState(costOtherInfo);
  const [gen, setGen] = useRecoilState(gender);
  const [cat, setCat] = useRecoilState(houseCategoryId);
  const [other, setOther] = useRecoilState(houseOtherInfo);
  const [address, setAddress] = useRecoilState(tempaddress);
  const [stat, setStat] = useRecoilState(status);
  const [imgFile, setImgFile] = useRecoilState(countfileAtom);
  const [preview, setPreview] = useRecoilState(previewAtom);

  function resetAllAtoms() {
    setIsEditing(false);
    setContact('');
    setStat({ status: 0 });
    setUniv(0);
    setRegion(0);
    setLat(0);
    setLong(0);
    setMonth(0);
    setDepo(0);
    setCostother('');
    setGen(0);
    setCat(0);
    setOther('');
    setAddress('');
    setImgFile(0);
    setPreview([]);
  }

  return resetAllAtoms;
}
