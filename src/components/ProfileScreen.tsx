"use client";

import { ChevronRight } from "lucide-react";

export default function ProfileScreen({ navigate }: { navigate: (id: number) => void }) {
  return (
    <div className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#F5F5F5]">

      {/* Profile Header — solid black */}
      <div className="bg-black px-5 pt-6 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-[60px] h-[60px] rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center text-[24px] font-black text-white shrink-0">
            김
          </div>
          <div className="flex-1">
            <div className="text-[20px] font-black text-white tracking-tight">김치원</div>
            <div className="text-[13px] text-white/60 mt-0.5 font-medium">Product Manager · XOBIS</div>
            <div className="text-[12px] text-white/40 mt-px">경력 8년 · PM/PO</div>
          </div>
          <div className="border border-white/25 text-white/80 text-[12px] font-bold py-1.5 px-3 rounded cursor-pointer tracking-wide">
            편집
          </div>
        </div>
      </div>

      {/* Completeness Card */}
      <div className="-mt-4 mx-4 bg-white rounded-lg p-4 border border-[#E0E0E0] relative z-10">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-[10px] font-bold text-[#AAAAAA] uppercase tracking-widest mb-1">프로필 완성도</div>
            <div className="text-[32px] font-black text-black leading-none">72<span className="text-[20px]">%</span></div>
          </div>
          <div className="text-[11px] font-semibold text-[#FE5314] border border-[#FE5314]/30 bg-[#FFF1EC] px-2 py-1 rounded">
            미완성
          </div>
        </div>
        <div className="h-[3px] bg-[#EBEBEB] rounded-full overflow-hidden mb-3">
          <div className="h-full bg-black rounded-full" style={{ width: '72%' }} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['+ 포트폴리오', '+ 주요 성과', '+ 동료 인증'].map(label => (
            <div key={label} className="text-[11px] font-bold py-1.5 px-3 rounded border border-[#E0E0E0] text-black bg-white cursor-pointer hover:border-black transition-colors">
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Diary Banner */}
      <div
        className="mx-4 mt-3 bg-black rounded-lg p-4 cursor-pointer active:opacity-80 transition-opacity relative overflow-hidden"
        onClick={() => navigate(1)}
      >
        <div className="absolute top-0 right-0 w-[80px] h-full bg-[#FE5314]/8" />
        <div className="text-[10px] font-black text-[#FE5314] uppercase tracking-[0.15em] mb-2">NEW</div>
        <div className="text-[16px] font-black text-white tracking-tight">프로필 다이어리</div>
        <div className="text-[12px] text-white/50 mt-1">Q1 성과 기록 · 내 연봉 위치 · 동료 인증</div>
        <div className="mt-3 inline-flex items-center gap-1 text-[#FE5314] text-[13px] font-bold">
          시작하기 <ChevronRight className="w-3.5 h-3.5" strokeWidth={3} />
        </div>
      </div>

      {/* Market Value */}
      <div className="px-4 mt-3">
        <div className="flex justify-between items-center mb-2">
          <div className="text-[10px] font-black text-black uppercase tracking-widest">시장가치</div>
          <div className="text-[12px] font-bold text-[#FE5314] cursor-pointer" onClick={() => navigate(3)}>
            상세 보기 →
          </div>
        </div>
        <div
          className="bg-white rounded-lg p-4 border border-[#E0E0E0] flex items-center gap-3 cursor-pointer active:bg-[#F5F5F5] transition-colors"
          onClick={() => navigate(3)}
        >
          <div className="flex-1">
            <div className="text-[11px] text-[#AAAAAA] font-medium mb-0.5">현재 추정 연봉 범위</div>
            <div className="text-[22px] font-black text-[#FE5314] leading-tight tracking-tight">7,200 ~ 9,500<span className="text-[14px]">만원</span></div>
            <div className="text-[11px] text-[#AAAAAA] mt-1">동일 직무 상위 32% · 지난달 대비 ↑3%</div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#AAAAAA] shrink-0" />
        </div>
      </div>

      {/* Career */}
      <div className="px-4 mt-4 pb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-[10px] font-black text-black uppercase tracking-widest">경력</div>
          <div className="text-[12px] font-bold text-[#FE5314] cursor-pointer">수정 →</div>
        </div>

        {[
          {
            company: 'XOBIS',
            role: 'Product Manager',
            period: '2020.03 — 현재',
            badge: '✓ 동료 3인 인증',
            badgeStyle: 'text-black border-black',
          },
          {
            company: '스타트업 A',
            role: 'PM / 서비스 기획',
            period: '2017.01 — 2020.02',
            badge: '⏳ 인증 대기 1명',
            badgeStyle: 'text-[#FE5314] border-[#FE5314]',
          },
        ].map(item => (
          <div key={item.company} className="bg-white rounded-lg p-3.5 mb-2 border border-[#E0E0E0]">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[15px] font-black text-black">{item.company}</div>
                <div className="text-[12px] text-[#666666] mt-0.5">{item.role}</div>
              </div>
              <div className="text-[11px] text-[#AAAAAA] font-medium">{item.period}</div>
            </div>
            <div className="mt-2.5">
              <span className={`text-[11px] font-bold px-2 py-1 rounded border ${item.badgeStyle}`}>
                {item.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
