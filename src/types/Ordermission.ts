import { Equipe, TransFormDataEquipe } from "./Equipe";


export interface Ordredemission{
  idordermission: number;
  typemission: number;
  nametymission: string;
  sender: string;
  profil: string;
  region: string;
  motif: string;
  debut: Date;
  dateordre: Date;
  fin: Date;
  societe: number;
  nomsociete: string;
  addresse: string;
  district: number;
  nomdistrict: string;
  detailequipe: Equipe[];
  status: number;
  urlfile: string;
  numeroserie: string;
  nameequipe: string;
  colortypemission: string;
  
}

export const TransFormDataOnData = (data : any) : Ordredemission => {
  return {
    idordermission: data.idordermission,
    typemission: data.idtypeordermission,
    motif: data.motifs,
    region: data.region.nameregion,
    debut: data.datedescente,
    sender: data.sender.nameadministration,
    profil: data.sender.profil.description,
    societe: data.idsociete ?? 0,
    addresse: data.addressesociete ?? "",
    nomsociete: data.nomsociete ?? "",
    district: data.iddistrict ?? 0 ,
    nomdistrict: data.nomdistrict ?? "",
    detailequipe: TransFormDataEquipe(data.equipe.detailequipes),
    status: data.status_validation,
    dateordre: data.dateorder,
    fin: data.dateorderend,
    urlfile : data.fileordermission,
    numeroserie: data.numeroserie,
    nameequipe: data.equipe.nameequipe,
    nametymission: data.idtypeordermission === 1 ? 'Descente' : data.idtypeordermission === 2 ? 'Collecte' : 'Autre suivi',
    colortypemission: data.idtypeordermission === 1 ? 'bg-green-400' : data.idtypeordermission === 2 ? 'bg-blue-400' : 'bg-yellow-400',
  }
}