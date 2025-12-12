
import BannerPage from "./HomePage/banner/page";
import StatusPage from "./Status/page";
import PremiumPage from "./HomePage/Premium/page";
import FeeChartPage from "./HomePage/FeeChartSection/page";
import HomeFoodPage from "./HomeFood/page";
import HomeAboutPage from "./HomeAbout/page";
import FeaturesPage from "./Features/page";
import GalleryPage from "./Gallery/page";

export default function Home() {
  return (

    <div>
      <BannerPage></BannerPage>
      <HomeFoodPage></HomeFoodPage>
      <StatusPage></StatusPage>
      <PremiumPage></PremiumPage>
      <HomeAboutPage></HomeAboutPage>
      <FeeChartPage></FeeChartPage>
      <GalleryPage></GalleryPage>
      <FeaturesPage></FeaturesPage>

      
    </div>
  );
}
