import React, { useState, useEffect } from "react";
import axios from "axios";
import HeroSection from "../components/home/HeroSection";
import ElectionInfoSection from "../components/home/ElectionInfoSection";
import Joyride from "react-joyride";
import AdvertisementsList from "../components/home/AdvertisementsList";
import { MasonryGridGallery } from "../components/home/MasonryGridGallery";

const Home = () => {
  const [voterInfo, setVoterInfo] = useState({
    voterName: "",
    district: "",
    electionDate: "",
  });
  const [runTour, setRunTour] = useState(true);

  useEffect(() => {
    const fetchVoterInfo = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${baseURL}/api/user/district-info`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // or any other method to retrieve the token
          },
        });

        // Assuming the API response contains the voter info in the format you need
        setVoterInfo({
          voterName: response.data.full_name,
          district: response.data.name,
          electionDate: "2024-11-05T00:00:00", // Use appropriate date if provided by API
        });
      } catch (error) {
        console.error("Error fetching voter info:", error);
      }
    };

    fetchVoterInfo();
  }, []);

  const steps = [
    {
      target: ".hero-section",
      content:
        "This is the hero section where you can find the main introduction and details.",
    },
    {
      target: ".election-info-section",
      content: "ستجد هنا معلومات تفصيلية عن عملية الانتخابات والدواير.",
    },
  ];

  return (
    <div>
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        scrollToFirstStep
        showSkipButton
        showProgress
        locale={{
          back: "رجوع",
          close: "إغلاق",
          last: "إنهاء",
          next: "التالي",
          skip: "تخطي",
        }}
        styles={{
          options: {},
        }}
      />
      <HeroSection
        className="hero-section"
        voterName={voterInfo.voterName}
        district={voterInfo.district}
        electionDate={voterInfo.electionDate}
      />
      <ElectionInfoSection className="election-info-section" />

      <AdvertisementsList />
    </div>
  );
};

export default Home;
