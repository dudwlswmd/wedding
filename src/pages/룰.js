import React, { useState } from 'react';

function Main({

}) {

  return (
    <>
      <div className="main">
        <RullClass />
      </div>
    </>
  );
}

export default Main;




//일단 클래스는 bem스타일로 제작하고
//훅은 최대한 직관적이고 간결하게 html안에 쓰게 만들고있음 간단하게


const RullClass = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <section className="rullClass">
      <div className="rullClass__inner">
        <article className="rullClass__inner__title">
          <p>RULL CLASS</p>
        </article>
        <article className="rullClass__inner__content">
          <div 
            className={`rullClass__inner__content__item ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => setActiveTab(1)}
          >
            룰 아이템 탭 예시1
          </div>
          <div 
            className={`rullClass__inner__content__item ${activeTab === 2 ? 'active' : ''}`}
            onClick={() => setActiveTab(2)}
          >
            룰 아이템 탭 예시2
          </div>
          <div 
            className={`rullClass__inner__content__item ${activeTab === 3 ? 'active' : ''}`}
            onClick={() => setActiveTab(3)}
          >
            룰 아이템 탭 예시3
          </div>
        </article>
      </div>
    </section>
  );
};



const RullHook = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <section className="rullClass">
      <div className="rullClass__inner">
        <article className="rullClass__inner__title">
          <p>RULL CLASS</p>
        </article>
        <article className="rullClass__inner__content">
          <div 
            className={`rullClass__inner__content__item ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => setActiveTab(1)}
          >
            룰 아이템 탭 예시1
          </div>
          <div 
            className={`rullClass__inner__content__item ${activeTab === 2 ? 'active' : ''}`}
            onClick={() => setActiveTab(2)}
          >
            룰 아이템 탭 예시2
          </div>
          <div 
            className={`rullClass__inner__content__item ${activeTab === 3 ? 'active' : ''}`}
            onClick={() => setActiveTab(3)}
          >
            룰 아이템 탭 예시3
          </div>
        </article>
      </div>
    </section>
  );
};

