export default {
    bdHost : process.env.DB_HOST || '',
    bdName : process.env.DB_NAME || '',
    bdPass : process.env.DB_PASS || '',
    bdPort : process.env.DB_PORT || '5432',
    bdUserName : process.env.DB_USER_NAME || 'postgres',
    port: process.env.PORT || '8099',
};
