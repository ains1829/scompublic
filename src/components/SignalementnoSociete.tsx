import { Avatar, Button, Input, message, Select, Upload, UploadFile, UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { FileImageOutlined , WarningOutlined , SendOutlined } from '@ant-design/icons';
import { usegetRegions, useSignalement } from "../api/m_api/Api";
import { ComponentTestProps } from "../pages/ContentSociete";
import mada_icon from "/madagascar.png";
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
function SignalementnoSociete({onOpenChange} : ComponentTestProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const send_signalement = useSignalement();
  const [societe, setSociete] = useState('');
  const [addresse, setAddresse] = useState('');
  const [choixregion, setChoixRegion] = useState<number>();
  const [contact, setContact] = useState('');
  const [email , setEmail] = useState('')
  const [text, setText] = useState('');
  const [anomaly, setAnomaly] = useState<number>();
  const region = usegetRegions();
  const options: any[] = [];
  if (region.isSuccess) {
    region.data.forEach((item: any) => (
    options.push({ value: item.idregion, label: <span className="font-sans text-xs">{item.nameregion}</span> })
  ));
  }
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
    return fileList.map((file) =>  file as unknown as File);  // Caster et filtrer les `undefined`
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (contact.trim().length > 9 && text.trim().length > 10 && societe.trim().length > 5 && addresse.trim().length > 5 ) {
      console.log(contact);
      console.log(text);
      console.log(getFileListAsFiles());
      console.log(anomaly);
      console.log(choixregion);
      const reponse = await send_signalement.mutateAsync({ idsociete: 0, societe: societe, addresse: addresse, contact: contact, email: email, anomaly: anomaly!, motifs: text, file: getFileListAsFiles(), region: choixregion! });
      if (reponse.status === 200) {
        onOpenChange()
        message.warning("Signal envoyé");
      } else {
        message.error(reponse.object);
      }
    }
  }
  const handleChange = (id:number) => {
    setChoixRegion(id)
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
            <label className="text-xs">Societe *</label>
            <Input placeholder="nom du societe" className="font-sans text-xs" value={societe} size="large" onChange={(e) => setSociete(e.target.value)} required/>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-xs">Region du societe *</label>
            <Select className="font-sans text-xs" value={choixregion} onChange={handleChange} placeholder="region du societe" options={options}/>
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-xs">Addresse du societe *</label>
          <Input placeholder="addresse du societe" className="font-sans text-xs" value={addresse} onChange={(e) => setAddresse(e.target.value)} size="large" required/>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-y-1 ">
            <label className="text-xs">Votre contact *</label>
            <div className="flex">
              <div className="flex justify-evenly items-center" style={{ width: '10%' }}>
                <Avatar src={mada_icon} size={"small"} />
              </div>
            <Input prefix={"+261"} maxLength={9} minLength={9} style={{width:'90%'}} showCount placeholder="contact" className="font-sans text-xs" value={contact} size="large" onChange={(e) => setContact(e.target.value)} required />
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-xs">Votre email</label>
            <Input placeholder="email" type="email" className="font-sans text-xs" value={email} size="large" onChange={(e)=> setEmail(e.target.value)} />
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-xs">Anomaly *</label>
          <Select className="font-sans" placeholder="anomaly"  value={anomaly} onChange={handleChangeAnomaly} options={[{ label: <span className="font-sans text-xs">Produit perimer</span> , value:1} , {label: <span className="font-sans text-xs">Affichage non conforme</span> , value:2}]}/>
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-xs">Motif *</label>
          <TextArea placeholder="votre motifs" className="font-sans text-xs" value={text} rows={4} onChange={(e)=> setText(e.target.value)} required/>
        </div>
        <Upload {...props}>
          <Button type="dashed" className="font-sans text-xs" icon={<FileImageOutlined />}>Photos justificatif</Button>
        </Upload>
        <div  className="flex justify-end">
          <Button
            htmlType='submit'
            className="font-sans text-xs bg-secondary text-white"
            type="dashed"
            icon={<SendOutlined />}
            iconPosition="end"
              style={{ marginTop: 16 }}
          >
            Signaler
          </Button>
        </div>
      </form>
    </>
  )
}
export default SignalementnoSociete;