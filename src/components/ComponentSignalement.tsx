import TextArea from "antd/es/input/TextArea";
import { Avatar, Button, Input, message, Select, Upload, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import { ParentComponent } from "../pages/Societe";
import { useSignalement } from "../api/m_api/Api";
import {
  WarningOutlined,
  FileImageOutlined,SendOutlined
} from '@ant-design/icons';
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
import mada_icon from "/madagascar.png";
function ComponentSignalement({CloseModal , societe} : ParentComponent) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [contact, setContact] = useState('');
  const [email , setEmail] = useState('')
  const [text, setText] = useState('');
  const [anomaly, setAnomaly] = useState<number>();
  const send_signalement = useSignalement();
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      if (!imageMimeTypes.includes(file.type)) { 
        message.error('Uniquement des images en jpeg , png , jpg')
      } else {
        setFileList([...fileList, file]);
      }
      return false;
    },
    fileList,
  };
  const getFileListAsFiles = (): File[] => {
    return fileList.map((file) =>  file as unknown as File);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (contact.trim().length > 9 && text.trim().length > 10) {
      console.log(contact);
      console.log(text);
      console.log(getFileListAsFiles());
      const reponse = await send_signalement.mutateAsync({ idsociete: societe.key, societe: 'societe', addresse: 'addresse', contact: contact, email: email, anomaly: anomaly!, motifs: text, file: getFileListAsFiles(), region: 0 });
      if (reponse.status === 200) {
        CloseModal();
        message.warning("Signal envoyé");
      }else {
        message.error(reponse.object);
      }
    }
  }
  const handleChangeAnomaly = (id:number) => {
    setAnomaly(id)
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-5 font-sans text-sm">
        <div className='flex flex-col font-sans gap-y-1'>
          <span className="text-xl">
            <WarningOutlined/>
          </span>
          <span className="font-bold">Signalement</span>
          <span className='font-sans text-xs'>Nb : Les champs marqués d'un astérisque sont obligatoires</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-y-1">
            <label className="text-xs">Societe</label>
            <Input className="font-sans" type="text" value={societe.namesociete} readOnly  />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-xs">Region du societe</label>
            <Input className="font-sans" readOnly value={societe.region}/>
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-xs">Addresse du societe</label>
          <Input placeholder="addresse du societe" className="font-sans" value={societe.addresse} readOnly />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-y-1">
            <label className="text-xs">Contact *</label>
            <div className="flex">
              <div className="flex justify-evenly items-center" style={{ width: '10%' }}>
                <Avatar src={mada_icon} size={"small"} />
              </div>
              <Input prefix={"+261"} maxLength={9} minLength={9} style={{width:'90%'}} showCount placeholder="contact" className="font-sans text-xs" value={contact} size="large" onChange={(e)=> setContact(e.target.value)} required/>
            </div>
          </div>
          <div className="flex flex-col gap-y-1 ">
            <label className="text-xs">Email</label>
            <Input placeholder="email" type="email" className="font-sans text-xs" value={email} size="large" onChange={(e)=> setEmail(e.target.value)} />
          </div>
        </div>
          <div className="flex flex-col gap-y-1 ">
            <label className="text-xs">Anomaly *</label>
            <Select placeholder="anomaly" value={anomaly} onChange={handleChangeAnomaly}  className="font-sans text-xs" options={[{ label: <span className="font-sans text-xs">Produit perimer</span> , value:1} , {label: <span className="font-sans text-xs">Affichage non conforme</span> , value:2}]}/>
          </div>
          <div className="feedback gap-y-1 ">
            <label className="text-xs">Motif *</label>
            <TextArea placeholder="votre motifs" className="font-sans text-xs" value={text} rows={4} onChange={(e)=> setText(e.target.value)} required/>
          </div>
          <Upload {...props}>
            <Button type="dashed" className="font-sans text-xs" icon={<FileImageOutlined />}>Photos justificatif</Button>
          </Upload>
        <div className="flex justify-end">
          <Button
            htmlType='submit'
            className="font-sans text-xs"
            type="dashed"
            style={{ marginTop: 16 }}
            icon={<SendOutlined />}
            iconPosition="end"
          >
          Signaler
          </Button>
        </div>
      </form>
    </>
  )
}
export default ComponentSignalement