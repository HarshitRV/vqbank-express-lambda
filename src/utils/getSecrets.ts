import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { Secrets } from "./types";

async function getSecrets(): Promise<Secrets> {
    const secretName = "vqbank-express-lambda" as const;
    const region = "ap-south-1" as const;

    const client = new SecretsManagerClient({
        region
    });


    const response = await client.send(
        new GetSecretValueCommand({
            SecretId: secretName,
        })
    );

    return JSON.parse(response.SecretString || "");
}

export default getSecrets;