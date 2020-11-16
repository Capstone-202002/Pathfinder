import React, { useState, useEffect } from "react";
import Visualization from "./Component/Visualization/Visualization";
import Mainframe from "./Component/Visualization/Mainframe/Mainframe";
const { app } = window.require('electron').remote
const path = window.require('path')
// function 컴포넌트에서 state, effect 를 사용하기 위해 Hook을 사용합니다
function HookTest() {
  // 새로운 state 변수 선언, count
  // uststate(state의 초깃값), [해당 state, 변수 갱신 함수] 반환
  const [count, setCount] = useState(0);
  // componentDidMount, componentDidUpdate와 같은 방식으로 작동
  useEffect(() => {
    //브라우저 API를 이용하여 문서 타이틀을 업데이트
    //근데 electron은 nodejs 상에서 돌리기 때문에 안되는듯
    document.title = "You clicked ${count} times";
    
  }, [count]); // count state가 바뀔때만 useEffect 실행한다는 뜻, 과도하게 실행되어 발생하는 overhead 방지
  
  return (
    <>
      <Mainframe />
    </>
  );
}

export default HookTest;
