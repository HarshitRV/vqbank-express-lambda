import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { Secrets } from "./types";

class GetSecrets {
    public secretName: string;
    public region: string;
    private client: SecretsManagerClient;

    constructor(secretName: string, region: string) {
        this.secretName = secretName;
        this.region = region;

        this.client = new SecretsManagerClient({
            region
        });
    }

    public async secrets(): Promise<Secrets> {
        const response = await this.client.send(
            new GetSecretValueCommand({
                SecretId: this.secretName,
            })
        )

        if (!response.SecretString) {
            throw new Error("Secret not found");
        }

        return JSON.parse(response.SecretString);
    }
}

export default GetSecrets;