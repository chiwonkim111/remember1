"use client";

import { useState } from "react";
import ProfileScreen from "@/components/ProfileScreen";
import DiaryScreen from "@/components/DiaryScreen";
import CheckinScreen from "@/components/CheckinScreen";
import MarketScreen from "@/components/MarketScreen";
import PeerScreen from "@/components/PeerScreen";
import AiSyncScreen from "@/components/AiSyncScreen";
import { ChevronLeft } from "lucide-react";

const NAV_TITLES = ['내 프로필', '프로필 다이어리', 'Q1 성과 체크인', '내 시장가치', '동료 상호 인증', 'AI 로그 동기화'];
const NAV_ACTIONS = ['편집', '', '', '', '', '동기화'];

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [history, setHistory] = useState<number[]>([1]);
  const [activeTab, setActiveTab] = useState(1);

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

  const isBackVisible = history.length > 1;

  return (
    <>
      {/* Status Bar */}
      <div className="h-10 bg-white flex items-end px-6 pb-1.5 shrink-0 z-50">
        <span className="text-[14px] font-bold text-black tracking-tight">9:41</span>
      </div>

      {/* Nav Bar */}
      <div className="h-[52px] bg-white flex items-center px-4 border-b border-[#E8E8E8] shrink-0 relative z-40">
        <div
          className="w-8 h-8 flex items-center justify-center cursor-pointer"
          onClick={goBack}
          style={{ visibility: isBackVisible ? 'visible' : 'hidden' }}
        >
          <ChevronLeft className="w-5 h-5 text-black" strokeWidth={2.5} />
        </div>
        <div className="flex-1 text-center text-[15px] font-bold text-black tracking-tight">
          {NAV_TITLES[currentScreen]}
        </div>
        <div className="text-[13px] font-bold text-[#FE5314] cursor-pointer w-10 text-right uppercase tracking-wide">
          {NAV_ACTIONS[currentScreen]}
        </div>
      </div>

      {/* Top Tab Bar — 프로필 / 다이어리 only */}
      <div className="h-[44px] bg-white border-b border-[#E8E8E8] flex shrink-0 z-30">
        <TopTab
          label="프로필"
          active={activeTab === 0}
          onClick={() => navigate(0)}
        />
        <TopTab
          label="다이어리"
          active={activeTab === 1}
          hasBadge
          onClick={() => navigate(1)}
        />
      </div>

      {/* Screen Content */}
      <div className="flex-1 overflow-hidden relative">
        {currentScreen === 0 && <ProfileScreen navigate={navigate} />}
        {currentScreen === 1 && <DiaryScreen navigate={navigate} />}
        {currentScreen === 2 && <CheckinScreen navigate={navigate} />}
        {currentScreen === 3 && <MarketScreen navigate={navigate} />}
        {currentScreen === 4 && <PeerScreen />}
        {currentScreen === 5 && <AiSyncScreen />}
      </div>
    </>
  );
}

function TopTab({
  label, active, hasBadge, onClick,
}: {
  label: string;
  active: boolean;
  hasBadge?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className="flex-1 relative flex items-center justify-center cursor-pointer bg-white transition-colors"
      onClick={onClick}
    >
      <span className={`text-[14px] tracking-tight transition-colors ${active ? 'font-bold text-black' : 'font-medium text-[#AAAAAA]'}`}>
        {label}
      </span>
      {/* Active underline */}
      {active && (
        <div className="absolute bottom-0 left-[25%] right-[25%] h-[2px] bg-[#FE5314] rounded-full" />
      )}
      {/* Notification dot */}
      {hasBadge && (
        <div className="absolute top-[10px] right-[calc(50%-28px)] w-[6px] h-[6px] bg-[#FE5314] rounded-full" />
      )}
    </button>
  );
}
