import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { SignatureStory } from '@/components/home/SignatureStory';
import { Craftsmanship } from '@/components/home/Craftsmanship';
import { AppointmentCta } from '@/components/home/AppointmentCta';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Home hero sits under the fixed transparent header */}
      <div className="-mt-20 md:-mt-28">
        <Hero />
      </div>
      <FeaturedCollections />
      <SignatureStory />
      <Craftsmanship />
      <AppointmentCta />
    </>
  );
}
