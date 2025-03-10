export interface GoalContentInterface {
  title: string;
  paragraph: string;
}

export const goalContent: Record<string, GoalContentInterface> = {
  retirement: {
    title: "Retirement",
    paragraph:
      "Set your retirement goal and start investing today to ensure a secure and stress-free future.",
  },
  education: {
    title: "Child Education",
    paragraph:
      "Plan today for your child’s brighter tomorrow. Set your child education goal and start investing in their dreams with confidence and ease.",
  },
  childMarriage: {
    title: "Child Marriage",
    paragraph:
      "Set your child’s marriage goal and start investing to celebrate their big day without financial worries.",
  },
  vacation: {
    title: "Vacation",
    paragraph:
      "Set your vacation goal and start saving today for unforgettable experiences tomorrow.",
  },
  carPurchase: {
    title: "Car Purchase",
    paragraph:
      "Set your car purchase goal and start investing to make your dream ride a reality.",
  },
  housePurchase: {
    title: "House Purchase",
    paragraph:
      "Set your house purchase goal and start investing today to secure your dream home effortlessly.",
  },
  wealthCreation: {
    title: "Wealth Creation",
    paragraph:
      "Set your wealth creation goal and start investing today to achieve financial freedom and long-term prosperity.",
  },
};
