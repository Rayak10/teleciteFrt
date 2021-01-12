export class Todo {
    idTache: number;
    descriptionTache: string;
    etatTache: string;
    dureeTache: number;
    dateDebut: Date;
    dateFin: Date;
    constructor(idTache: number = 0,
        descriptionTache: string = "",
        etatTache: string = "",
        dureeTache: number = 0,
        dateDebut: Date,
        dateFin: Date) {
        this.idTache = idTache;
        this.descriptionTache = descriptionTache;
        this.etatTache = etatTache;
        this.dureeTache = dureeTache;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin
    }
}