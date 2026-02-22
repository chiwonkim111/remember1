"use client";

import { useState } from "react";

export default function PeerScreen() {
  const [showModal, setShowModal] = useState(false);
  const [requested, setRequested] = useState<Set<string>>(new Set());
  const [showRequestedMsg, setShowRequestedMsg] = useState(false);

  const handleRequest = (name: string) => {
    setRequested(prev => new Set(prev).add(name));
  };

  const handleComplete = () => {
    setShowModal(false);
    if (requested.size > 0) setShowRequestedMsg(true);
  };

  return (
    <div className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#F5F5F5]">

      {/* Header */}
      <div className="bg-black px-5 pt-6 pb-8">
        <div className="text-[10px] font-black text-[#FE5314] uppercase tracking-[0.2em] mb-2">동료 상호 인증</div>
        <div className="text-[24px] font-black text-white tracking-tight leading-tight">
          신뢰할 수 있는<br />커리어를 만드세요
        </div>
      </div>

      <div className="pb-6">

        {/* Stats */}
        <div className="-mt-4 mx-4 bg-white rounded-lg border border-[#E0E0E0] relative z-10 grid grid-cols-3 divide-x divide-[#EBEBEB]">
          {[
            { val: '3', label: '인증 완료', accent: false },
            { val: String(1 + requested.size), label: '대기 중', accent: true },
            { val: '+15%', label: '면접 전환률↑', accent: true },
          ].map(({ val, label, accent }) => (
            <div key={label} className="py-4 flex flex-col items-center gap-0.5">
              <div className={`text-[22px] font-black leading-tight ${accent ? 'text-[#FE5314]' : 'text-black'}`}>{val}</div>
              <div className="text-[10px] text-[#AAAAAA] font-medium">{label}</div>
            </div>
          ))}
        </div>

        {/* 요청 완료 안내 메시지 */}
        {showRequestedMsg && (
          <div className="mx-4 mt-3 bg-black rounded-lg p-3.5 flex items-start gap-3">
            <div className="text-[20px] shrink-0">✓</div>
            <div>
              <div className="text-[13px] font-black text-white mb-0.5">인증 요청이 전송됐어요</div>
              <div className="text-[11px] text-white/50 leading-snug">
                리멤버 앱 알림과 문자로 안내가 발송됩니다. 동료가 인증을 완료하면 여기에 표시돼요.
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mx-4 mt-3 border-l-2 border-[#FE5314] pl-3 py-1">
          <div className="text-[12px] font-black text-black mb-0.5">인증 마크란?</div>
          <div className="text-[12px] text-[#666666] leading-snug">
            리멤버 명함 DB로 확인된 전·현직 동료가 성과를 검증해 줍니다.
            인증 마크가 있으면 채용 담당자 검색에서 <b>우선 노출</b>됩니다.
          </div>
        </div>

        {/* Career Cards */}
        <div className="px-4 mt-4 flex flex-col gap-3">

          {/* XOBIS */}
          <div className="bg-white rounded-lg border border-[#E0E0E0] overflow-hidden">
            <div className="px-4 pt-4 pb-3 flex items-start gap-3 border-b border-[#EBEBEB]">
              <div className="w-10 h-10 rounded bg-black text-white text-[14px] font-black flex items-center justify-center shrink-0">X</div>
              <div className="flex-1">
                <div className="text-[15px] font-black text-black">XOBIS · PM</div>
                <div className="text-[12px] text-[#666666] mt-0.5">서비스 기획 · AI 프로젝트 리딩</div>
                <div className="text-[11px] text-[#AAAAAA] mt-px">2020.03 — 현재</div>
              </div>
              <span className="text-[11px] font-black border border-black text-black px-2 py-1 rounded shrink-0">✓ 3인 인증</span>
            </div>
            <div className="px-4 pt-3 pb-3 bg-[#FAFAFA]">
              <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mb-2.5">인증한 동료</div>
              <div className="flex flex-col gap-2">
                {[
                  { init: '박', name: '박진영 · XOBIS PM' },
                  { init: '최', name: '최민준 · XOBIS 개발' },
                  { init: '김', name: '김하은 · XOBIS 디자인' },
                ].map(row => (
                  <div key={row.name} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#F0F0F0] text-[11px] font-black flex items-center justify-center shrink-0">{row.init}</div>
                    <div className="text-[12px] font-semibold text-black flex-1">{row.name}</div>
                    <div className="text-[11px] font-bold text-black">✓ 완료</div>
                  </div>
                ))}
              </div>
              <button
                className="w-full mt-3 border-[1.5px] border-dashed border-[#E0E0E0] text-[#666666] text-[13px] font-bold p-2.5 rounded cursor-pointer hover:border-black hover:text-black transition-colors"
                onClick={() => setShowModal(true)}
              >
                + 동료 추가 인증 요청
              </button>
            </div>
          </div>

          {/* Startup A */}
          <div className="bg-white rounded-lg border border-[#E0E0E0] overflow-hidden">
            <div className="px-4 pt-4 pb-3 flex items-start gap-3 border-b border-[#EBEBEB]">
              <div className="w-10 h-10 rounded bg-[#F0F0F0] text-black text-[14px] font-black flex items-center justify-center shrink-0">A</div>
              <div className="flex-1">
                <div className="text-[15px] font-black text-black">스타트업 A · 기획</div>
                <div className="text-[12px] text-[#666666] mt-0.5">앱 론칭 · 사용자 성장 기획</div>
                <div className="text-[11px] text-[#AAAAAA] mt-px">2017.01 — 2020.02</div>
              </div>
              <span className="text-[11px] font-black border border-[#FE5314] text-[#FE5314] px-2 py-1 rounded shrink-0">⏳ 1인 대기</span>
            </div>
            <div className="px-4 pt-3 pb-3 bg-[#FAFAFA]">
              <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mb-2.5">인증 현황</div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-[#F0F0F0] text-[11px] font-black flex items-center justify-center shrink-0">이</div>
                <div className="text-[12px] font-semibold text-black flex-1">이서연 · 전 동료</div>
                <div className="text-[11px] font-bold text-[#FE5314]">⏳ 요청 중 (D-3)</div>
              </div>
              <button
                className="w-full border-[1.5px] border-dashed border-[#E0E0E0] text-[#666666] text-[13px] font-bold p-2.5 rounded cursor-pointer hover:border-black hover:text-black transition-colors"
                onClick={() => setShowModal(true)}
              >
                + 동료 인증 요청하기
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Request Modal */}
      {showModal && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-end" onClick={() => setShowModal(false)}>
          <div className="w-full bg-white rounded-t-lg px-5 pb-8 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-8 h-[3px] bg-[#E0E0E0] rounded-full mx-auto mt-4 mb-5" />
            <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mb-1">동료 인증 요청</div>
            <div className="text-[18px] font-black text-black tracking-tight mb-4">추천 동료 선택</div>

            <div className="bg-[#F5F5F5] rounded p-3 mb-4">
              <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mb-1">인증 대상</div>
              <div className="text-[14px] font-black text-black">XOBIS · Product Manager</div>
              <div className="text-[12px] text-[#666666] mt-0.5">AI 기반 서비스 기획 · 2020.03 — 현재</div>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              {[
                { key: '정우성', init: '정', name: '정우성', sub: 'XOBIS · 개발팀장 · 명함 교환 2023' },
                { key: '홍지현', init: '홍', name: '홍지현', sub: 'XOBIS · 마케팅 · 명함 교환 2022' },
              ].map(person => (
                <div key={person.key} className="flex items-center gap-3 p-3 border border-[#E0E0E0] rounded bg-white">
                  <div className="w-9 h-9 rounded-full bg-[#F0F0F0] text-[14px] font-black flex items-center justify-center shrink-0">
                    {person.init}
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-black text-black">{person.name}</div>
                    <div className="text-[12px] text-[#AAAAAA]">{person.sub}</div>
                  </div>
                  {requested.has(person.key) ? (
                    <span className="text-[12px] font-black border border-black text-black px-2.5 py-1.5 rounded shrink-0">✓ 완료</span>
                  ) : (
                    <button
                      className="bg-[#FE5314] text-white text-[12px] font-black px-3 py-1.5 rounded cursor-pointer active:opacity-80 shrink-0"
                      onClick={() => handleRequest(person.key)}
                    >
                      요청
                    </button>
                  )}
                </div>
              ))}
            </div>

            {requested.size > 0 && (
              <div className="mb-3 text-[12px] text-[#666666] text-center leading-snug">
                요청 완료 후 리멤버 앱 알림과 문자로 동료에게 안내가 발송됩니다
              </div>
            )}

            <button
              className="w-full bg-black text-white text-[15px] font-black py-4 rounded cursor-pointer active:opacity-80"
              onClick={handleComplete}
            >
              {requested.size > 0 ? `${requested.size}명 요청 완료 ✓` : '완료'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
