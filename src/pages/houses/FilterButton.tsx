import { ReactComponent as FilterButtonSVG } from '../../assets/FilterButton.svg';
function FilterButton() {
  return (
    <>
      <FilterButtonSVG
        style={{
          width: '47px', //
          position: 'absolute',
          right: 0,
        }}
      />
    </>
  );
}
export default FilterButton;
