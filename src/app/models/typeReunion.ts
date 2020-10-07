export  enum TypeReunion {
    Reunion_Scrum = 'Reunion_Scrum',
     Reunion_Administratif = 'Reunion_Scrum'
}
export namespace TypeReunion {

    export function values() {
      return Object.keys(TypeReunion).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
  }