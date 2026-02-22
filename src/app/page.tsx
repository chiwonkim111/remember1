"use client";

import { useState } from "react";
import ProfileScreen from "@/components/ProfileScreen";
import DiaryScreen from "@/components/DiaryScreen";
import CheckinScreen from "@/components/CheckinScreen";
import MarketScreen from "@/components/MarketScreen";
import PeerScreen from "@/components/PeerScreen";
import AiSyncScreen from "@/components/AiSyncScreen";
import { ChevronLeft, Bell } from "lucide-react";

const NAV_TITLES = ['내 프로필', '프로필 다이어리', 'Q1 성과 체크인', '내 시장가치', '동료 상호 인증', 'AI 로그 동기화'];
const NAV_ACTIONS = ['', '', '', '', '', '동기화'];

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [history, setHistory] = useState<number[]>([1]);
  const [activeTab, setActiveTab] = useState(1);

  // ── 전역 공유 상태 ──────────────────────────────────
  const [profileCompletion, setProfileCompletion] = useState(72);
  const [marketValue, setMarketValue] = useState(8500);
  const [checkinDone, setCheckinDone] = useState(false);
  const [syncedContent, setSyncedContent] = useState<string>(
    "VINAIDA 앱의 AI 상담 시스템 고도화 완료. GPT-4 프롬프트 최적화로 API 비용 30% 절감 + 사용자 응답 만족도 4.2 → 4.7점 향상 달성."
  );
  const [showBellModal, setShowBellModal] = useState(false);
  // ────────────────────────────────────────────────────

  const navigate = (id: number) => {
    setCurrentScreen(id);
    setHistory(prev => [...prev, id]);
    if (id === 0 || id === 1) setActiveTab(id);
  };

  const goBack = () => {
    if (history.length > 1) {
      const next = [...history];
      next.pop();
      const prev = next[next.length - 1];
      setCurrentScreen(prev);
      setHistory(next);
      if (prev === 0 || prev === 1) setActiveTab(prev);
    }
  };

  const handleCheckinComplete = () => {
    setProfileCompletion(prev => Math.min(100, prev + 13));
    setMarketValue(prev => Math.round(prev * 1.08));
    setCheckinDone(true);
  };

  const isBackVisible = history.length > 1;
  const isMainScreen = currentScreen === 0 || currentScreen === 1;

  return (
    <>
      {/* Status Bar */}
      <div className="h-10 bg-white flex items-end px-6 pb-1.5 shrink-0 z-50">
        <span className="text-[14px] font-bold text-black tracking-tight">9:41</span>
      </div>

      {/* Nav Bar */}
      <div className="h-[52px] bg-white flex items-center px-4 border-b border-[#E8E8E8] shrink-0 relative z-40">
        {/* 좌측: 뒤로가기 (고정 너비 w-10) */}
        <div
          className="w-10 h-8 flex items-center justify-start cursor-pointer"
          onClick={goBack}
          style={{ visibility: isBackVisible ? 'visible' : 'hidden' }}
        >
          <ChevronLeft className="w-5 h-5 text-black" strokeWidth={2.5} />
        </div>
        {/* 중앙: 타이틀 */}
        <div className="flex-1 text-center text-[15px] font-bold text-black tracking-tight">
          {NAV_TITLES[currentScreen]}
        </div>
        {/* 우측: 벨(메인) 또는 액션텍스트(서브) — 고정 너비 w-10 */}
        <div className="w-10 h-8 flex items-center justify-end">
          {isMainScreen ? (
            <button
              className="w-8 h-8 flex items-center justify-center cursor-pointer relative"
              onClick={() => setShowBellModal(true)}
            >
              <Bell className="w-[18px] h-[18px] text-black" />
              <div className="absolute top-[6px] right-[5px] w-[6px] h-[6px] bg-[#FE5314] rounded-full" />
            </button>
          ) : (
            <span className="text-[13px] font-bold text-[#FE5314] cursor-pointer uppercase tracking-wide">
              {NAV_ACTIONS[currentScreen]}
            </span>
          )}
        </div>
      </div>

      {/* Top Tab Bar */}
      <div className="h-[44px] bg-white border-b border-[#E8E8E8] flex shrink-0 z-30">
        <TopTab label="프로필" active={activeTab === 0} onClick={() => navigate(0)} />
        <TopTab label="다이어리" active={activeTab === 1} hasBadge={!checkinDone} onClick={() => navigate(1)} />
      </div>

      {/* Screen Content */}
      <div className="flex-1 overflow-hidden relative">
        {currentScreen === 0 && (
          <ProfileScreen
            navigate={navigate}
            profileCompletion={profileCompletion}
            marketValue={marketValue}
            checkinDone={checkinDone}
          />
        )}
        {currentScreen === 1 && (
          <DiaryScreen navigate={navigate} checkinDone={checkinDone} marketValue={marketValue} />
        )}
        {currentScreen === 2 && (
          <CheckinScreen
            navigate={navigate}
            syncedContent={syncedContent}
            onComplete={handleCheckinComplete}
          />
        )}
        {currentScreen === 3 && (
          <MarketScreen navigate={navigate} marketValue={marketValue} checkinDone={checkinDone} />
        )}
        {currentScreen === 4 && <PeerScreen />}
        {currentScreen === 5 && (
          <AiSyncScreen
            navigate={navigate}
            onSyncContent={(content) => setSyncedContent(content)}
          />
        )}
      </div>

      {/* 전역 알림 모달 */}
      {showBellModal && (
        <div
          className="absolute inset-0 bg-black/60 z-50 flex items-end"
          onClick={() => setShowBellModal(false)}
        >
          <div
            className="w-full bg-white rounded-t-lg px-5 pb-8 animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-8 h-[3px] bg-[#E0E0E0] rounded-full mx-auto mt-4 mb-5" />
            <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mb-3">알림</div>
            <div className="flex flex-col gap-3 mb-5">
              {!checkinDone && (
                <div className="border-l-2 border-[#FE5314] pl-3 py-1">
                  <div className="text-[14px] font-black text-black">Q1 체크인 마감 D-7</div>
                  <div className="text-[12px] text-[#666666] mt-0.5">지금 입력하면 시장가치가 최대 +8% 상승해요.</div>
                </div>
              )}
              <div className="border-l-2 border-[#AAAAAA] pl-3 py-1">
                <div className="text-[14px] font-black text-black">이서연님 인증 대기 D-3</div>
                <div className="text-[12px] text-[#666666] mt-0.5">동료 인증 완료 시 면접 전환율 +15%.</div>
              </div>
            </div>
            {!checkinDone ? (
              <button
                className="w-full bg-[#FE5314] text-white text-[15px] font-black py-4 rounded cursor-pointer active:opacity-80"
                onClick={() => { setShowBellModal(false); navigate(2); }}
              >
                Q1 성과 입력하기 →
              </button>
            ) : (
              <button
                className="w-full bg-black text-white text-[15px] font-black py-4 rounded cursor-pointer active:opacity-80"
                onClick={() => { setShowBellModal(false); navigate(4); }}
              >
                동료 인증 확인하기 →
              </button>
            )}
          </div>
        </div>
      )}

    </>
  );
}

function TopTab({ label, active, hasBadge, onClick }: {
  label: string; active: boolean; hasBadge?: boolean; onClick: () => void;
}) {
  return (
    <button
      className="flex-1 relative flex items-center justify-center cursor-pointer bg-white"
      onClick={onClick}
    >
      <span className={`text-[14px] tracking-tight transition-colors ${active ? 'font-bold text-black' : 'font-medium text-[#AAAAAA]'}`}>
        {label}
      </span>
      {active && <div className="absolute bottom-0 left-[25%] right-[25%] h-[2px] bg-[#FE5314] rounded-full" />}
      {hasBadge && <div className="absolute top-[10px] right-[calc(50%-28px)] w-[6px] h-[6px] bg-[#FE5314] rounded-full" />}
    </button>
  );
}
