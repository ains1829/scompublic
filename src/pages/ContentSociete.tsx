import { useState } from "react";
import { usegetRegions, usegetSocieteglobal } from "../api/m_api/Api";
import C_societe from "./Societe";
import Search, { SearchProps } from "antd/es/input/Search";
import {  Button, Modal, theme } from "antd";
import { TransformdataSociete } from "../types/Societedata";
import {
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import SignalementnoSociete from "../components/SignalementnoSociete";
export interface ComponentTestProps {
  onOpenChange: () => void;
}

function ContentSociete() {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const societe = usegetSocieteglobal(0, page, search);
  const region = usegetRegions();
  const [openModal, setModal] = useState(false);
  const [key_modal, setkey] = useState(1);
  if (societe.isPending) {
    return <>loading....</>
  }
  if (societe.isError) {
    return <>error...</>
  }
  if (region.isPending) {
    return <>loading...</>
  }
  if (region.isError) {
    return <>error...</>
  }
  const data_societe = TransformdataSociete(societe.data.data);
  const options: any[] = [];
    options.push({value : 0,label : <span className="font-sans">Tous</span>})
  region.data.forEach((item: any) => (
    options.push({ value: item.idregion, label: <span className="font-sans">{item.nameregion}</span> })
  ));
  const onSearch: SearchProps['onSearch'] = (value, _e) => {
    setPage(0)
    setSearch(value)
  };
  const handleNext = () => {
    if (societe.data.hasnext) {
      setPage(page + 1)
    }
  }
  const handlePrevious = () => {
    if (societe.data.hasprevious) {
      setPage(page - 1)
    }
  }
  const showModal = () => {
    setModal(true);
  };
  const handleOk = () => {
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };
  const handleSignalEnvoyer = () => {
    setkey(2);
    setModal(false);
  }
  let classNameNext = "bg-gray-400 cursor-not-allowed";
  let ClassNamePrevious = "bg-gray-400 cursor-not-allowed";
  if (societe.data.hasnext) {
    classNameNext = "bg-green-500 cursor-pointer"
  }
  if (societe.data.hasprevious) {
    ClassNamePrevious = "bg-green-500 cursor-pointer"
  }
  return (
    <>
    <div
      className="flex flex-col gap-y-2 font-sans"
      style={{
        padding: 24,
        minHeight: 360,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
      > 
        <div className="flex justify-between items-center text-sm">
          <div className="flex flex-col">
            <span className="text-xl" >Liste Societe.</span>
          </div>
          <div className="flex gap-3 w-1/2">
            <Search placeholder="Recherche" allowClear onSearch={onSearch} className="font-sans" />
            <div className="flex">
              <Button className="font-sans text-xs" type="dashed" onClick={showModal}>Autre Societe</Button>
            </div>
          </div>
        </div>
        <div>
          <C_societe data={data_societe} />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className={`${ClassNamePrevious} p-2 text-xs items-center text-white rounded-xl font-bold flex gap-2`} onClick={handlePrevious}>
              <LeftOutlined />
              <span>
                Previous
              </span>
            </div>
            <div className={`${classNameNext} p-2 text-xs items-center text-white rounded-xl font-bold flex gap-2`} onClick={handleNext}>
              <span>
                Next
              </span>
              <RightOutlined/>
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-500 font-bold">Page {societe.data.page + 1} de {societe.data.nombrepage}</span>
          </div>
        </div>
      </div>
      <Modal
        key={key_modal}
        open={openModal}
        onOk={handleOk}
        centered
        onCancel={handleCancel}
        width={1000}
        footer={(_, {  }) => (
          <>
          </>
        )}>
        <SignalementnoSociete onOpenChange={handleSignalEnvoyer}/>
      </Modal>
    </>
  )
}
export default ContentSociete;