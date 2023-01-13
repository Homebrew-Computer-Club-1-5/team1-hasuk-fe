// import ImgCarousel from '../../../components/molecules/ImgCarousel';
// import { useQuery, gql } from '@apollo/client';
// import { useRecoilState } from 'recoil';
// import { houseDataAtom } from '../../../store/atoms';

// function House() {
//   const [houseData, setHouseData] = useRecoilState(houseDataAtom);
//   const GET_TEST_HOUSE = gql`
//     query {
//       fetchHouseTest(house_id: "house1") {
//         contact_number
//         gender
//         min_residence
//         house_other_info
//         has_empty
//         img_url
//         house_location {
//           latitude
//           longitude
//         }
//         cost {
//           month_cost
//           deposit
//           cost_other_info
//         }
//         category_name
//       }
//     }
//   `;
//   const { loading, error, data } = useQuery(GET_TEST_HOUSE, {
//     onCompleted: (data) => {
//       console.log(data.fetchHouseTest);
//       setHouseData((current) => data.fetchHouseTest);
//     },
//   });

//   if (loading) {
//     return (
//       <>
//         <h1>로딩중!!!</h1>
//       </>
//     );
//   } else {
//     return <>{<ImgCarousel img_url={houseData.img_url} />}</>;
//   }
// }

// export default House;
