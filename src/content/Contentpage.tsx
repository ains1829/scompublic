import { Link, Outlet } from "react-router-dom";
import photo from '/mic.png'
import { Footer, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import {LinkedinOutlined , FacebookOutlined} from '@ant-design/icons';
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
          className={`sticky top-0 z-50 flex justify-between items-center  p-8 font-sans transition-shadow duration-400 ${
            isScrolled ? ' bg-white shadow-lg' : 'bg-transparent shadow-none'
          }`}>
          <div className="logo">
            <img src={photo} style={{width:'150px' , height:'80px'}} />
          </div>
          <div className="w-1/4 grid grid-cols-3">
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
        <Footer style={{padding:40 , minHeight: 360}} className="flex grid grid-cols-2 justify-center bg-blue-100 gap-5">
          <div className="flex flex-col gap-y-5">
            <span>MIC</span>
            <span>
              Depuis 2005, eTech, SSII à Madagascar (filiale du groupe ArkeUp Paris) connaît un accroissement considérable. À ce jour, nous comptons plus de 500 ingénieurs et experts qualifiés dans plusieurs domaines
            </span>
          </div>
          <div className="flex justify-evenly">
            <div className="flex flex-col gap-y-5 font-bold">
              <span>Contact</span>
              <div className="flex flex-col gap-y-4"> 
                <span>Administration :0347860250 </span>
                <span>Numero vert : 0347860252</span>
                <span>Site Officiel : <a className="text-blue-500" href="https://micc.gov.mg"> micc.gov.mg</a></span>
                <div className="flex text-2xl gap-4">
                  <a href="https://mg.linkedin.com/company/micmada"><LinkedinOutlined  /></a> 
                  <FacebookOutlined  />
                </div>
                <span>6 rue Wast Ravelomoria - Ambohidahy - 101 Antananarivo</span>
                <span>Sbd || DSI || MICC © 2024. Tous droits réservés.</span>
              </div>
            </div>
          </div>
        </Footer>
      </div>
    </>
  )
}
export default Contentpage;