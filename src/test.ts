/**
 * Created by PeterWin on 07.07.2019.
 */
class Entity {}
abstract class First {
    public abstract getName(): string;
}

class Second extends First {
    public getName(): string {
        return "Second";
    }
}

class Third extends First {
    public getName(): string {
        return "Third";
    }
}

class Xaxa {
    public getName(): string {
        return "Xaxa";
    }
}

interface IFact {
    [key: string]: typeof Entity;
}

const dict: IFact = {
    Second,
    Third,
    Xaxa,
}

const createInst = (type: string): First => (new dict[type]()) as First;

export const test = () => {
    const x: First = createInst("Xaxa");
    console.log("x", x.getName());
    console.log('typeof Entity', typeof Entity);
};
