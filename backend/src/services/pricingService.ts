import { IPricingConfig } from '../types/models';

export interface BreakdownResult {
  basicWage: number;
  pf: number;
  esi: number;
  bonus: number;
  el: number;
  uniform: number;
  serviceCharge: number;
  subtotal: number;
  gst: number;
  finalPerPerson: number;
}

export class PricingService {
  /**
   * Computes statutory compliant monthly security manpower costs on backend.
   * Never trust raw client calculations.
   */
  public static calculatePersonnelCost(
    config: Partial<IPricingConfig>,
    count: number = 1
  ): { breakdown: BreakdownResult; totalMonthly: number } {
    const basic = config.basicWage || 0;
    const pfRate = (config.pfRatePercent || 13.01) / 100;
    const esiRate = (config.esiRatePercent || 3.25) / 100;
    const bonusRate = (config.bonusRatePercent || 8.33) / 100;
    const elRate = (config.leaveWithWagesPercent || 4.8077) / 100;
    const uniform = config.uniformAllowance !== undefined ? config.uniformAllowance : 200;
    const serviceRate = (config.serviceChargePercent || 10) / 100;
    const gstRate = (config.gstPercent || 18) / 100;

    const pf = Math.round(basic * pfRate);
    const esi = Math.round(basic * esiRate);
    const bonus = Math.round(basic * bonusRate);
    const el = Math.round(basic * elRate);

    const costBeforeMargin = basic + pf + esi + bonus + el + uniform;
    const serviceCharge = Math.round(costBeforeMargin * serviceRate);
    const subtotal = costBeforeMargin + serviceCharge;
    const gst = 0; // GST is payable extra as per govt rules, not added to basic quote
    const finalPerPerson = subtotal;

    const breakdown: BreakdownResult = {
      basicWage: basic,
      pf,
      esi,
      bonus,
      el,
      uniform,
      serviceCharge,
      subtotal,
      gst,
      finalPerPerson,
    };

    return {
      breakdown,
      totalMonthly: finalPerPerson * count,
    };
  }
}
