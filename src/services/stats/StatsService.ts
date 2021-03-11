import debugLib from 'debug';
import {IMatrix} from "../../models/IMatrix";
import {save, stats} from "../../datasource/mutant.source";


const debug = debugLib('api:StatsService');

export default class StatsService {
    public static async getStats(): Promise<any> {
        const result = await stats();
        return {
            count_mutant_dna: result.data.mutant,
            count_human_dna: result.data.human,
            ratio: result.data.mutant/result.data.human
        };
    }
}
