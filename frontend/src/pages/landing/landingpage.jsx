import React,{Fragment} from 'react'
import HeroSection from '../../components/landing/fragment1'
import Header from '../../components/landing/header'
import Fragment2 from '../../components/landing/fragment2'
import QRCodeSection from '../../components/landing/fragment3.'
import Pridiction from '../../components/landing/pridiction'
import Solution from '../../components/landing/solution'
import Footer from '../../components/landing/Footer'
const Landingpage = () => {
  return (
    <Fragment>
      <Header />
      <HeroSection/>
      <Fragment2/>
      <QRCodeSection/>
      <Pridiction/>
      <Solution/>
      <Footer/>
    </Fragment>
  )
}

export default Landingpage
