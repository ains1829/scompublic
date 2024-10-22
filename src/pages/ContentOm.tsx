import { Empty } from "antd";
import Om from "../components/Om";
import Uploadcomponent from "../components/Uploadcomponent";
import { usegetOmbyreferences } from "../api/m_api/Api";
import { TransFormDataOnData } from "../types/Ordermission";

function ContentOm({ reference }: { reference: string }) {
  const om = usegetOmbyreferences(reference);
  if (om.isLoading) {
    return <>loading...</>
  }
  if (om.isError) {
    return <>error...</>
  }
  if (om.data.status === 201) {
    return <>
        <div>
          <Empty />
        </div>
    </>
  }
  const ordermission = TransFormDataOnData(om.data.object);
  console.log(ordermission);
  return (
    <>
      <div
        className="flex gap-10 font-sans items-center"
        style={{
          padding: 24,
          minHeight: 360,
          marginTop: 10,
        }}
      > 
        <div className="w-1/2">
          <Om data={ordermission} />
        </div>
        <div className="w-1/2">
          <Uploadcomponent reference={reference} />
        </div>
      </div>
    </>
  )
}
export default ContentOm;