declare global {
  interface Window {
    HyperKycConfig: new (
      jwtToken: string,
      workflowId: string,
      transactionId: string,
      showLandingPage?: boolean
    ) => any;

    HyperKYCModule: {
      launch: (
        config: any,
        callback: (event: any) => void
      ) => Promise<void>;
    };
  }
}

export {};
