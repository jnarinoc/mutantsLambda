import debugLib from 'debug';
import { QueryTypes } from 'sequelize';
import { sequelizeMySQL } from '../database/database';

const debug = debugLib('mutantSource');

export async function save(dna: string, isMutant: boolean):
    Promise<any> {
    let result: any;
    try {
        const now =  new Date();
        const transactionDB = await sequelizeMySQL.transaction();
        const sentence = `INSERT INTO MUTANT(
        dna, ismutant)
        VALUES ('${dna}', ${isMutant});`;
        const id = await sequelizeMySQL.query(sentence, { type: QueryTypes.INSERT, transaction: transactionDB});
        debug('information mutant was insert successfully: %s', id);
        await transactionDB.commit();
        result = { status: 200, date: now };
    } catch (error) {
        debug('error: %s', error);
        result = { status: 500, date: undefined};
    }
    return Promise.resolve(result);
}

export async function stats():
    Promise<any> {
    let result: any;
    try {
        const transactionDB = await sequelizeMySQL.transaction();
        const sentence = `select count(*) from mutant group by ismutant;`;
        const data = await sequelizeMySQL.query(sentence, { type: QueryTypes.SELECT, transaction: transactionDB});
        debug('information mutant was obtained successfully');
        result = { status: 200, data: {human: data[0].count, mutant: data[1].count}};
    } catch (error) {
        debug('error: %s', error);
        result = { status: 500, date: undefined};
    }
    return Promise.resolve(result);
}
