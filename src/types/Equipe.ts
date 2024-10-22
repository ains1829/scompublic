export interface Equipe{
  key:number,
  nom: string;
  matricule: string;
  email: string;
  profil: string[];
  photo: string;
}
export const TransFormDataEquipe = (data: any[]): Equipe[] => {
  return data.map(item => ({
    key:item.idadministration,
    nom: item.nameadministration,
    matricule: item.matricule,
    email: item.email,
    profil: item.statustaff === 100 ? ['Chef equipe', item.profil] : [item.profil],
    photo:item.photo ?? ''
  }))
}
