import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Header from '../components/header/header'
import Rides from '../components/rides/rides'
import { IRide, IUser } from '../components/utils/types'
import styles from '../styles/Home.module.css'
const Home: NextPage<{rides : IRide[],user : IUser,  locations :  {state : string, cities: string[]}[] }> = ({rides,user , locations}) => {
  return (
    <div >
      <Header user={user}/>
      <Rides rides={rides} locations={locations} />
    </div>
  )
}
export async function getServerSideProps() {
  let locations : Map<string,string[]> = new Map<string,string[]>();
  let finlocations : {state : string, cities : string[]}[] = [];
  let rides_req = await axios.get("https://assessment.api.vweb.app/rides");
  let rides : IRide[] = rides_req.data;
  let user_req = await axios.get("https://assessment.api.vweb.app/user");
  let user : IUser = user_req.data;
  //Calculate the distances
  for(let x of rides) {
    let least_distance = Number.MAX_VALUE;
    for (let y =0; y < x.station_path.length;y++){
      if(Math.abs(x.station_path[y] - user.station_code) < least_distance ){
        least_distance = Math.abs(x.station_path[y] - user.station_code); 
      }
      x.distance = least_distance;
    }
  }
  rides = rides.sort((a,b) => {
    if(a.distance > b.distance) {
      return 1;
    }
    if(a.distance < b.distance) {
      return -1;
    }
    return 0;
  })
  for(let x of rides) {
    if(locations.has(x.state)) {
      if(!locations.get(x.state)?.includes(x.city)) {
        locations.get(x.state)?.push(x.city);
      }
    }else {
      locations.set(x.state,[x.city]);
    }
  }
  locations.forEach((value , key) => {
    finlocations.push({state : key,cities: value});
  })
  return {
    props : {
      rides :rides,
      user : user,
      locations :finlocations 
    }
  }
}
export default Home
