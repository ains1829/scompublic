export interface Societedata{
  key: number;
  namesociete: string;
  description: string;
  nif: string;
  stat: string;
  numerofiscal: string;
  telephone: string;
  responsable: string;
  district: string;
  addresse: string;
  region: string;
  logo: string;
  idregion: number;
}
export const TransformdataSociete = (data: any[]) : Societedata [] => {
  return data.map(item => ({
    key: item.idsociete,
    namesociete: item.namesociete,
    description: item.description,
    nif: item.nif,
    stat: item.stat,
    numerofiscal: item.numerofiscal,
    telephone: item.telephone,
    responsable: item.responsable,
    district: item.district.nameville,
    addresse: item.addresse,
    region: item.region.nameregion,
    logo: item.url_logo,
    idregion:item.region.idregion
  }))
}