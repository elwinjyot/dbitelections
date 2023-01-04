export interface IClub {
    _id?: string;
    clubName: string;
    imgUri: string;
    clubMembers: IMember[];
}

export interface IMember {
    _id?: string;
    memberId: number;
    name: string;
    course: string;
    position: string;
    votes: number;
}