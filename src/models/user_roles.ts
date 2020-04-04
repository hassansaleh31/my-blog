export class UserRoles {
    constructor(public value: string) { }

    static GOD = new UserRoles('god');
    static EDITOR = new UserRoles('editor');
    static VIEWR = new UserRoles('viewer');

    static values: UserRoles[] = [
        UserRoles.GOD,
        UserRoles.EDITOR,
        UserRoles.VIEWR,
    ]

    static parse(raw: string): UserRoles {
        return this.values.find(value => value.value == raw) || null;
    }
}