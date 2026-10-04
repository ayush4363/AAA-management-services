import React, { useState, useEffect } from 'react';
import { Calculator, Plus, Edit2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { pricingService, PricingCalculationResponse } from '../../services/pricingService';
import { PricingConfigItem } from '../../types';

export const AdminPricingPage: React.FC = () => {
  const [configs, setConfigs] = useState<PricingConfigItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingConfig, setEditingConfig] = useState<Partial<PricingConfigItem> | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Simulator State
  const [simConfigId, setSimConfigId] = useState<string>('');
  const [simCount, setSimCount] = useState<number>(5);
  const [simResult, setSimResult] = useState<PricingCalculationResponse | null>(null);

  const loadConfigs = () => {
    setLoading(true);
    pricingService
      .getAllPricingConfigsAdmin()
      .then((res) => {
        if (res.success && res.data) {
          setConfigs(res.data);
          if (res.data.length > 0 && !simConfigId) {
            setSimConfigId(res.data[0]._id || '');
          }
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadConfigs();
  }, []);

  // Update simulator when config or count changes
  useEffect(() => {
    if (!simConfigId) return;
    const cfg = configs.find((c) => c._id === simConfigId);
    if (!cfg) return;

    pricingService
      .calculatePricing({
        customConfig: cfg,
        count: simCount,
      })
      .then((res) => {
        if (res.success && res.data) {
          setSimResult(res.data);
        }
      });
  }, [simConfigId, simCount, configs]);

  const handleOpenEdit = (cfg: PricingConfigItem) => {
    setEditingConfig({ ...cfg });
    setErrorMsg('');
    setModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingConfig({
      personnelTypeId: 'custom_' + Date.now(),
      personnelName: '',
      description: '',
      workingDays: 26,
      workingHours: 8,
      basicWage: 14000,
      pfRatePercent: 13,
      esiRatePercent: 3.25,
      bonusRatePercent: 8.33,
      leaveWithWagesPercent: 5,
      uniformAllowance: 500,
      serviceChargePercent: 10,
      gstPercent: 18,
      isActive: true,
    });
    setErrorMsg('');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingConfig) return;
    setSaving(true);
    setErrorMsg('');

    try {
      if (editingConfig._id) {
        await pricingService.updatePricingConfig(editingConfig._id, editingConfig);
      } else {
        await pricingService.createPricingConfig(editingConfig);
      }
      setSuccessMsg('Statutory pricing formula updated successfully.');
      setModalOpen(false);
      loadConfigs();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error saving pricing configuration.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4A343] block mb-1">
            STATUTORY PRICING ENGINE
          </span>
          <h1 className="text-2xl font-bold text-[#F3F5F7] tracking-tight">
            Security Manpower Wage & Compliance Matrix
          </h1>
          <p className="text-xs text-[#9BA3AF] mt-1">
            Configure UP labor law statutory rates (Basic, PF, ESI, Bonus, EL, Uniform, Agency Margin & GST).
          </p>
        </div>

        <Button onClick={handleOpenAdd} size="sm">
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Add Pricing Tier</span>
        </Button>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Pricing Configurations Table */}
      {loading ? (
        <div className="py-8 text-center text-xs text-[#9BA3AF]">Loading pricing models...</div>
      ) : (
        <div className="bg-[#111622] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#182030]/30">
            <h3 className="text-sm font-bold text-[#F3F5F7]">Active Statutory Formulas</h3>
            <span className="text-[10px] text-[#60697B] font-mono">26 Days Standard Basis</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[#60697B] uppercase font-mono text-[10px] bg-[#182030]/60">
                  <th className="py-3 px-4">Role Title</th>
                  <th className="py-3 px-4 font-mono">Basic Wage</th>
                  <th className="py-3 px-4 font-mono">PF (13%)</th>
                  <th className="py-3 px-4 font-mono">ESI (3.25%)</th>
                  <th className="py-3 px-4 font-mono">Bonus (8.33%)</th>
                  <th className="py-3 px-4 font-mono">Uniform</th>
                  <th className="py-3 px-4 font-mono">Agency Fee</th>
                  <th className="py-3 px-4 font-mono">GST</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {configs.map((c) => (
                  <tr key={c._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-sans font-bold text-[#F3F5F7]">{c.personnelName}</td>
                    <td className="py-4 px-4 text-[#D4A343]">₹{c.basicWage.toLocaleString('en-IN')}</td>
                    <td className="py-4 px-4 text-[#9BA3AF]">{c.pfRatePercent}%</td>
                    <td className="py-4 px-4 text-[#9BA3AF]">{c.esiRatePercent}%</td>
                    <td className="py-4 px-4 text-[#9BA3AF]">{c.bonusRatePercent}%</td>
                    <td className="py-4 px-4 text-[#9BA3AF]">₹{c.uniformAllowance}</td>
                    <td className="py-4 px-4 text-[#D4A343]">{c.serviceChargePercent}%</td>
                    <td className="py-4 px-4 text-[#9BA3AF]">{c.gstPercent}%</td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleOpenEdit(c)}
                        className="p-1.5 rounded hover:bg-white/10 text-[#D4A343] hover:text-[#E2B559]"
                        title="Edit Formula"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Interactive Admin Deployment Simulator */}
      <div className="bg-[#111622] border border-[#D4A343]/30 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[#D4A343]">
          <Calculator className="w-4 h-4" />
          <span>LIVE WAGE BREAKDOWN VERIFIER (INTERNAL TOOL)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 space-y-4">
            <div>
              <label className="text-xs text-[#9BA3AF] block mb-1">Select Role</label>
              <select
                value={simConfigId}
                onChange={(e) => setSimConfigId(e.target.value)}
                className="w-full px-3 py-2 bg-[#182030] border border-white/10 rounded-lg text-xs text-[#F3F5F7]"
              >
                {configs.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.personnelName} (Basic ₹{c.basicWage})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#9BA3AF]">Test Guard Count:</span>
                <span className="font-mono text-[#D4A343] font-bold">{simCount} Personnel</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={simCount}
                onChange={(e) => setSimCount(Number(e.target.value))}
                className="w-full accent-[#D4A343]"
              />
            </div>
          </div>

          <div className="md:col-span-7 bg-[#0B0E14] border border-white/10 rounded-xl p-6">
            {simResult ? (
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between text-sm pb-2 border-b border-white/10">
                  <span className="text-[#9BA3AF]">Monthly Grand Total (incl. 18% GST):</span>
                  <strong className="text-xl text-[#D4A343]">
                    ₹{simResult.totalMonthly.toLocaleString('en-IN')}
                  </strong>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[11px] text-[#9BA3AF] pt-1">
                  <div>Basic Wage: ₹{simResult.breakdown.basicWage.toLocaleString('en-IN')}</div>
                  <div>PF (Employer 13%): ₹{simResult.breakdown.pf.toLocaleString('en-IN')}</div>
                  <div>ESI (Employer 3.25%): ₹{simResult.breakdown.esi.toLocaleString('en-IN')}</div>
                  <div>Bonus (8.33%): ₹{simResult.breakdown.bonus.toLocaleString('en-IN')}</div>
                  <div>EL (5%): ₹{simResult.breakdown.el.toLocaleString('en-IN')}</div>
                  <div>Uniform Allowance: ₹{simResult.breakdown.uniform.toLocaleString('en-IN')}</div>
                  <div className="text-[#D4A343]">Agency Service Charge: ₹{simResult.breakdown.serviceCharge.toLocaleString('en-IN')}</div>
                  <div className="text-[#F3F5F7]">Per-Guard Total: ₹{simResult.breakdown.finalPerPerson.toLocaleString('en-IN')}</div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-[#60697B]">Calculating...</div>
            )}
          </div>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {editingConfig && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingConfig._id ? 'Edit Statutory Pricing Formula' : 'Add New Pricing Tier'}
        >
          <form onSubmit={handleSave} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <Input
              label="Personnel Name / Category Title *"
              value={editingConfig.personnelName || ''}
              onChange={(e) => setEditingConfig({ ...editingConfig, personnelName: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Monthly Basic Wage (₹) *"
                type="number"
                value={editingConfig.basicWage || 0}
                onChange={(e) => setEditingConfig({ ...editingConfig, basicWage: Number(e.target.value) })}
                required
              />
              <Input
                label="Working Days per Month"
                type="number"
                value={editingConfig.workingDays || 26}
                onChange={(e) => setEditingConfig({ ...editingConfig, workingDays: Number(e.target.value) })}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Input
                label="Employer PF %"
                type="number"
                step="0.01"
                value={editingConfig.pfRatePercent || 13}
                onChange={(e) => setEditingConfig({ ...editingConfig, pfRatePercent: Number(e.target.value) })}
              />
              <Input
                label="Employer ESI %"
                type="number"
                step="0.01"
                value={editingConfig.esiRatePercent || 3.25}
                onChange={(e) => setEditingConfig({ ...editingConfig, esiRatePercent: Number(e.target.value) })}
              />
              <Input
                label="Bonus %"
                type="number"
                step="0.01"
                value={editingConfig.bonusRatePercent || 8.33}
                onChange={(e) => setEditingConfig({ ...editingConfig, bonusRatePercent: Number(e.target.value) })}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Input
                label="Leave (EL) %"
                type="number"
                step="0.01"
                value={editingConfig.leaveWithWagesPercent || 5}
                onChange={(e) => setEditingConfig({ ...editingConfig, leaveWithWagesPercent: Number(e.target.value) })}
              />
              <Input
                label="Uniform Allowance (₹)"
                type="number"
                value={editingConfig.uniformAllowance || 500}
                onChange={(e) => setEditingConfig({ ...editingConfig, uniformAllowance: Number(e.target.value) })}
              />
              <Input
                label="Agency Margin %"
                type="number"
                step="0.01"
                value={editingConfig.serviceChargePercent || 10}
                onChange={(e) => setEditingConfig({ ...editingConfig, serviceChargePercent: Number(e.target.value) })}
              />
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" isLoading={saving}>
                Save Formula
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
