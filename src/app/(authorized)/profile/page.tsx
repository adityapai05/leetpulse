"use client";

import UserProfileCard from "@/components/layout/Profile/UserProfileCard";
import StatsCard from "@/components/layout/Profile/StatsCard";
import PerformancePie from "@/components/layout/Profile/PerformancePie";
import Footer from "@/components/ui/Footer";
import { useEffect, useState } from "react";

interface ProfileData {
  leftContainer: {
    name: string;
    xp: number;
    rank: number;
    level: number;
    dateJoined: string;
  };
  stats: {
    card1: { title: string; value: number }[];
    card2: { title: string; value: number }[];
    card3: { title: string; value: number }[];
  };
  performancePie: { name: string; value: number }[];
}

export default function Profile() {
  const [data, setData] = useState<ProfileData | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/profile");
      const json = await res.json();
      setData(json);
    }
    fetchProfile();
  }, []);

  if (!data) return <div className="text-center p-8">Loading...</div>;

  return (
    <>
      <div className="mx-4 sm:mx-8 lg:mx-16 my-8 flex flex-col lg:flex-row gap-6">
        {/* Left column: Profile card */}
        <div className="flex justify-center">
          <UserProfileCard {...data.leftContainer} />
        </div>

        {/* Right column: Stats + Chart */}
        <div className="flex flex-col bg-[radial-gradient(at_top_left,var(--bg-0),var(--bg-1))] p-6 rounded-md gap-6 flex-1">
          <div className="text-xl text-text_primary font-bold">User Stats</div>

          <div className="flex flex-col xl:flex-row gap-6">
            {/* Problem stats (left) */}
            <div className="xl:w-1/3">
              <StatsCard heading="Problem Stats" stats={data.stats.card1} />
            </div>

            {/* Middle: Reviews + Streaks stacked */}
            <div className="flex flex-col gap-6 xl:w-1/3">
              <StatsCard heading="Upcoming Reviews" stats={data.stats.card2} />
              <StatsCard heading="Streaks 🔥 (days)" stats={data.stats.card3} />
            </div>

            {/* Right: Pie chart */}
            <div className="xl:w-1/3 flex items-center justify-center">
              <PerformancePie
                data={data.performancePie}
                colors={["var(--success)", "var(--error)"]}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
