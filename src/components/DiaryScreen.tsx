"use client";

import { useState } from "react";
import { Bell, ChevronRight } from "lucide-react";

export default function DiaryScreen({ navigate }: { navigate: (id: number) => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const showPhase1 = activeTab === 0 || activeTab === 1;
  const showPhase2 = activeTab === 0 || activeTab === 2;

  return (
    <div className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#F5F5F5]">

      {/* Header */}
      <div className="bg-black px-5 pt-5 pb-6">
        <div className="flex justify-between items-start mb-5">
          <div>
            <div className="text-[10px] font-black text-[#FE5314] uppercase tracking-[0.15em] mb-1.5">2026 Q1</div>
            <div className="text-[22px] font-black text-white tracking-tight leading-tight">프로필 다이어리</div>
          </div>
          <button
            className="w-9 h-9 border border-white/20 rounded flex items-center justify-center relative cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <Bell size={16} className="text-white" />
            <div className="absolute top-[7px] right-[7px] w-[6px] h-[6px] bg-[#FE5314] rounded-full" />
          </button>
        </div>

        {/* Phase tabs */}
        <div className="flex gap-1 bg-white/8 rounded p-[3px]">
          {['전체', 'Phase 1', 'Phase 2'].map((tab, i) => (
            <button
              key={tab}
              className={`flex-1 text-center text-[12px] py-2 rounded cursor-pointer transition-colors font-bold ${
                activeTab === i
                  ? 'bg-white text-black'
                  : 'text-white/40'
              }`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="-mt-4 mx-4 bg-white rounded-lg border border-[#E0E0E0] relative z-10 grid grid-cols-3 divide-x divide-[#EBEBEB]">
        {[
          { value: '72%', label: '완성도', color: 'text-black' },
          { value: '3', label: '동료 인증', color: 'text-[#FE5314]' },
          { value: 'Q1', label: '다음 체크인', color: 'text-[#FE5314]' },
        ].map(({ value, label, color }) => (
          <div key={label} className="py-3.5 flex flex-col items-center gap-0.5">
            <div className={`text-[22px] font-black ${color} leading-tight`}>{value}</div>
            <div className="text-[10px] text-[#AAAAAA] font-medium">{label}</div>
          </div>
        ))}
      </div>

      <div className="pt-2 pb-4">

        {/* Phase 1: Check-in */}
        {showPhase1 && (
          <DiaryCard
            onClick={() => navigate(2)}
            label="PHASE 1"
            badge="D-7"
            badgeAccent
            title="Q1 분기 성과 체크인"
            sub="AI가 질문을 준비했어요 · 5분이면 충분해요"
          >
            <div className="text-[12px] text-[#AAAAAA] mb-1.5 font-medium">이번 분기 예상 질문</div>
            <div className="text-[13px] font-semibold text-black bg-[#F5F5F5] p-3 rounded border-l-2 border-[#FE5314] leading-snug">
              "이번 Q1에서 완료하거나 기여한 프로젝트가 있나요?"
            </div>
          </DiaryCard>
        )}

        {/* Phase 1: Market */}
        {showPhase1 && (
          <DiaryCard
            onClick={() => navigate(3)}
            label="PHASE 1"
            title="실시간 시장가치"
            sub="내 연봉 위치 · 채용 제안 가능성"
          >
            <div className="text-[26px] font-black text-[#FE5314] leading-tight tracking-tight">
              7,200 ~ 9,500<span className="text-[16px]">만원</span>
            </div>
            <div className="text-[11px] text-[#AAAAAA] mt-1 mb-3">PM 8년차 · 서울 기준 · 상위 32%</div>
            <div className="flex items-end gap-1 h-8">
              {[16, 24, 40, 28, 14].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-sm ${i === 2 ? 'bg-[#FE5314]' : 'bg-[#EBEBEB]'}`}
                  style={{ height: h }}
                />
              ))}
            </div>
          </DiaryCard>
        )}

        {/* Phase 2: AI Sync */}
        {showPhase2 && (
          <DiaryCard
            onClick={() => navigate(5)}
            label="PHASE 2"
            title="AI 채팅 로그 동기화"
            sub="GPT 대화에서 성과를 자동 추출"
          >
            <div className="text-[11px] text-[#AAAAAA] mb-2 font-medium uppercase tracking-wider">최근 추출된 성과</div>
            <div className="flex flex-wrap gap-1.5">
              {['VINAIDA 앱 출시', 'MAU +40%', 'API 비용 30% 절감'].map(tag => (
                <span key={tag} className="text-[11px] font-bold border border-[#E0E0E0] text-black bg-white px-2.5 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </DiaryCard>
        )}

        {/* Phase 2: Peer */}
        {showPhase2 && (
          <DiaryCard
            onClick={() => navigate(4)}
            label="PHASE 2"
            title="동료 상호 인증"
            sub="신뢰도를 높이세요 · 1건 대기 중"
          >
            <div className="flex flex-col gap-2">
              {[
                { init: '박', name: '박진영 (XOBIS PM)', status: '인증 완료', ok: true },
                { init: '이', name: '이서연 (전 동료)', status: '요청 중', ok: false },
              ].map(row => (
                <div key={row.name} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#F0F0F0] text-black text-[11px] font-black flex items-center justify-center shrink-0">
                    {row.init}
                  </div>
                  <div className="text-[12px] font-semibold text-black flex-1">{row.name}</div>
                  <div className={`text-[11px] font-bold ${row.ok ? 'text-black' : 'text-[#FE5314]'}`}>
                    {row.ok ? '✓ ' : '⏳ '}{row.status}
                  </div>
                </div>
              ))}
            </div>
          </DiaryCard>
        )}

      </div>

      {/* Notification Modal */}
      <div
        className={`absolute inset-0 bg-black/60 z-40 flex items-end transition-opacity ${showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowModal(false)}
      >
        <div
          className={`w-full bg-white rounded-t-lg px-5 pb-8 transition-transform duration-300 ${showModal ? 'translate-y-0' : 'translate-y-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="w-8 h-[3px] bg-[#E0E0E0] rounded-full mx-auto mt-4 mb-5" />
          <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mb-3">알림</div>
          <div className="flex flex-col gap-2 mb-5">
            <div className="border-l-2 border-[#FE5314] pl-3 py-1">
              <div className="text-[14px] font-black text-black">Q1 체크인 마감 D-7</div>
              <div className="text-[12px] text-[#666666] mt-0.5">지금 입력하면 시장가치가 최대 +8% 상승해요.</div>
            </div>
            <div className="border-l-2 border-[#AAAAAA] pl-3 py-1">
              <div className="text-[14px] font-black text-black">이서연님 인증 대기 D-3</div>
              <div className="text-[12px] text-[#666666] mt-0.5">동료 인증 완료 시 면접 전환율 +15%.</div>
            </div>
          </div>
          <button
            className="w-full bg-[#FE5314] text-white text-[15px] font-black py-4 rounded cursor-pointer active:opacity-80 tracking-tight"
            onClick={() => { setShowModal(false); navigate(2); }}
          >
            Q1 성과 입력하기 →
          </button>
        </div>
      </div>

    </div>
  );
}

function DiaryCard({
  onClick, label, badge, badgeAccent, title, sub, children,
}: {
  onClick: () => void;
  label: string;
  badge?: string;
  badgeAccent?: boolean;
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="mt-2.5 mx-4 bg-white rounded-lg border border-[#E0E0E0] overflow-hidden cursor-pointer active:bg-[#FAFAFA] transition-colors"
      onClick={onClick}
    >
      <div className="px-4 pt-4 pb-3 flex items-start justify-between gap-2 border-b border-[#EBEBEB]">
        <div className="flex-1">
          <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mb-1">{label}</div>
          <div className="text-[15px] font-black text-black tracking-tight">{title}</div>
          <div className="text-[12px] text-[#AAAAAA] mt-0.5 font-medium">{sub}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {badge && (
            <span className={`text-[11px] font-black px-2 py-1 rounded ${
              badgeAccent ? 'bg-[#FE5314] text-white' : 'bg-[#F0F0F0] text-[#666666]'
            }`}>
              {badge}
            </span>
          )}
          <ChevronRight className="w-4 h-4 text-[#AAAAAA]" />
        </div>
      </div>
      <div className="px-4 py-3.5">
        {children}
      </div>
    </div>
  );
}
