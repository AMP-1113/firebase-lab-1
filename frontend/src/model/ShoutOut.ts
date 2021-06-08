export default interface ShoutOut {
    _id?: string;
    to: string;
    from: any;
    message: string;
    profilePhoto?: string;
    likesArray: string[];
}