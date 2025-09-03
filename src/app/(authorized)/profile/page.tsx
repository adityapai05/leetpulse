"use client";

import UserProfileCard from "@/components/layout/Profile/UserProfileCard";
import StatsCard from "@/components/layout/Profile/StatsCard";
import PerformancePie from "@/components/layout/Profile/PerformancePie";
import Footer from "@/components/ui/Footer";
import { useEffect, useState } from "react";

interface ProfileData {
  leftContainer: {
    name: string; // string
    username: string; // string
    xp: number; // number
    rank: number; // number (can be computed)
    level: number; // number
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

  if (!data) return <div>Loading...</div>;
  return (
    <>
      <div className=" mx-16 my-8 flex flex-row gap-4 p-4">
        <UserProfileCard {...data.leftContainer} />
        <div className="flex flex-col bg-[radial-gradient(at_top_left,var(--bg-0),var(--bg-1))] p-4 w-4/5 rounded-md gap-6">
          <div className="text-xl text-text_muted font-bold mx-4">
            User Stats
          </div>
          <div className="flex flex-row gap-4 flex-1 p-4">
            <StatsCard heading="Problem Stats" stats={data.stats.card1} />
            <div className="flex flex-1 flex-col gap-4">
              <StatsCard heading="Upcoming Reviews" stats={data.stats.card2} />
              <StatsCard heading="Streaks 🔥 (days)" stats={data.stats.card3} />
            </div>
            <PerformancePie
              data={data.performancePie}
              colors={["var(--success)", "var(--error)"]}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
