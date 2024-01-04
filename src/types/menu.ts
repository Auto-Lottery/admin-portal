import { TbGauge } from "react-icons/tb";

export type MenuItem = {
  key: string;
  label: string;
  icon: typeof TbGauge;
  href: string;
  links?: Array<{
    label: string;
  }>;
};
