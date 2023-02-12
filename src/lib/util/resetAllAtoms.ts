import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  contactNumberAtom,
  costOtherInfoAtom,
  depositAtom,
  genderAtom,
  houseCategoryIdAtom,
  houseOtherInfoAtom,
  isEditingAtom,
  latitudeAtom,
  longitudeAtom,
  monthCostAtom,
  previewAtom,
  countfileAtom,
  regionIdAtom,
  statusAtom,
  tempaddressAtom,
  universityIdAtom,
  isUppingAtom,
} from '../../store/atoms';
import useClearIdxedDBValue from './clearIdxedDBValue';

export default function useResetAllAtoms() {
  const [isEditing, setIsEditing] = useRecoilState(isEditingAtom);
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
  const [address, setAddress] = useRecoilState(tempaddressAtom);
  const [stat, setStat] = useRecoilState(statusAtom);
  const [imgFile, setImgFile] = useRecoilState(countfileAtom);
  const [preview, setPreview] = useRecoilState(previewAtom);
  const setIsUpping = useSetRecoilState(isUppingAtom);
  const clearIdxedDBValue = useClearIdxedDBValue();

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
    setIsUpping(false);
    clearIdxedDBValue();
  }

  return resetAllAtoms;
}
