export interface helpAndSupportKey{
 phoneSupport: string,
    emailSupport: string,
    whatsappSupport: string,
    rmSupport: string,
    RMID: string
}
export interface helpAndSupportResponse{
    success:boolean,
    data:helpAndSupportKey
}

export interface AboutSection {
  id: string;          // section id, e.g. "about-prodigy-pro"
  title: string;       // section title, e.g. "About Prodigy Pro"
  paragraphs: string[]; // multiple <p> tags as array
}

export interface KeyFeaturesSection {
  id: string;          // "key-features"
  title: string;       // "Key Features"
  features: string[];  // list of <li> features
}

export interface WhoIsItForSection {
  id: string;          // "who-is-it-for"
  title: string;       // "Who Is It For?"
  description: string; // first <p>
  audience: string[];  // <ul> items
  closingNote: string; // last <p>
}

export interface AboutUsKey {
  about: AboutSection;
  keyFeatures: KeyFeaturesSection;
  whoIsItFor: WhoIsItForSection;
}

export interface AboutUsResponse {
  success: boolean;
  data: AboutUsKey;
}

// Section: Information Collected
export interface InformationCollected {
  providedByUser: string[];      // e.g., ["Full Name", "Email", "PAN", ...]
  regulatoryInvestment: string[]; // e.g., ["KYC details", "SEBI/AMFI compliance", ...]
  technicalUsage: string[];       // e.g., ["Device info", "IP address", "Cookies", ...]
}

// Section: User Rights
export interface UserRights {
  accessAndCorrection: string;
  deletion: string;
  withdrawConsent: string;
  contactEmail: string;
  contactUrl: string;
}

// Section: Data Protection Officer
export interface DataProtectionOfficer {
  name: string;
  email: string;
}

// Main Privacy Policy Structure
export interface PrivacyPolicy {
  effectiveDate: string;
  introduction: string;
  compliance: string[];
  informationCollected: InformationCollected;
  useOfInformation: string[];
  disclosureOfInformation: string[];
  kycCompliance: string;
  userRights: UserRights;
  dataRetention: string;
  dataProtectionOfficer: DataProtectionOfficer;
  securityOfInformation: string;
  changesToPolicy: string;
  contactDetails: {
    email: string;
    website: string;
    alternate?: string;
  };
  footerNote: string;
}

// Example API Response
export interface PrivacyPolicyResponse {
  success: boolean;
  data: PrivacyPolicy;
}

export interface SaveRiskProfileResponse{
  success: boolean;
  msg: string;
}