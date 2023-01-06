import React from 'react'
import PoapFrag from '@modules/PoapFrag'
import Cover from '@assets/cover.png'

const FackPoapData = {
  cover: Cover,
  claimed: '100,123',
  address: "cfx:acc0kdpwsfj6uc2bx6hxfu972jkej96wxu4fvsaa4s",
  name: "大展鸿🐰 - 新年元素",
  description: "这里是 Desc：每天免费领取 1 个，邀请好友还..集齐 5 款不同的新年元素，可合成典藏款 POAP ",
  date: "2021.01.16",
  endData:"2023.01.22",
  link: 'https://app.anyweb.cc/#/pages/index/home',
  available: 3
}
const Home: React.FC = () => {
  return (
    <>
      <PoapFrag {...FackPoapData} />
    </>
  )
}
export default Home
