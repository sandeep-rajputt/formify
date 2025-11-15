import React from "react";
import { IconBaseProps } from "react-icons";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import SimpleCard from "@/component/common/SimpleCard";

type Card = {
  name: string;
  progress: boolean | null;
  value: string;
  percentage: number | null;
  icon: React.ComponentType<IconBaseProps>;
};

function OverviewCard({ card }: { card: Card }) {
  return (
    <SimpleCard className="w-full">
      <div className="flex gap-2">
        <div className="bg-brand-primary/10 p-3 rounded-lg flex items-center justify-center">
          <card.icon size={26} className="text-brand-primary my-auto" />
        </div>
        <div>
          <p className="font-medium text-light-fg-muted dark:text-dark-fg-muted text-sm">
            {card.name}
          </p>
          <div className="flex items-end gap-1">
            <p className="text-2xl font-semibold">
              <span>{card.value}</span>
            </p>
            <div className="flex items-end mb-0.5 gap-0.5">
              {card.percentage !== null && (
                <span
                  className={`text-sm ${
                    card.progress ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {card.percentage}%
                </span>
              )}
              {card.progress === true && (
                <FaArrowTrendUp className="text-green-500 mb-0.5" />
              )}
              {card.progress === false && (
                <FaArrowTrendDown className="text-red-500" />
              )}
            </div>
          </div>
        </div>
      </div>
    </SimpleCard>
  );
}

export default OverviewCard;
