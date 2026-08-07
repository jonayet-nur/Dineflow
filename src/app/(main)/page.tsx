import React from "react";
import Hero from "@/Components/Banner";
import FeaturedItems from "@/Components/Featured";
import { PromoDiscountBanner } from "@/Components/PromoDicountBanner";
import { PromoComboBanner } from "@/Components/PromoComboBanner";
import ReviewsSection from "@/Components/ReviewSection";
import BookingAndNews from "@/Components/BookingAndNews";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedItems />
      <ReviewsSection />
      <PromoDiscountBanner />
      <PromoComboBanner />
      <BookingAndNews />
    </>
  );
}
