export enum keys {
  SIP = "SIP",
  sip = "sip",
  Redemption = "Redemption",
  Purchase = "Purchase",
  SWP = "SWP",
  purchase = "purchase",
  switch = "switch",
  Switch = "Switch",
  redumption = "redumption",
  swp = "swp",
  stp = "stp",
  STP = "STP",
  rejected = "Rejected",
  pending = "Pending",
  active = "Active",
  failed = "Failed",
  bajaj = "bajaj",
}
export enum riskKey {
  aggressive = 3,
  moderate = 2,
  conservative = 1,
}
export enum years {
  oneYear = 1,
  threeYear = 3,
  fiveYear = 5,
  eightYear = 8,
  tenYear = 10,
}
export enum bankType {
  SB = "Saving Account",
  CB = "Current Account",
}
export const bankTypeObj = {
  SB: {
    code: "SB",
    text: "Saving Account",
  },
  CB: {
    code: "CB",
    text: "Current Account",
  },
} as const;

type yearTypeKeys = {
  oneYearCAGR: number;
  twoyearret: number;
  threeYearCAGR: number;
  fouryearret: number;
  fiveYearCAGR: number;
  sevenyearret: number;
  tenyearret: number;
  fifteenyearret: number;
};

export const yearKeys: Record<number, keyof yearTypeKeys> = {
  1: "oneYearCAGR",
  2: "twoyearret",
  3: "threeYearCAGR",
  4: "fouryearret",
  5: "fiveYearCAGR",
  7: "sevenyearret",
  10: "tenyearret",
  15: "fifteenyearret",
};



export const succeessString = [
  "SUCCESS",
  "APPROVED",
  "AUTHORISED",
  "COMPLETED",
  "VALID",
];
export const pendingString = ["PENDING", "WAITING", "INPROGRESS", "PROCESSING"];
export const failedString = [
  "FAILED",
  "REJECT",
  "ERROR",
  "DECLINED",
  "CANCELLED",
  "INVALID",
];
