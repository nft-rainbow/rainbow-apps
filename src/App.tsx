import React from 'react'
import Navigation from '@modules/Navigation'
import PoapFrag from '@modules/PoapFrag'
import Rainbow from '@assets/rainbowIcon.png'
import Cover from '@assets/cover.png'

const FackPoapData = {
  cover: Cover,
  address: "cfx:acc0kdpwsfj6uc2bx6hxfu972jkej96wxu4fvsaa4s",
  name: "金兔贺岁 - 新年元素",
  description: "这里是 Desc：每天免费领取 1 个，邀请好友还..集齐 5 款不同的新年元素，可合成典藏款 POAP ",
  date: "2021.01.16",
  link: 'https://app.anyweb.cc/#/pages/index/home',
  available: 3
}
const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <PoapFrag {...FackPoapData} />
      <footer className='mt-[42px] flex flex-row justify-center items-center'>
        <img src={Rainbow} alt="Rainbow" className='w-[228px] h-[54px] select-none pointer-events-none' draggable={false} /><span className='ml-[7px]'>提供技术支持</span>
      </footer>
    </>
  )
}
export default App
