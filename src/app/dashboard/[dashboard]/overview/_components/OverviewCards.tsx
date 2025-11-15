import React from "react";
import { IconBaseProps } from "react-icons";
import OverviewCard from "./OverviewCard";
import { IoFileTrayOutline } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import { MdPublic } from "react-icons/md";

type CardsData = {
  name: string;
  progress: boolean | null;
  value: string;
  percentage: number | null;
  icon: React.ComponentType<IconBaseProps>;
}[];

function OverviewCards({
  totalForms,
  totalSubmissions,
  publishedForms,
}: {
  totalForms: number;
  totalSubmissions: number;
  publishedForms: number;
}) {
  const cardsData: CardsData = [
    {
      name: "Total Forms",
      progress: null,
      value: totalForms.toString(),
      percentage: null,
      icon: FaRegFileAlt,
    },
    {
      name: "Published Forms",
      progress: null,
      value: publishedForms.toString(),
      percentage: null,
      icon: MdPublic,
    },
    {
      name: "Total Submissions",
      progress: null,
      value: totalSubmissions.toString(),
      percentage: null,
      icon: IoFileTrayOutline,
    },
  ];

  return (
    <div className={`grid gap-5 md:grid-cols-3 grid-cols-1`}>
      {cardsData.map((card) => {
        return <OverviewCard key={card.name} card={card} />;
      })}
    </div>
  );
}

export default OverviewCards;
