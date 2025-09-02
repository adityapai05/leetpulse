"use client";

import UserProfileCard from "@/components/layout/Profile/UserProfileCard";
import StatsCard from "@/components/layout/Profile/StatsCard";
import PerformancePie from "@/components/layout/Profile/PerformancePie";
import Footer from "@/components/ui/Footer";

export default function Profile() {
  const leftContainerData = {
    name: "Manvith",
    username: "manvith.dev",
    xp: 300,
    rank: 1,
    level: 4,
    dateJoined: "21 August 2025",
  };

  const userStatsData = {
    card1: [
      { title: "Total problems added", value: 30 },
      { title: "Currently in review queue", value: 4 },
      { title: "Submissions", value: 100 },
      { title: "Accuracy", value: "76.69%" },
      { title: "Problems Mastered", value: 1 },
    ],
    card2: [
      { title: "Problems due today", value: 1 },
      { title: "Problems due this week", value: 5 },
    ],
    card3: [
      { title: "Current streak", value: 4 },
      { title: "Max streak", value: 10 },
    ],
  };

  const pieData = [
    { name: "Correct", value: 40 },
    { name: "Incorrect", value: 60 },
  ];

  const COLORS = ["var(--success)", "var(--error)"];

  return (
    <>
      <div className=" mx-16 my-8 flex flex-row gap-4 p-4">
        <UserProfileCard {...leftContainerData} />
        <div className="flex flex-col bg-[radial-gradient(at_top_left,var(--bg-0),var(--bg-1))] p-4 w-4/5 rounded-md gap-6">
          <div className="text-xl text-text_muted font-bold mx-4">
            User Stats
          </div>
          <div className="flex flex-row gap-4 flex-1 p-4">
            <StatsCard heading="Problem Stats" stats={userStatsData.card1} />
            <div className="flex flex-1 flex-col gap-4">
              <StatsCard
                heading="Upcoming Reviews"
                stats={userStatsData.card2}
              />
              <StatsCard
                heading="Streaks 🔥 (days)"
                stats={userStatsData.card3}
              />
            </div>
            <PerformancePie data={pieData} colors={COLORS} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
