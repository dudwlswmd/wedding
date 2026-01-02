import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/Home.css';
import mainImage from '../assets/images/main.jpeg';
import introImageA from '../assets/images/intro.png';
import introImageB from '../assets/images/intro_b.jpeg';

const Home = () => {
  // 갤러리 로컬 이미지 임포트
  // 추가 이미지가 생기면 아래 배열에 이어서 임포트하고 리스트에 추가하세요.
  // 파일명이 다르면 경로를 맞춰 수정하면 됩니다.
  // jpeg, png 혼합되어 있어 확장자에 유의합니다.
  // eslint-disable-next-line import/no-duplicates
  const happyBirthday = require('../assets/images/happy-birthday-lettering.png');
  const mapImage = require('../assets/images/map.png');
  const phone = require('../assets/images/p-icon2.png');
  const mainVideo = require('../assets/video/light.mp4');
  const happyBirthdayVideo = require('../assets/video/happy.mp4');
  const img01 = require('../assets/images/01.jpeg');
  const img04 = require('../assets/images/04.jpeg');
  const img05 = require('../assets/images/05.jpeg');
  const img06 = require('../assets/images/06.jpeg');
  const img07 = require('../assets/images/07.jpeg');
  const img08 = require('../assets/images/08.jpeg');
  const img09 = require('../assets/images/09.jpeg');
  const img10 = require('../assets/images/10.jpeg');
  const img11 = require('../assets/images/11.jpeg');
  const img12 = require('../assets/images/12.jpeg');
  const img13 = require('../assets/images/13.jpeg');
  const img14 = require('../assets/images/14.jpeg');
  const img15 = require('../assets/images/15.jpeg');
  const img16 = require('../assets/images/16.jpeg');
  const img17 = require('../assets/images/17.jpeg');
  const img18 = require('../assets/images/18.jpeg');
  const img19 = require('../assets/images/19.jpeg');
  const img20 = require('../assets/images/20.jpeg');
  const img21 = require('../assets/images/21.png');

  const [countdown, setCountdown] = useState({ d: '00', h: '00', m: '00', s: '00' });
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(9);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewSwiper, setPreviewSwiper] = useState(null);
  const previewRef = useRef(null);
  const [animFromIndex, setAnimFromIndex] = useState(null);
  const [showIntroA, setShowIntroA] = useState(true);
  const [showIntroB, setShowIntroB] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [closingContact, setClosingContact] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const scrollLockRef = useRef(null);
  const contentVisible = !showIntroA && !showIntroB;
  const [contentShown, setContentShown] = useState(false);

  const contacts = [
    { id: 'ct-syg', label: '신랑 아버지', name: '송의권', phone: '010-8893-3103' },
    { id: 'ct-aunt', label: '신랑 어머니', name: '안정자', phone: '010-4880-3106' },
    // { id: 'ct-groom', label: '신랑', name: '송윤제', phone: '010-3456-7890' },
  ];

  const openContact = () => {
    setClosingContact(false);
    setShowContact(true);
  };
  const closeContact = () => {
    setClosingContact(true);
    setTimeout(() => {
      setShowContact(false);
      setClosingContact(false);
    }, 300);
  };

  const handleCopyText = async (text, id) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopiedField(id);
      setTimeout(() => setCopiedField(null), 1200);
    } catch {
      alert('복사에 실패했어요. 직접 길게 눌러 복사해주세요.');
    }
  };

  // 레퍼런스 카드 데이터(동일한 분위기와 섹션)
  const weddingInfo = {
    groom: { name: '송윤제', phone: '01000000000', father: '송의권', mother: '안정자' },
    bride: { name: '이미현', phone: '01000000000', father: '이남일', mother: '최선자' },
    date: '2026.01.24 토요일',
    dateISO: '2026-01-24T00:00:00+09:00',
    venue: '라비에벨웨딩 9층 오페라홀',
    address: '경기 부천시 원미구 길주로 105',
    tel: '032-325-2000',
    mapLink: 'https://map.naver.com/v5/entry/place/18882983?c=14117332.1690110,4492284.4186230,15,0,0,0,dh',
  };

  const gallerySources = [
    img04, img05, img06, img07, img08, img09, img10,
    img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
    img21,
  ];
  const galleryImages = gallerySources.map((src, idx) => ({
    id: idx + 1,
    src,
    alt: `gallery-${idx + 1}`,
  }));
  const visibleImages = galleryImages.slice(0, Math.min(visibleCount, galleryImages.length));

  // 계좌 섹션은 현재 숨김 처리되어 있어 관련 데이터 제거

  // 2026-01-24 달력 생성 (컴퓨터 기준으로 유동 계산, 월은 weddingInfo.dateISO 기준)
  const calendarWeeks = useMemo(() => {
    const target = new Date(weddingInfo.dateISO);
    // month info
    const year = target.getFullYear();
    const month = target.getMonth(); // 0-based
    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastOfMonth.getDate();
    const firstWeekday = firstOfMonth.getDay(); // 0=Sun
    // previous month trailing days to fill grid
    const prevMonthLast = new Date(year, month, 0).getDate();
    const cells = [];
    // leading blanks (prev month)
    for (let i = 0; i < firstWeekday; i += 1) {
      const dayNum = prevMonthLast - firstWeekday + 1 + i;
      cells.push({
        date: new Date(year, month - 1, dayNum),
        inMonth: false,
        isWedding: false,
      });
    }
    // current month days
    for (let d = 1; d <= daysInMonth; d += 1) {
      const dateObj = new Date(year, month, d);
      const isWedding =
        dateObj.getFullYear() === 2026 &&
        dateObj.getMonth() === 0 &&
        dateObj.getDate() === 24;
      cells.push({
        date: dateObj,
        inMonth: true,
        isWedding,
      });
    }
    // trailing blanks (next month) to complete rows of 7
    while (cells.length % 7 !== 0) {
      const nextIndex = cells.length - (firstWeekday + daysInMonth);
      cells.push({
        date: new Date(year, month + 1, nextIndex + 1),
        inMonth: false,
        isWedding: false,
      });
    }
    // group into weeks
    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }
    return weeks;
  }, [weddingInfo.dateISO]);

  useEffect(() => {
    const target = new Date(weddingInfo.dateISO).getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const d = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
      const h = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      const m = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
      const s = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
      setCountdown({ d, h, m, s });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [weddingInfo.dateISO]);

  useEffect(() => {
    const t1 = window.setTimeout(() => {
      setShowIntroA(false);
      setShowIntroB(true);
    }, 4000); // +1s gap after A finishes before starting B
    const t2 = window.setTimeout(() => {
      setShowIntroB(false);
    }, 7400); // extend B by +0.4s for clearer perception
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  // 인트로 동안 스크롤 잠금, 종료 시 복원
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    const isIntroVisible = showIntroA || showIntroB;
    if (isIntroVisible) {
      if (!scrollLockRef.current) {
        scrollLockRef.current = {
          overflow: document.body.style.overflow,
          touchAction: document.body.style.touchAction,
          overscrollBehavior: document.body.style.overscrollBehavior,
          position: document.body.style.position,
          top: document.body.style.top,
          left: document.body.style.left,
          right: document.body.style.right,
          width: document.body.style.width,
          htmlOverflow: document.documentElement.style.overflow,
          htmlOverscroll: document.documentElement.style.overscrollBehavior,
          htmlHeight: document.documentElement.style.height,
          scrollY: window.scrollY,
        };
      }
      // lock root
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overscrollBehavior = 'none';
      document.documentElement.style.height = '100%';
      // lock body (iOS Safari fix: position:fixed with stored scrollY)
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.overscrollBehavior = 'none';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollLockRef.current.scrollY || 0}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      // prevent scroll events
      window.addEventListener('touchmove', preventDefault, { passive: false });
      window.addEventListener('wheel', preventDefault, { passive: false });
      return () => {
        window.removeEventListener('touchmove', preventDefault);
        window.removeEventListener('wheel', preventDefault);
      };
    }
    // restore when intro hidden
    if (scrollLockRef.current) {
      // restore root
      document.documentElement.style.overflow = scrollLockRef.current.htmlOverflow || '';
      document.documentElement.style.overscrollBehavior = scrollLockRef.current.htmlOverscroll || '';
      document.documentElement.style.height = scrollLockRef.current.htmlHeight || '';
      // restore body
      document.body.style.overflow = scrollLockRef.current.overflow || '';
      document.body.style.touchAction = scrollLockRef.current.touchAction || '';
      document.body.style.overscrollBehavior = scrollLockRef.current.overscrollBehavior || '';
      document.body.style.position = scrollLockRef.current.position || '';
      const topValue = scrollLockRef.current.top || '';
      document.body.style.top = '';
      document.body.style.left = scrollLockRef.current.left || '';
      document.body.style.right = scrollLockRef.current.right || '';
      document.body.style.width = scrollLockRef.current.width || '';
      // restore scroll position
      const prevY = topValue ? Math.abs(parseInt(topValue, 10)) : (scrollLockRef.current.scrollY || 0);
      window.scrollTo(0, prevY);
      scrollLockRef.current = null;
    }
    return undefined;
  }, [showIntroA, showIntroB]);

  // 스크롤 시 순차 페이드인
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.home__reveal'));
    if (elements.length === 0) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 인트로 종료 후 본문 표시를 800ms 지연
  useEffect(() => {
    if (contentVisible) {
      const t = setTimeout(() => setContentShown(true), 800);
      return () => clearTimeout(t);
    }
    setContentShown(false);
    return undefined;
  }, [contentVisible]);

  const closeViewer = () => {
    setViewerOpen(false);
  };

  // 스와이퍼 사용으로 커스텀 터치/화살표 로직 제거

  return (
    <div className="home">
      {showIntroA && (
        <div className="introA">
          <img className="introA__image" src={introImageA} alt="intro A" />
          <h1 className="introA__title">
            <span className="introA__title__lover">LOVER</span>
            <span className="introA__title__of">OF</span>
          </h1>
          <h2 className="introA__title-life">
            <span className="introA__title-life__text">LIFE</span>
            <span className="introA__title-life__border"></span>
          </h2>
        </div>
      )}
      {showIntroB && (
        <div className="introB">
          <img className="introB__image" src={introImageB} alt="intro B" />
          <h1 className="introB__title">
            <span className="introB__title__baby">BABY</span>
            <span className="introB__title__the">THE</span>
          </h1>
          <h2 className="introB__title-date">
            <span className="introB__title-date__text">DAY</span>
            <span className="introB__title-date__border"></span>
          </h2>
        </div>
      )}
      
      <div className={`home__content ${contentShown ? 'is-visible' : ''}`}>
      <div className="home__container">
        <section className='home__container__visuer'>
          <img 
            className='home__container__visuer__image'
            src={mainImage} alt="cover" 
          />
        <video 
          className='home__container__visuer__video' 
          src={mainVideo} 
          autoPlay 
          loop 
          muted 
          playsInline 
        />
          <h1 className='home__container__visuer__title'>Getting Married</h1>
          <p className='home__container__visuer__text-left'>24TH</p>
          <p className='home__container__visuer__text-center'>JAN</p>
          <p className='home__container__visuer__text-right'>2026</p>
        </section>
        <section className="home__hero home__reveal">
            <span className="home__hero__overline">INVITATION</span>
            <p className='home__hero__names'>
              소중한 분들을 초대합니다.
            </p>
            <p className='home__hero__txt'>
            타국에서 서로를 의지하며 지내다 
            <br />
            어느새 둘이 아닌 셋이 되어 
            <br />
            고국으로 돌아왔습니다.
            <br />
            <br />
            늦은 결혼식과 아이의 첫 생일을 겸하여 
            <br />그리웠던 분들을 모시고 
            <br />따뜻한 밥 한 끼 대접하려 합니다.
            <br />
            <br />
            저희 세 식구의 새로운 출발을 격려해 
            <br />주시면 더없는 기쁨으로 간직하겠습니다.
            </p>
        </section>

        <section className="home__section home__families home__reveal">
          <div className="home__families__row">
            <p>
              <span className="home__families__parents">송의권</span>
              <span className="home__families__dot"> · </span>
              <span className="home__families__parents">안정자</span>
              <span className="home__families__suffix">의</span>
            </p>
            <span className="home__families__suffix">아들 </span>
            <span className="home__families__child"> 신랑 송윤제</span>
          </div>
          <div className="home__families__row">
            <span className="home__families__parents">며느리</span>
            <span className="home__families__child"> 신부 파울라 인환테스 산체스</span>
            {/* <span className="home__families__parents">{weddingInfo.bride.father}</span>
            <span className="home__families__dot">·</span>
            <span className="home__families__parents">{weddingInfo.bride.mother}</span>
            <span className="home__families__suffix">의 장녀</span>
            <span className="home__families__child">{weddingInfo.bride.name}</span> */}
          </div>
          <div className="home__families__row">
          <span className="home__families__parents">송윤제</span>
            <span className="home__families__dot"> · </span>
            <span className="home__families__parents">파울라</span>
            <span className="home__families__suffix">의 딸 </span>
            <span className="home__families__child"> 송 훌리아</span>
          </div>
        </section>

        <section className="home__number home__reveal">
          <p className="home__number__text" role="button" tabIndex={0} onClick={openContact}>
            연락하기
          </p>
        </section>

        <section className="home__section home__cover home__reveal">
          <img className="home__cover" src={img01} alt="커버 이미지" loading="lazy" />
          <video 
            className='home__cover__video' 
            src={happyBirthdayVideo} 
            autoPlay 
            loop 
            muted 
            playsInline 
          />
          <p className='home__cover__txt'>
           {/* HAPPY BIRTHDAY */}
           <img src={happyBirthday} alt="커버 이미지" loading="lazy" />
          </p>
        </section>



        <section className="home__section home__countdown home__reveal">
          <div className="home__section__title">D-DAY</div>
          <div className="home__countdown__digits">
            <div className="home__countdown__box">
              <div className="home__countdown__num">{countdown.d}</div>
              <div className="home__countdown__label">Days</div>
            </div>
            <div className="home__countdown__sep">:</div>
            <div className="home__countdown__box">
              <div className="home__countdown__num">{countdown.h}</div>
              <div className="home__countdown__label">Hour</div>
            </div>
            <div className="home__countdown__sep">:</div>
            <div className="home__countdown__box">
              <div className="home__countdown__num">{countdown.m}</div>
              <div className="home__countdown__label">Min</div>
            </div>
            <div className="home__countdown__sep">:</div>
            <div className="home__countdown__box">
              <div className="home__countdown__num">{countdown.s}</div>
              <div className="home__countdown__label">Sec</div>
            </div>
          </div>
        </section>



        <section className="home__section home__gallery home__reveal">
          <div className="home__section__title">
            <span>GALLERY</span>
            가족갤러리
          </div>
          <div className="home__gallery__preview" role="region" aria-label="큰 미리보기" ref={previewRef}>
            <div>
              <Swiper
                modules={[Keyboard]}
                autoHeight={true}
                keyboard={{ enabled: true }}
                onSwiper={setPreviewSwiper}
                onSlideChange={(swiper) => setPreviewIndex(swiper.realIndex)}
                initialSlide={previewIndex}
              >
                {visibleImages.map((img) => (
                  <SwiperSlide key={img.id}>
                    <img
                      className="home__gallery__preview__image"
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <ul className="home__gallery__grid">
            {visibleImages.map((img, idx) => (
              <li
                key={img.id}
                className={`home__gallery__grid__item ${idx === previewIndex ? 'active' : ''} ${animFromIndex !== null && idx >= animFromIndex ? 'entering' : ''}`}
                onClick={() => {
                  setPreviewIndex(idx);
                  if (previewSwiper) {
                    previewSwiper.slideTo(idx);
                  }
                  if (previewRef.current) {
                    previewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                role="button"
                aria-label={`썸네일 선택 ${idx + 1}`}
              >
                <img className="home__gallery__grid__item__image" src={img.src} alt={img.alt} loading="lazy" />
              </li>
            ))}
          </ul>
          {visibleCount < galleryImages.length && (
            <div className="home__gallery__more">
              <button
                className="home__button"
                onClick={() => {
                  setAnimFromIndex(visibleCount);
                  setVisibleCount(galleryImages.length);
                  // 애니메이션 종료 후 상태 정리
                  window.setTimeout(() => setAnimFromIndex(null), 800);
                }}
              >
                MORE
              </button>
            </div>
          )}
        </section>

        <section className="home__section date home__reveal">
          <div className="home__section__title">
            <span>2026.01.24</span>
            토요일 낮 2시 
          </div>
           <table className="home__section__table home__calendar" role="grid" aria-label="2026년 1월 달력">
             <thead className="home__calendar__head">
               <tr className="home__calendar__weekdays">
                 {['일','월','화','수','목','금','토'].map((wd) => (
                   <th key={wd} className="home__calendar__weekday" scope="col">{wd}</th>
                 ))}
               </tr>
             </thead>
             <tbody className="home__calendar__body">
               {calendarWeeks.map((week, wi) => (
                 <tr key={`w-${wi}`} className="home__calendar__week">
                   {week.map((cell, di) => (
                     <td
                       key={`c-${wi}-${di}`}
                       className={
                         `home__calendar__cell ${cell.inMonth ? '' : 'is-dim'} ${cell.isWedding ? 'is-active' : ''}`
                       }
                       aria-selected={cell.isWedding ? 'true' : 'false'}
                     >
                       <span className="home__calendar__date">{cell.date.getDate()}</span>
                     </td>
                   ))}
                 </tr>
               ))}
             </tbody>
           </table>
        </section>

        <section className="home__section home__location home__reveal">
          <div className="home__section__title">오시는 길</div>
          <img className="home__location__image" src={mapImage} alt="location" />
          <div className="home__card home__location__card">
            <div className="home__location__row">
              <div className="home__location__venue">마벨리에 평촌점</div>
              <button
                className={`home__copy ${copiedField === 'venue' ? 'is-copied' : ''}`}
                onClick={() => handleCopyText('마벨리에 평촌점', 'venue')}
                aria-label="장소명 복사"
              >
                {copiedField === 'venue' ? '복사됨' : '복사'}
              </button>
            </div>
            <div className="home__location__row">
              <div className="home__location__addr">경기 안양시 동안구 관평로 175 1층 마벨리에</div>
              <button
                className={`home__copy ${copiedField === 'addr' ? 'is-copied' : ''}`}
                onClick={() => handleCopyText('경기 안양시 동안구 관평로 175 1층 마벨리에', 'addr')}
                aria-label="주소 복사"
              >
                {copiedField === 'addr' ? '복사됨' : '복사'}
              </button>
            </div>
            <div className="home__location__row">
              <div className="home__location__tel">Tel. 0507-1438-3015</div>
              <button
                className={`home__copy ${copiedField === 'tel' ? 'is-copied' : ''}`}
                onClick={() => handleCopyText('0507-1438-3015', 'tel')}
                aria-label="전화번호 복사"
              >
                {copiedField === 'tel' ? '복사됨' : '복사'}
              </button>
            </div>
            {/* <div className="home__location__nav">
              <a className="home__button" href={weddingInfo.mapLink} target="_blank" rel="noreferrer">네이버지도</a>
              <a className="home__button" href="https://www.tmap.co.kr/tmap" target="_blank" rel="noreferrer">티맵</a>
              <a className="home__button" href="https://kakaonavi.map.kakao.com/" target="_blank" rel="noreferrer">카카오내비</a>
            </div> */}
            <div className="home__location__tips">
              <div className="home__location__tip"><b>지하철</b> 평촌역 1번 출구에서 474m</div>
              <div className="home__location__tip"><b>주차</b> 마벨리에 평촌점 주차장</div>
            </div>
          </div>
        </section>


        {/* <section className="home__section home__accounts home__reveal">
          <div className="home__section__title">
            <span>ACCOUNT</span>
            마음 전하실 곳
          </div>
          <p className='home__accounts__text'>
              참석이 어려우신 분들을 위해
              <br />
              계좌번호를 기재했습니다.
              <br />
              부디 너그러운 마음으로 양해 부탁드리겠습니다.
              <br />
              <br />
              감사합니다.
          </p>
          <div className="home__accounts__group">
            <div className="home__accounts__list">
              {accounts.filter(a => a.side === 'groom').map((acc) => (
                <div key={acc.id} className={`home__card home__accounts__item ${copiedAccountId === acc.id ? 'active' : ''}`}>
                  <div className="home__accounts__item__top">
                    <span className="home__accounts__item__holder">{acc.holder}</span>
                    <span className="home__accounts__item__bank">{acc.bank}</span>
                  </div>
                  <div className="home__accounts__item__number">{acc.number}</div>
                  <button
                    className="home__button home__button--copy"
                    onClick={() => handleCopyAccount(`${acc.bank} ${acc.number} (${acc.holder})`, acc.id)}
                  >
                    {copiedAccountId === acc.id ? '복사됨' : '복사하기'}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </section> */}

        <footer className="home__footer home__reveal">
          <p className="home__footer__text">와 주셔서 감사합니다.</p>
        </footer>
      </div>
      </div>

      {viewerOpen && (
        <div className="home__viewer">
          <div className="home__viewer__overlay" onClick={closeViewer} />
          <div className="home__viewer__content">
            <button className="home__viewer__close" onClick={closeViewer} aria-label="닫기">✕</button>
            <Swiper
              modules={[Navigation, Pagination, Keyboard]}
              autoHeight={true}
              navigation
              pagination={{ clickable: true }}
              keyboard={{ enabled: true }}
              initialSlide={viewerIndex}
              onSlideChange={(swiper) => {
                const idx = swiper.realIndex;
                setViewerIndex(idx);
                if (idx < visibleImages.length) {
                  setPreviewIndex(idx);
                }
              }}
              style={{ width: '100%', height: 'auto' }}
            >
              {galleryImages.map((img) => (
                <SwiperSlide key={img.id}>
                  <img className="home__viewer__image" src={img.src} alt={img.alt} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="home__viewer__counter">{viewerIndex + 1} / {galleryImages.length}</div>
          </div>
        </div>
      )}

      {showContact && (
        <div className={`contact ${closingContact ? 'is-leaving' : 'is-entering'}`} role="dialog" aria-modal="true" aria-label="연락처">
          <div className="contact__overlay" onClick={closeContact} />
          <div className="contact__panel">
            <div className="contact__header">
              <div className="contact__title"><span>CONTACT</span>연락하기</div>
              <p className="contact__close" onClick={closeContact} aria-label="닫기">
                <span></span>
                <strong></strong>
              </p>
            </div>
            <ul className="contact__list">
              {contacts.map((c) => (
                <li key={c.id} className="contact__item">
                  <div className="contact__who">
                    <div className="contact__role">{c.label}</div>
                    <div className="contact__name">{c.name}</div>
                  </div>
                  <div className="contact__actions">
                    <a className="contact__btn contact__btn--primary" href={`tel:${c.phone.replace(/-/g, '')}`}>
                      <img src={phone} alt="전화" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;