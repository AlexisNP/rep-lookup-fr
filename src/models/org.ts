export interface Organisation {
  organe: {
    "@xmlns": string;
    "@xmlns:xsi": string;
    "@xsi:type": string;
    uid: string;
    codeType: string;
    libelle: string;
    libelleEdition: string;
    libelleAbrege: string;
    libelleAbrev: string;
    viMoDe: ViMoDe;
    organeParent: null;
    chambre: null;
    regime: string;
    legislature: string;
    secretariat: Secretariat;
    positionPolitique: string;
    preseance: string;
    couleurAssociee: string;
  };
}

export interface Secretariat {
  secretaire01: null;
  secretaire02: null;
}

export interface ViMoDe {
  dateDebut: Date;
  dateAgrement: null;
  dateFin: null;
}
