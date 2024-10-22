import { Image, Tag } from "antd";
import { Ordredemission } from "../types/Ordermission";
import {
  SyncOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
function Om({ data }: { data: Ordredemission }) {
  return (
    <>
      <div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <span className="font-bold">Ordre de mission</span>
            <div className="status">
            {
              data.fin !== null ?
              <Tag icon={<CheckCircleOutlined />} className="font-sans text-xs p-1" color="success">
                Mission terminer
                </Tag> :
                <>
                <Tag icon={<SyncOutlined spin />} className="font-sans text-xs p-1" color="processing">
                Mission en cours
                </Tag> </>
            }
          </div>
          </div>
          <div className="flex flex-col gap-y-3 mt-3">
            <div className="flex items-center gap-2">
              <span>Reference : </span>
              <span>{data.numeroserie }</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Date debut : </span>
              <span>{data.debut.toString() }</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Date fin : </span>
              <span>{data.fin !== null ?  data.fin.toString() : "en cours "}</span>
            </div>
            {
              data.typemission === 1 ?
                <>
                  <div className="flex items-center gap-2">
                    <span>Societe : </span>
                    <span>{data.nomsociete }</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Addresse : </span>
                    <span>{ data.addresse}</span>
                  </div>
                </>
                :
                <>
                  <div className="flex items-center gap-2">
                    <span>Region : </span>
                    <span>{data.region }</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>District : </span>
                    <span>{ data.nomdistrict}</span>
                  </div>
                </>
            }
            <div className="flex flex-col gap-y-1">
              <span className="font-bold text-xs">MOTIF </span>
              <span>{data.motif }</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-5 mt-5">
          <span className="font-bold">Missionnaire</span>
          <div className="grid grid-cols-2 gap-6">
            {
              data.detailequipe.map((item) => (
                <div key={item.key} className="flex gap-2 items-center">
                  <Image src={"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="..." style={{ width: '100px', height: '100px' }} />
                  <div className="flex flex-col gap-y-2">
                    <span>Nom :  {item.nom }</span>
                    <span>Matricule : {item.matricule }</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}
export default Om;