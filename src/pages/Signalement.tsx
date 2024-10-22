import ContentSociete from "./ContentSociete";
function Signalement() {  
  return (
    <>
      <div>
        <div style={{
          padding: 24,
          minHeight: 360,
        }} className="bg-blue-100 flex items-center justify-center">
          <span className="text-2xl font-bold">
            Déposez votre signalement ici
          </span>
        </div>
        <div className="w-4/6" style={{marginLeft:'auto' , marginRight:'auto'}}>
          <ContentSociete />
        </div>
      </div>
    </>
  )
}
export default Signalement;