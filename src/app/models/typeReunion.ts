export  enum TypeReunion {
    Reunion_Scrum,
     Reunion_Administratif
}
export namespace TypeReunion {

    export function values() {
      return Object.keys(TypeReunion).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
  }