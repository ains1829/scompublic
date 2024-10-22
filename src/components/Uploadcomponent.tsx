import React, { useState } from 'react';
import { FileImageOutlined , MessageOutlined , SendOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, message, Upload } from 'antd';
import type {UploadFile, UploadProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useFeedback } from '../api/m_api/Api';
import mada_icon from "/madagascar.png";
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
function Uploadcomponent({reference} : {reference:string} ){
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [contact, setContact] = useState('');
  const [text, setText] = useState('');
  const [email, setMail] = useState('');
  const sending_feedback = useFeedback();
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
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (contact.trim().length > 9 && text.trim().length > 0) {
      const reponse = await sending_feedback.mutateAsync({ file: getFileListAsFiles(), numero_serie: reference!, contact: contact, text: text , email:email })
      console.log(reponse.object)
      if (reponse.status === 200) {
        setContact('');
        setMail('');
        setFileList([]);
        setText('')
        message.success('Votre feedback est bien recu');
      }
    }
  }
  return (
    <>
      <div className='w-full flex flex-col gap-y-2'>
        <span className='text-xl'>
          <MessageOutlined />
        </span>
        <span className='font-bold'>Feedback</span>
        <span className='text-xs'>Nous comprenons que nos interventions peuvent parfois etre percues comme delicates , mais elle sont essentielles pour assurer le respect des normes . votre feedback est important , que ce soit pour signaler des incomprehensions ou pour partager vos points de vue . Merci de nous aider a ameliorer la transparence et l'equite de nos actions</span>
        <form onSubmit={handleSubmit} className='flex flex-col gap-y-5 mt-3'>
            <div className="flex flex-col gap-y-1">
              <label className='text-xs'>Email</label>
              <Input className='font-sans' placeholder='votre email' value={email} onChange={(e)=> setMail(e.target.value)}/>
            </div>
            <div className="flex flex-col gap-y-1">
            <label className='text-xs'>Telephone *</label>
            <div className='flex'>
              <div className="flex justify-evenly items-center" style={{ width: '10%' }}>
                <Avatar src={mada_icon} size={"small"} />
              </div>
              <Input prefix={"+261"} style={{width:'90%'}} showCount maxLength={9} minLength={9} className='font-sans' placeholder='votre numero' value={contact} onChange={(e)=> setContact(e.target.value)} required/>
            </div>
            </div>
            <div className="flex flex-col gap-y-1">
              <label className='text-xs'>feedback *</label>
              <TextArea className='font-sans' placeholder='votre feedback' value={text} rows={4} onChange={(e)=> setText(e.target.value)} required/>
            </div>
            <Upload {...props}>
              <Button type="dashed" className='text-xs font-sans' icon={<FileImageOutlined />}>Photos justificatif</Button>
          </Upload>
          <div className='flex justify-end'>
            <Button
              className='font-sans bg-secondary text-white text-xs'
              htmlType='submit'
              type="dashed"
              loading={sending_feedback.isPending}
              icon={<SendOutlined />}
              iconPosition="end"
            >
              Envoyer
            </Button> 
          </div>
        </form>
      </div>
    </>
  );
};

export default Uploadcomponent;