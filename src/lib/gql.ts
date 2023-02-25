import { gql } from '@apollo/client';

export const FETCH_HOUSES_BY_REGION = gql`
  query ($region_id: Float!) {
    fetchHousesByRegion(region_id: $region_id) {
      region_name
      id
      month_cost
      img_urls
      gender
      nearest_main_spot_name
      house_category_id
      board_date
    }
  }
`;

export const FETCH_HOUSES_BY_REGION_LOGINED = gql`
  query ($region_id: Float!) {
    fetchHousesByRegionLogined(region_id: $region_id) {
      region_name
      id
      month_cost
      img_urls
      gender
      nearest_main_spot_name
      house_category_id
      board_date
      is_wish
    }
  }
`;

export const FETCH_ALL_HOUSES = gql`
  query {
    fetchAllHouses {
      id
      gender
      board_date
      region {
        id
        name
      }
      house_cost {
        month_cost
      }
      imgs {
        img_url
      }
      house_category {
        id
        name
      }
    }
  }
`;

export const FETCH_ALL_HOUSES_LOGINED = gql`
  query {
    fetchAllHousesLogined {
      id
      is_wished
      gender
      board_date
      region {
        id
        name
      }
      house_cost {
        month_cost
      }
      imgs {
        img_url
      }
      house_category {
        id
        name
      }
    }
  }
`;

export const FETCH_HOUSE_BY_MARKER = gql`
  query ($house_id: Float!) {
    fetchHouse(house_id: $house_id) {
      contact_number
      house_location {
        latitude
        longitude
      }
      house_cost {
        month_cost
      }
      house_category {
        name
        id
      }
      imgs {
        img_url
      }
    }
  }
`;

export const FETCH_HOUSE_BY_MARKER_LOGINED = gql`
  query ($house_id: Float!) {
    fetchHouseLogined(house_id: $house_id) {
      contact_number
      house_location {
        latitude
        longitude
      }
      house_cost {
        month_cost
      }
      house_category {
        name
        id
      }
      imgs {
        img_url
      }
      is_wished
    }
  }
`;

export const FETCH_HOUSE = gql`
  query ($house_id: Float!) {
    fetchHouse(house_id: $house_id) {
      id
      contact_number
      is_crolled
      gender
      house_other_info
      has_empty
      board_date
      imgs {
        img_url
      }
      house_location {
        latitude
        longitude
      }
      house_cost {
        month_cost
        deposit
        other_info
      }
      house_category {
        name
        id
      }
      region {
        id
      }
    }
  }
`;

export const FETCH_HOUSE_LOGINED = gql`
  query ($house_id: Float!) {
    fetchHouseLogined(house_id: $house_id) {
      id
      contact_number
      is_crolled
      gender
      house_other_info
      has_empty
      board_date
      imgs {
        img_url
      }
      house_location {
        latitude
        longitude
      }
      house_cost {
        month_cost
        deposit
        other_info
      }
      house_category {
        name
        id
      }
      region {
        id
      }
      is_wished
    }
  }
`;

export const FETCH_HOUSE_BY_LOCATION = gql`
  query ($longitude: Float!, $latitude: Float!) {
    fetchHouseByLocation(
      location: { latitude: $latitude, longitude: $longitude }
    )
  }
`;

export const CREATE_HOUSE = gql`
  mutation (
    $contact: String
    $gender: Int
    $houseOtherInfo: String
    $latitude: Float!
    $longitude: Float!
    $monthCost: Int!
    $deposit: Int
    $costOtherInfo: String
    $region: Int!
    $category: Int!
    $files: [Upload!]
  ) {
    createHouse(
      createHouseInput: {
        house: {
          contact_number: $contact
          gender: $gender
          house_other_info: $houseOtherInfo
        }
        house_location: { latitude: $latitude, longitude: $longitude }
        house_cost: {
          month_cost: $monthCost
          deposit: $deposit
          other_info: $costOtherInfo
        }
        region_id: $region
        house_category_id: $category
        imgRawDatas: $files
      }
    )
  }
`;

export const UPDATE_WISH_HOUSE = gql`
  mutation ($house_id: Float!) {
    updateWishHouse(house_id: $house_id)
  }
`;

export const UPDATE_MY_HOUSE = gql`
  mutation (
    $house_id: Int!
    $contact: String
    $gender: Int
    $houseOtherInfo: String
    $latitude: Float!
    $longitude: Float!
    $monthCost: Int!
    $deposit: Int
    $costOtherInfo: String
    $region: Int!
    $category: Int!
    $files: [Upload!]
    $googleLinks: [String!]
  ) {
    updateMyHouse(
      updateMyHouseInput: {
        house_id: $house_id
        house: {
          contact_number: $contact
          gender: $gender
          house_other_info: $houseOtherInfo
        }
        house_location: { latitude: $latitude, longitude: $longitude }
        house_cost: {
          month_cost: $monthCost
          deposit: $deposit
          other_info: $costOtherInfo
        }
        region_id: $region
        house_category_id: $category
        imgRawDatas: $files
        googleLinks: $googleLinks
      }
    )
  }
`;

export const FETCH_CRAWLED_HOUSES = gql`
  query {
    fetchCrawledHouses {
      id
      img_urls
      house_category
    }
  }
`;

export const FETCH_ALL_HOUSES_GROUPED_BY_REGION = gql`
  query {
    fetchAllHousesGroupedByRegion {
      name
      id
      houses {
        id
        house_location {
          latitude
          longitude
        }
        house_category {
          id
        }
      }
    }
  }
`;

export const FETCH_MYHOUSE = gql`
  query {
    fetchMyHouse {
      id
      img_urls
      contact_number
      gender
      house_other_info
      region
      cost {
        month_cost
        deposit
        other_info
      }
      house_category
      location {
        longitude
        latitude
      }
      board_date
    }
  }
`;

export const FETCH_MY_WISH_HOUSE = gql`
  query {
    fetchMyWishHouses {
      id
      img_urls
      contact_number
      gender
      house_other_info
      region
      cost {
        month_cost
        deposit
        other_info
      }
      house_category
      location {
        longitude
        latitude
      }
      board_date
    }
  }
`;

export const DELETE_MYHOUSE = gql`
  mutation ($house_id: Float!) {
    deleteMyHouse(house_id: $house_id)
  }
`;

export const FETCH_UP = gql`
  mutation ($house_id: Float!) {
    fetchUp(house_id: $house_id) {
      id
      board_date
    }
  }
`;
