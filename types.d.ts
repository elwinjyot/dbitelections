export interface IClub {
    id: string;
    clubName: string;
    imgUri: string;
    _count?: any;
    clubMembers: IMember[];
}

export interface IMember {
    memberId: string;
    name: string;
    course: string;
    position: string;
    votes: number;
    clubId?: string;
    Club?: any;
    img: string;
}