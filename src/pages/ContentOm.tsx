import Om from "../components/Om";
import Uploadcomponent from "../components/Uploadcomponent";
import { TransFormDataOnData} from "../types/Ordermission";
function ContentOm({ object }: { object: any }) {
  const ordermission = TransFormDataOnData(object);
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
          <Uploadcomponent reference={ordermission.numeroserie} />
        </div>
      </div>
    </>
  )
}
export default ContentOm;