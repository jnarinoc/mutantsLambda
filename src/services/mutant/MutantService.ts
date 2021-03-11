import debugLib from 'debug';
import {IMatrix} from "../../models/IMatrix";
import {save} from "../../datasource/mutant.source";


const debug = debugLib('api:MutantService');

export default class MutantService {
    public static async isMutant(dna: string[]): Promise<any> {
        let matrixProperties: IMatrix = this.buildMatrix(dna);
        const groups = await this.iterateMatrix(matrixProperties);
        const coincidences = this.searchMutant(groups);
        debug('holaaaaa')
        const isMutant = coincidences > 1;
        await save(dna.toString(), isMutant);
        return Promise.resolve(isMutant);
    }

// funcion encargada de construir una matriz de caracteres a partir de un array y verifica que sea una matriz cuadrada
    private static buildMatrix(dna: string[]) {
        if (dna.length < 4 ){
            throw new Error('Matriz invalida, minimo 4 filas/columnas');
        }
        let matrix = new Array(dna.length);

        let maxI = 0, maxJ = 0;
        dna.forEach((i, index) => {
            let vector = Array.from(i);
            matrix[index] = new Array(vector.length)
            vector.forEach((element, indice) => {
                // @ts-ignore
                matrix[index][indice] = element;
                maxJ ++;
            });
            maxI ++;
        });
        if (maxJ / maxI !== maxI) {
            throw new Error('Matriz invalida');
        }
        return {
            matrix:matrix,
            size: maxI
        } as IMatrix;
    }
    // funcion que recorre cada elemento de la matriz y lo envia a los metodos correspondientes en busqueda de
    // grupos de cuatro bases iguales
    private static iterateMatrix(matrixProperties: IMatrix): string[]{
        let groups = [];
        for (let i = 0; i < matrixProperties.size; i++) {
            for (let j = 0; j < matrixProperties.size; j++) {
               groups.push(this.verifyInRow(matrixProperties,i , j));
               groups.push(this.verifyInColumn(matrixProperties,i , j));
               groups.push(this.verifyInFirstDiagonal(matrixProperties,i , j));
               groups.push(this.verifyInSeccondDiagonal(matrixProperties,i , j));
            }
        }
        const resultFiltered = groups.filter((value) => {
            return value !== '';
        });
        return resultFiltered;
    }

    // construir grupos de cuatro bases recorriendo la matriz de manera horizontal
    private static verifyInRow(matrixProperties: IMatrix, i: number , j: number): string {
        if (j < (matrixProperties.size - 3)) {
            return (matrixProperties.matrix[i][j])
                .concat(matrixProperties.matrix[i][j+1])
                .concat(matrixProperties.matrix[i][j+2])
                .concat(matrixProperties.matrix[i][j+3]);
        }
        return '';
    }

    // construir grupos de cuatro bases recorriendo la matriz de manera vertical
    private static verifyInColumn(matrixProperties: IMatrix, i: number , j: number): string {
        if (i < (matrixProperties.size - 3)) {
            return (matrixProperties.matrix[i][j])
                .concat(matrixProperties.matrix[i+1][j])
                .concat(matrixProperties.matrix[i+2][j])
                .concat(matrixProperties.matrix[i+3][j]);
        }
        return '';
    }

    // construir grupos de cuatro bases recorriendo la matriz de manera vertical
    private static verifyInFirstDiagonal(matrixProperties: IMatrix, i: number , j: number): string {
        if (j < (matrixProperties.size - 3) && i < (matrixProperties.size - 3) ) {
            return (matrixProperties.matrix[i][j])
                .concat(matrixProperties.matrix[i+1][j+1])
                .concat(matrixProperties.matrix[i+2][j+2])
                .concat(matrixProperties.matrix[i+3][j+3]);
        }
        return '';
    }

    // construir grupos de cuatro bases recorriendo la matriz de manera vertical invertida
    private static verifyInSeccondDiagonal(matrixProperties: IMatrix, i: number , j: number): string {
        if (j > 2 && i < (matrixProperties.size - 3)) {
            return (matrixProperties.matrix[i][j])
                .concat(matrixProperties.matrix[i+1][j-1])
                .concat(matrixProperties.matrix[i+2][j-2])
                .concat(matrixProperties.matrix[i+3][j-3]);
        }
        return '';
    }
     // buscar coincidencias para determinar si es mutante una persona y retorna el numero de coincidencias
    private static searchMutant(groups: string[]): number{
        const sameBases = ['AAAA','CCCC','GGGG','TTTT'];
        const filtered = groups.filter((el) => {
            return sameBases.includes(el);
        });
        return filtered.length;
    }

}
