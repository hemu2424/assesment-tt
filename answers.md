B1

#1-> undefined
#2 Nan 12
#3 3
#4 false true



BlockB B2

enum PlanStatus {
    Active,
    Frozen,
    Expired
}

interface Plan {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
}


function findById<T extends { id: number }>(list: T[], id: number): T | undefined {
    return list.find(item => item.id === id);
}


B3