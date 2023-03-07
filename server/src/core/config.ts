import * as dotenv from "dotenv";

export class Config {
   constructor(
       readonly BASE_URL: string,
       readonly OPEN_AI_KEY: string,
       readonly DELAY: number = 0,
   ) {}


    publicPath(): string { return this.BASE_URL+":8080" }

    static impl(): Config {
        dotenv.config()
        return new Config(
            String(process.env.BASE_URL),
            String(process.env.OPEN_AI_KEY)
        )
    }

    static mock(): Config {
        return new Config(
            "http://localhost",
            "someApiKey",
            1000
        )
    }

}
