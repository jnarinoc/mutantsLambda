#MUTANTS API
Esta API tiene la posibilidad de determinar si una persona es mutante a partir de su
secuencia de ADN, ademas de poder saber cuantos análisis han sido "positivo" para mutante.  
INSTRUCCIONES DE CONSUMO DE API.  
Ejecutar un CURL al endpoint https://ocme9y5jbb.execute-api.us-east-1.amazonaws.com/v1/mutant

con método POST, enviando en el body la secuencia de ADN así:

{
    "dna": [
        "AGTCG",
        "ATTTC",
        "CTTCC",
        "CCTTA",
        "ACGTC"
    ]
}

Para obtener el informe:

Ejecutar un CURL al endpoint https://ocme9y5jbb.execute-api.us-east-1.amazonaws.com/v1/stats

con métofo GET.

