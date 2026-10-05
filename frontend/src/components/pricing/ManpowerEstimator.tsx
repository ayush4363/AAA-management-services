import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowUpRight, Calculator, CheckCircle2, Info } from 'lucide-react';
import { pricingService, PricingCalculationResponse } from '../../services/pricingService';
import { PricingConfigItem } from '../../types';
import { ROUTES } from '../../constants/routes';

export const ManpowerEstimator: React.FC = () => {
  const navigate = useNavigate();
  const [configs, setConfigs] = useState<PricingConfigItem[]>([]);
  const [selectedConfigId, setSelectedConfigId] = useState<string>('');
  const [guardCount, setGuardCount] = useState<number>(1);
  const [calculation, setCalculation] = useState<PricingCalculationResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState<boolean>(false);

  useEffect(() => {
    const fetchConfigs = async () => {
      const fallback: PricingConfigItem[] = [
        {
          _id: 'guard_default',
          personnelTypeId: '1',
          personnelName: 'Security Guard (Unarmed)',
          description: 'Statutory minimum wage compliance with PF, ESI, uniform, and service charge (26 days / 8 hrs).',
          workingDays: 26,
          workingHours: 8,
          basicWage: 13006,
          pfRatePercent: 13.01,
          esiRatePercent: 3.25,
          bonusRatePercent: 8.33,
          leaveWithWagesPercent: 4.8077,
          uniformAllowance: 200,
          serviceChargePercent: 10,
          gstPercent: 0,
          isActive: true,
        },
        {
          _id: 'sup_default',
          personnelTypeId: '2',
          personnelName: 'Security Supervisor',
          description: 'Supervisory oversight, shift management, and statutory labor benefits (26 days / 8 hrs).',
          workingDays: 26,
          workingHours: 8,
          basicWage: 18000,
          pfRatePercent: 13.01,
          esiRatePercent: 3.25,
          bonusRatePercent: 8.33,
          leaveWithWagesPercent: 4.8077,
          uniformAllowance: 200,
          serviceChargePercent: 10,
          gstPercent: 0,
          isActive: true,
        },
        {
          _id: 'gun_default',
          personnelTypeId: '3',
          personnelName: 'Security Gunman (Armed)',
          description: 'Licensed weapon holder for bank premises, cash logistics, and high deterrence (26 days / 8 hrs).',
          workingDays: 26,
          workingHours: 8,
          basicWage: 16025,
          pfRatePercent: 13.01,
          esiRatePercent: 3.25,
          bonusRatePercent: 8.33,
          leaveWithWagesPercent: 4.8077,
          uniformAllowance: 200,
          serviceChargePercent: 10,
          gstPercent: 0,
          isActive: true,
        },
      ];

      try {
        const res = await pricingService.getPricingConfigs();
        if (res.success && res.data && res.data.length > 0) {
          // Verify if backend configs match current quotation baseline
          const hasQuotationBasic = res.data.some(c => c.basicWage === 13006);
          if (hasQuotationBasic) {
            setConfigs(res.data);
            setSelectedConfigId(res.data[0]._id || '');
            return;
          }
        }
      } catch (_e) {
        // use fallback below
      }
      setConfigs(fallback);
      setSelectedConfigId('guard_default');
    };
    fetchConfigs();
  }, []);

  useEffect(() => {
    if (!selectedConfigId || configs.length === 0) return;
    const current = configs.find((c) => c._id === selectedConfigId);
    if (!current) return;

    setLoading(true);
    // Calculate exact numbers matching official quotation PDF without adding GST
    const basic = current.basicWage;
    const pf = Math.round(basic * (current.pfRatePercent / 100));
    const esi = Math.round(basic * (current.esiRatePercent / 100));
    const bonus = Math.round(basic * (current.bonusRatePercent / 100));
    const el = Math.round(basic * (current.leaveWithWagesPercent / 100));
    const uniform = current.uniformAllowance;
    const total = basic + pf + esi + bonus + el + uniform;
    const service = Math.round(total * (current.serviceChargePercent / 100));
    const subtotal = total + service;
    const finalPerPerson = subtotal;

    setCalculation({
      breakdown: {
        basicWage: basic,
        pf,
        esi,
        bonus,
        el,
        uniform,
        serviceCharge: service,
        subtotal,
        gst: 0,
        finalPerPerson,
      },
      totalMonthly: finalPerPerson * guardCount,
    });
    setLoading(false);
  }, [selectedConfigId, guardCount, configs]);

  const activeConfig = configs.find((c) => c._id === selectedConfigId);

  const handleProceedToQuotation = () => {
    navigate(ROUTES.PUBLIC.REQUEST_QUOTE, {
      state: {
        preselectedPersonnel: activeConfig?.personnelName,
        preselectedCount: guardCount,
      },
    });
  };

  return (
    <div className="w-full bg-white border border-[#E6E3DA] rounded-2xl p-6 sm:p-8 shadow-card">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E6E3DA] gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#C44D2B] mb-1">
            <Calculator className="w-3.5 h-3.5" />
            <span>Statutory Wage Calculator</span>
          </div>
          <h3 className="text-xl font-bold text-[#141518] tracking-tight">
            Security Manpower Cost Estimator
          </h3>
        </div>
        <div className="text-xs text-[#686873] flex items-center gap-1.5 bg-[#FAF9F5] px-3 py-1.5 rounded-full border border-[#E6E3DA]">
          <Info className="w-3.5 h-3.5 text-[#C44D2B]" />
          <span>Official Statutory Wage Quotation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Controls Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Personnel Selection */}
          <div>
            <label className="text-xs uppercase tracking-wider text-[#686873] font-semibold block mb-2.5">
              1. Select Personnel Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {configs.map((c) => {
                const isSelected = c._id === selectedConfigId;
                return (
                  <button
                    key={c._id}
                    type="button"
                    onClick={() => setSelectedConfigId(c._id || '')}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-[#FAF9F5] border-[#141518] text-[#141518] shadow-sm font-medium'
                        : 'bg-white border-[#E6E3DA] text-[#686873] hover:text-[#141518] hover:border-[#CDC9BF]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <ShieldCheck className={`w-4 h-4 ${isSelected ? 'text-[#C44D2B]' : 'text-[#8C8C96]'}`} />
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#C44D2B]" />}
                    </div>
                    <div className="text-xs font-semibold block truncate leading-tight">
                      {c.personnelName}
                    </div>
                    <span className="text-[10px] text-[#8C8C96] block mt-1">
                      Basic: ₹{c.basicWage.toLocaleString('en-IN')}/mo
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Number of Personnel */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase tracking-wider text-[#686873] font-semibold">
                2. Number of Guards Required
              </label>
              <span className="font-mono text-sm font-bold text-[#141518]">
                {guardCount} {guardCount === 1 ? 'Guard' : 'Guards'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="1"
              value={guardCount}
              onChange={(e) => setGuardCount(Number(e.target.value))}
              className="w-full accent-[#141518] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8C8C96] mt-1.5">
              <span>1</span>
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>25</span>
            </div>
          </div>

          {/* Compliance Commitments */}
          <div className="bg-[#FAF9F5] border border-[#E6E3DA] rounded-xl p-4 flex flex-col gap-1.5 text-xs text-[#686873]">
            <div className="flex items-center gap-1.5 text-[#141518] font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#C44D2B]" />
              <span>Full Labor Compliance Included</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#686873]">
              Calculated transparently as per quotation: Basic wages, PF@13.61%, ESI@3.25%, Bonus@8.33%, EL@1.25%, Uniform, and 10% Service Charge.
            </p>
          </div>
        </div>

        {/* Calculation Result Summary Column */}
        <div className="lg:col-span-5 bg-[#FAF9F5] border border-[#E6E3DA] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#686873] block mb-1">
              ESTIMATED MONTHLY INVOICE
            </span>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl sm:text-4xl font-bold font-mono text-[#141518]">
                ₹{calculation ? calculation.totalMonthly.toLocaleString('en-IN') : '-'}
              </span>
              <span className="text-xs text-[#686873]">/ month</span>
            </div>
            <p className="text-[11px] text-[#686873] mb-5">
              For {guardCount} {activeConfig?.personnelName} (26 days, 8h duty).
            </p>

            {/* Micro Breakdown */}
            {calculation && (
              <div className="flex flex-col gap-2 py-3 border-y border-[#E6E3DA] text-xs">
                <div className="flex justify-between text-[#686873]">
                  <span>Rate per Person:</span>
                  <span className="font-mono text-[#141518]">
                    ₹{calculation.breakdown.finalPerPerson.toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <div className="flex justify-between text-[#686873]">
                  <span>Total Amount ({guardCount} {guardCount === 1 ? 'person' : 'personnel'}):</span>
                  <span className="font-mono text-[#141518] font-bold">
                    ₹{calculation.totalMonthly.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            )}
            <p className="text-[10px] text-[#8C8C96] mt-2 italic">
              * GST will be payable as per govt. rules.
            </p>

            {/* Detailed Breakdown Toggle */}
            <button
              type="button"
              onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
              className="text-xs text-[#C44D2B] hover:underline mt-3 inline-block font-medium"
            >
              {showDetailedBreakdown ? 'Hide statutory wage breakdown' : 'View statutory wage breakdown'}
            </button>

            {showDetailedBreakdown && calculation && (
              <div className="mt-3 p-3 bg-white rounded-lg text-[11px] font-mono text-[#686873] space-y-1.5 border border-[#E6E3DA]">
                <div className="flex justify-between">
                  <span>Basic (As per Mini. Wages):</span>
                  <span>₹{calculation.breakdown.basicWage.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>PF@13.61%:</span>
                  <span>₹{calculation.breakdown.pf.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>ESI@3.25%:</span>
                  <span>₹{calculation.breakdown.esi.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bonus@8.33%:</span>
                  <span>₹{calculation.breakdown.bonus.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>EL@1.25%:</span>
                  <span>₹{calculation.breakdown.el.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Uniform:</span>
                  <span>₹{calculation.breakdown.uniform.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-t border-dashed border-[#E6E3DA] pt-1 font-semibold text-[#141518]">
                  <span>Total:</span>
                  <span>₹{(calculation.breakdown.basicWage + calculation.breakdown.pf + calculation.breakdown.esi + calculation.breakdown.bonus + calculation.breakdown.el + calculation.breakdown.uniform).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Charge@10%:</span>
                  <span>₹{calculation.breakdown.serviceCharge.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-t border-[#E6E3DA] pt-1 text-[#C44D2B] font-bold">
                  <span>Sub Total:</span>
                  <span>₹{calculation.breakdown.finalPerPerson.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 text-[10px] text-[#8C8C96] border-t border-[#F0EFEA] space-y-0.5 font-sans">
                  <p>1. GST will be payable as per govt. rules</p>
                  <p>2. Salary will increase 10% every year</p>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6">
            <button
              type="button"
              onClick={handleProceedToQuotation}
              disabled={loading}
              className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-full bg-[#141518] hover:bg-[#26272B] text-white text-xs font-semibold transition-all shadow-sm"
            >
              <span>Proceed to Formal Quotation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-center text-[#8C8C96] block mt-2">
              Formal quotation with breakdown generated within 24 hours.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
