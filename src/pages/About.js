import React, { useState, useEffect } from 'react';
import '../styles/About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isTyping, setIsTyping] = useState(false);

  // Mock board data
  const boardData = {
    1: [ // 공지사항
      { id: 1, title: '새로운 서비스 오픈 안내', date: '2024-01-15', views: 1234, important: true },
      { id: 2, title: '시스템 점검 안내', date: '2024-01-12', views: 856, important: false },
      { id: 3, title: '업데이트 소식', date: '2024-01-10', views: 945, important: false },
      { id: 4, title: '새해 인사', date: '2024-01-01', views: 2134, important: true },
    ],
    2: [ // FAQ
      { id: 5, title: '자주 묻는 질문 - 계정 관련', date: '2024-01-14', views: 634, category: 'Account' },
      { id: 6, title: '서비스 이용 방법', date: '2024-01-13', views: 892, category: 'Service' },
      { id: 7, title: '결제 및 환불 정책', date: '2024-01-11', views: 1123, category: 'Payment' },
      { id: 8, title: '기술 지원 가이드', date: '2024-01-09', views: 567, category: 'Support' },
    ],
    3: [ // 게시글
      { id: 9, title: '우리 서비스의 미래 비전', date: '2024-01-16', views: 445, author: 'Admin' },
      { id: 10, title: '사용자 후기 모음', date: '2024-01-15', views: 778, author: 'Community' },
      { id: 11, title: '개발 일지 - 1월', date: '2024-01-14', views: 332, author: 'Developer' },
      { id: 12, title: '서비스 개선 사항', date: '2024-01-13', views: 656, author: 'Product' },
    ],
    4: [ // 문의사항
      { id: 13, title: '고객센터 운영 시간', date: '2024-01-16', views: 234, status: 'active' },
      { id: 14, title: '문의 방법 안내', date: '2024-01-15', views: 445, status: 'active' },
      { id: 15, title: '긴급 문의 연락처', date: '2024-01-14', views: 667, status: 'active' },
      { id: 16, title: '피드백 제출 방법', date: '2024-01-13', views: 389, status: 'active' },
    ],
  };

  const tabLabels = ['공지사항', 'FAQ', '게시글', '문의사항'];
  const tabIcons = ['📢', '❓', '📝', '💬'];

  // Typewriter effect for tab change
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const renderBoardItem = (item, index) => {
    const getItemIcon = () => {
      if (activeTab === 1) return item.important ? '⭐' : '📄';
      if (activeTab === 2) return '❔';
      if (activeTab === 3) return '✍️';
      return '💭';
    };

    const getItemBadge = () => {
      if (activeTab === 1 && item.important) return 'important';
      if (activeTab === 2) return item.category?.toLowerCase();
      if (activeTab === 3) return 'article';
      return 'contact';
    };

    return (
      <div 
        key={item.id} 
        className="about__board__content__item"
        style={{ '--delay': `${index * 0.1}s` }}
      >
        <div className="about__board__content__item__header">
          <span className="about__board__content__item__header__icon">
            {getItemIcon()}
          </span>
          <span className={`about__board__content__item__header__badge about__board__content__item__header__badge--${getItemBadge()}`}>
            {activeTab === 1 && item.important && 'Important'}
            {activeTab === 2 && item.category}
            {activeTab === 3 && item.author}
            {activeTab === 4 && 'Contact'}
          </span>
        </div>
        <h3 className="about__board__content__item__title">{item.title}</h3>
        <div className="about__board__content__item__meta">
          <span className="about__board__content__item__meta__date">{item.date}</span>
          <span className="about__board__content__item__meta__views">👁 {item.views}</span>
        </div>
        <div className="about__board__content__item__overlay">
          <span className="about__board__content__item__overlay__text">Read More</span>
        </div>
      </div>
    );
  };

  return (
    <div className="about">
      <div className="about__hero">
        <h1 className={`about__hero__title ${isTyping ? 'typing' : ''}`}>
          소개 페이지
        </h1>
        <p className="about__hero__subtitle">
          다양한 정보를 탭 형태로 확인해보세요
        </p>
      </div>

      <div className="about__board">
        <div className="about__board__navigation">
          {tabLabels.map((label, index) => (
            <button
              key={index}
              className={`about__board__navigation__item ${activeTab === index + 1 ? 'active' : ''}`}
              onClick={() => handleTabChange(index + 1)}
            >
              <span className="about__board__navigation__item__icon">
                {tabIcons[index]}
              </span>
              <span className="about__board__navigation__item__text">
                {label}
              </span>
              <span className="about__board__navigation__item__count">
                {boardData[index + 1].length}
              </span>
            </button>
          ))}
        </div>

        <div className="about__board__content">
          {[1, 2, 3, 4].map((tabNum) => (
            <div
              key={tabNum}
              className={`about__board__content__panel ${activeTab === tabNum ? 'active' : ''}`}
            >
              <div className="about__board__content__panel__header">
                <h2 className="about__board__content__panel__header__title">
                  {tabIcons[tabNum - 1]} {tabLabels[tabNum - 1]}
                </h2>
                <span className="about__board__content__panel__header__count">
                  총 {boardData[tabNum].length}개의 게시물
                </span>
              </div>
              <div className="about__board__content__panel__grid">
                {boardData[tabNum].map((item, index) => renderBoardItem(item, index))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About; 