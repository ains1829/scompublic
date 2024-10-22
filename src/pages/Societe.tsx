import { Avatar, Button, Modal, Space, Table, TableColumnsType } from 'antd';
import { useState } from 'react';
import { Societedata } from '../types/Societedata';
import ComponentSignalement from '../components/ComponentSignalement';
export interface ParentComponent{
  CloseModal: () => void;
  societe: Societedata;
}
const C_societe = ({ data }: { data: Societedata[] }) => {
  const [key, setKey] = useState(0);
  const [openModal, setModal] = useState(false);
  const [societe_modal, setSocieteModal] = useState<Societedata>();
  const handleClick = async (data: Societedata) => {
    setModal(true)
    setKey(data.key)
    setSocieteModal(data)
  }
  const truncateText = (text: string) => {
    let maxlength = 50;
    return text.length > maxlength ? `${text.slice(0, maxlength)}...` : text;
  };
  const columns: TableColumnsType<Societedata> = [
    {
      title: <span className='font-sans'>Logo</span>,
      dataIndex: 'logo',
      key:'logo',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render:(text) => <Avatar src={text} size="large" />
    },
    {
      title: <span className='font-sans'>Nom Société</span>,
      dataIndex: 'namesociete',
      key: 'namesociete',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{text }</span>
    },
    {
      title: <span className='font-sans'>Activite</span> ,
      dataIndex: 'description',
      key: 'description',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{truncateText(text) }</span>
    },
    {
      title: <span className='font-sans'>Region</span>,
      dataIndex: 'region',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{truncateText(text) }</span>
    },
    {
      title: <span className='font-sans'>Addresse</span>,
      dataIndex:'addresse',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (text) => <span className='font-sans'>{truncateText(text) }</span>
    },
    {
      key: 'action',
      onHeaderCell: () => ({
        style: { backgroundColor: 'transparent' },
      }),
      render: (_, record) => (
        <Space size="middle">
          <Button type="dashed" className="text-xs font-sans p-4" onClick={()=>handleClick(record)} >Signaler</Button>
        </Space>
      ),
    }
  ];
  const handleOk = () => {
    setModal(false);
  };
  const handleSignalEnvoyer = () => {
    setKey(0);
    setModal(false);
  }
  const handleCancel = () => {
    setModal(false);
  };
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
      <Modal
        width={1000}
        key={key}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, {  }) => (
          <>
          </>
        )}
        centered
      >
        <ComponentSignalement  CloseModal={handleSignalEnvoyer}  societe={societe_modal!} />
      </Modal>
    </>
  )
}

export default C_societe;
