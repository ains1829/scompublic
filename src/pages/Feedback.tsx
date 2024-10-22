import Search, { SearchProps } from "antd/es/input/Search";
import { useParams } from 'react-router-dom';
import ContentOm from "./ContentOm";
import { useState } from "react";
function Feedback() {
  const { ref } = useParams<string>();
  const [search_ref, setSearch] = useState(ref ?? 'no_ref' )
    const onSearch: SearchProps['onSearch'] = (value, _e) => {
      setSearch(value)
  };
  return (
    <>
      <div>
        <div style={{
          padding: 24,
          minHeight: 360,
        }} className="bg-secondary">
          salut
        </div>
        <div className="flex mt-5 w-1/3 font-sans" style={{marginLeft:'auto' , marginRight:'auto'}}>
          <Search className="text-xs font-sans" placeholder="tapez le reference ici" onSearch={onSearch}/>
        </div>
        <div className="flex w-5/6 p-5 text-sm items-center" style={{marginLeft:'auto' , marginRight:'auto'}}>
          <div className="flex flex-col">
            <ContentOm reference={search_ref} />
          </div>
        </div>
      </div>
    </>
  )
}
export default Feedback;