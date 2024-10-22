import Search, { SearchProps } from "antd/es/input/Search";
import { useParams } from 'react-router-dom';
import ContentOm from "./ContentOm";
import { useState } from "react";
import { usegetOmbyreferences } from "../api/m_api/Api";
import { Empty } from "antd";
function Feedback() {
  const { ref } = useParams<string>();
  const [search_ref, setSearch] = useState(ref ?? 'no_ref' )
    const onSearch: SearchProps['onSearch'] = (value, _e) => {
      setSearch(value)
    };
  const om = usegetOmbyreferences(search_ref);
  if (om.isLoading) {
    return <>loading...</>
  }
  if (om.isError) {
    return <>error...</>
  }
  return (
    <>
      <div>
        <div style={{
          padding: 24,
          minHeight: 360,
        }} className="bg-blue-100 flex items-center justify-center">
          <span className="text-2xl font-bold">
            Exprimez vos réflexions sur l'intervention réalisée
          </span>
        </div>
        <div className="flex mt-5 w-1/3 font-sans" style={{marginLeft:'auto' , marginRight:'auto'}}>
          <Search className="text-xs font-sans" placeholder="tapez le reference ici" onSearch={onSearch}/>
        </div>
        {
          om.data.status === 201 ?
          <div className="flex justify-center p-5">
            <Empty description="no ordermission found" />
          </div> :
          <div className="flex w-5/6 p-5 text-sm items-center" style={{marginLeft:'auto' , marginRight:'auto'}}>
            <div className="flex flex-col">
              <ContentOm object={om.data.object} />
            </div>
          </div>
        }
      </div>
    </>
  )
}
export default Feedback;