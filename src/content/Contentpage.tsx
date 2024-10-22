import { Link, Outlet } from "react-router-dom";
import photo from '/mic.png'
import { Footer, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
function Contentpage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <div>
        <Header
          className={`sticky top-0 z-50 flex justify-between items-center text-xs p-2 font-sans bg-white transition-shadow duration-400 ${
            isScrolled ? 'shadow-lg' : 'shadow-none'
          }`}>
          <div className="logo">
            <img src={photo} style={{width:'100px' , height:'50px'}} />
          </div>
          <div className="w-1/4 grid grid-cols-3 font-bold">
            <div>
              <Link to="/">
                <span>Accueil</span>
              </Link>
            </div>
            <div>
              <Link to="feedback">
                <span>Feedback</span>
              </Link>
            </div>
            <div>
              <Link to="signalment">
                <span>Signalment</span>
              </Link>
            </div>
          </div>
        </Header>
        <Outlet />
        <Footer style={{padding:40 , minHeight: 360}} className="flex justify-evenly bg-secondary text-white">
          <div className="">
            <span>MIC</span>
          </div>
          <div className="flex flex-col gap-y-10">
            <span>Administration :0347860250 </span>
            <span>Numero vert : 0347860252</span>
            <span>Ambondrona lot SIAE 34</span>
          </div>
        </Footer>
      </div>
    </>
  )
}
export default Contentpage;