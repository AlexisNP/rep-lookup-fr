export interface Depute {
  acteur: Acteur;
}

export interface Acteur {
  "@xmlns:xsi": string;
  uid: Uid;
  etatCivil: EtatCivil;
  profession: Profession;
  uri_hatvp: string;
  adresses: Adresses;
  mandats: Mandats;
}

export interface Adresses {
  adresse: { [key: string]: null | string }[];
}

export interface EtatCivil {
  ident: Ident;
  infoNaissance: InfoNaissance;
  dateDeces: null;
}

export interface Ident {
  civ: string;
  prenom: string;
  nom: string;
  alpha: string;
  trigramme: string;
}

export interface InfoNaissance {
  dateNais: Date;
  villeNais: string;
  depNais: string;
  paysNais: string;
}

export interface Mandats {
  mandat: Mandat[];
}

export interface Mandat {
  "@xsi:type": XsiType;
  uid: string;
  acteurRef: Text;
  legislature: null | string;
  typeOrgane: string;
  dateDebut: Date;
  datePublication: Date | null;
  dateFin: Date | null;
  preseance: string;
  nominPrincipale: string;
  infosQualite: InfosQualite;
  organes: Organes;
  suppleants?: Suppleants | null;
  libelle?: null;
  missionSuivanteRef?: null;
  missionPrecedenteRef?: null;
  chambre?: null;
  election?: Election;
  mandature?: Mandature;
  collaborateurs?: Collaborateurs;
}

export enum XsiType {
  MandatAvecSuppleantType = "MandatAvecSuppleant_Type",
  MandatMissionType = "MandatMission_Type",
  MandatParlementaireType = "MandatParlementaire_type",
  MandatSimpleType = "MandatSimple_Type",
}

export enum Text {
  Pa794094 = "PA794094",
}

export interface Collaborateurs {
  collaborateur: Collaborateur[];
}

export interface Collaborateur {
  qualite: string;
  prenom: string;
  nom: string;
  dateDebut: null;
  dateFin: null;
}

export interface Election {
  lieu: Lieu;
  causeMandat: string;
  refCirconscription: string;
}

export interface Lieu {
  region: string;
  regionType: string;
  departement: string;
  numDepartement: string;
  numCirco: string;
}

export interface InfosQualite {
  codeQualite: string;
  libQualite: string;
  libQualiteSex: string;
}

export interface Mandature {
  datePriseFonction: Date;
  causeFin: null;
  premiereElection: string;
  placeHemicycle: string;
  matriculeVote: string;
  mandatRemplaceRef: null;
}

export interface Organes {
  organeRef: string;
}

export interface Suppleants {
  suppleant: Suppleant;
}

export interface Suppleant {
  dateDebut: Date;
  dateFin: null;
  suppleantRef: string;
}

export interface Profession {
  libelleCourant: string;
  socProcINSEE: SocProcINSEE;
}

export interface SocProcINSEE {
  catSocPro: string;
  famSocPro: string;
}

export interface Uid {
  "@xsi:type": string;
  "#text": Text;
}
