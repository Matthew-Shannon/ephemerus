import {Express} from "express";

export interface UseCase<T extends VM> {
    onAttach(app: Express): void
    //onCall(req: Request, res: Response): Promise<void>
    //onDraw(req: Request, res: Response, data: T, callback: () => void): void
}

export interface VM {
    readonly css: string;
    readonly page_title_text: string
}
