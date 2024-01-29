import Banner from '../components/Banner.js';
import Highlights from '../components/Highlights';
import landingPageImage from "../Images/langdingPage.png"
import Footer from '../components/Footer.js';
import FeaturedProduct from '../components/FeaturedProduct.js';

export default function Home() {

    // const featuredProducts = {FeaturedProduct}

    const data = {
        title: "Welcome Shoppers",
        content: "Browse and Shop to Conquer the Happiness Aisle",
        destination: "/products",
        label: "Shop Now",
        imageUrl: landingPageImage,
    };



    return (
        <>
            <Banner data={data} />
            <div className='p-4 highLights'>
                <h2 className="text-center">Shupper Hot Books</h2>
                <FeaturedProduct />
                <Highlights />
            </div>
        </>
    )
}

