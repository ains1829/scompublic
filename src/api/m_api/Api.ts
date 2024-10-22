import { useMutation, useQuery} from "@tanstack/react-query";
import { instanceAxios } from "../axios/Typeaxios";
const Signalement = async(idsociete : number , societe:string , addresse:string , region:number , contact:string, email:string , anomaly:number ,  motifs:string, file : File[]) => {
  try {
    const formData = new FormData();
    file.forEach((item) => {
      formData.append('photo', item);
    })
    formData.append("cause", anomaly.toString());
    formData.append("email", email);
    formData.append("numberphone", contact);
    formData.append("idsociete", idsociete.toString());
    formData.append("namesociete", societe);
    formData.append("description", motifs);
    formData.append("addresse", addresse);
    formData.append("region", region.toString());
    console.log(file)
    const reponse = (await instanceAxios.post('mic/signalement', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }))
      .data;
    return reponse;
  } catch (error) {
    console.log(error);
  }
}
export function useSignalement() {
  return useMutation({
    mutationFn: ({ idsociete, societe, addresse, region, contact, email, anomaly, motifs, file }: { idsociete: number, societe: string, addresse: string, region: number, contact: string, email: string, anomaly: number, motifs: string, file: File[] }) => Signalement(idsociete, societe, addresse, region, contact, email, anomaly, motifs, file),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {

      }
    }
  })
}
const Feedback = async(numero_serie : string , contact:string , text:string , file : File[],mail:string) => {
  try {
    const formData = new FormData();
    formData.append("numero_serie", numero_serie);
    formData.append("contact", contact);
    formData.append("feedback", text); 
    formData.append("email", mail); 
    file.forEach((item) => {
      formData.append('photo', item);
    })
    console.log(file)
    const reponse = (await instanceAxios.post('mic/feedback', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }))
      .data;
    return reponse;
  } catch (error) {
    console.log(error);
  }
}

export function useFeedback() {
  return useMutation({
    mutationFn: ({ numero_serie ,  contact, text, file , email }: { numero_serie:string , contact:string , text:string , file : File[] , email:string }) => Feedback(numero_serie , contact , text , file,email),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {

      }
    }
  })
}
const getSocieteglobal = async (page : number , search : string, idregion :number) => {
  try {
    const reponse = (await instanceAxios.get(`mic/getSocieteglobalpaginationcitoyen?page=${page}&search=${search}&idregion=${idregion}`)).data?.object;
    return reponse;
  } catch (error) {
    console.log('ERROR FETCHING ORDER MISSION:' , error)
  }
}

export function usegetSocieteglobal(idregion : number ,  page:number , search : string) {
  return useQuery({
    queryKey: ["getSocieteglobalpaginationcitoyen" , page , search , idregion],
    queryFn: () => getSocieteglobal(page , search , idregion),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
const getRegions = async () => {
  try {
    const respone = (await instanceAxios.get("data/regions"));
    return respone.data;
  } catch (error) {
    console.log(error)
  }
}
export function usegetRegions() {
  return useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

const getOmbyreferences = async (ref:string) => {
  try {
    const respone = (await instanceAxios.get(`data/om_byserie?ref=${ref}`));
    return respone.data;
  } catch (error) {
    console.log(error)
  }
}

export function usegetOmbyreferences(ref:string) {
  return useQuery({
    queryKey: ["om_byserie" , ref],
    queryFn: ()=> getOmbyreferences(ref),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
